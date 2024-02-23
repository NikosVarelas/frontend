import { create } from 'zustand'
import { type Ingredient } from '@/models/Recipe'
import { type ShoppingList } from '@/models/ShoppingList'
import { axiosRequest } from '@/constants/axiosRequest'
import { endpoints } from '@/constants/endpoint'

export interface ShoppingListIngredient {
  ingredient: Ingredient
  isChecked: boolean
}

interface ShoppingListStore {
  shoppingList: ShoppingListIngredient[]
  loading: boolean
  errorMessage: string | undefined | null
  fetchShoppingList: (token: string | null | undefined) => Promise<void>
  addFromRecipe: (recipeId: number, token: string | null) => Promise<void>
  replace: (
    newIngredinetList: ShoppingListIngredient[],
    token: string | null | undefined
  ) => Promise<void>
  setLoading: () => void
  deleteItem: (index: number) => void
  setItemChecked: (index: number, isChecked: boolean) => void
}

export const useShoppingListStore = create<ShoppingListStore>((set, get) => ({
  shoppingList: [],
  loading: false,
  errorMessage: null,
  fetchShoppingList: async (token: string | null | undefined) => {
    try {
      set({ loading: true, errorMessage: null })
      const response: ShoppingList = await axiosRequest(
        'GET',
        token,
        endpoints.getShoppingList
      )
      const newShoppingList: ShoppingListIngredient[] =
        response.ingredients.map((ingredient: Ingredient) => ({
          ingredient,
          isChecked: false,
        }))
      set({ shoppingList: newShoppingList, errorMessage: null })
    } catch (error) {
      set({ errorMessage: 'Failed to load recipes!' })
    } finally {
      set({ loading: false })
    }
  },
  addFromRecipe: async (recipeId: number, token: string | null) => {
    set({ loading: true, errorMessage: null })
    try {
      const currentState = get()

      let response: ShoppingList
      if (currentState.shoppingList.length === 0) {
        response = await axiosRequest(
          'POST',
          token,
          `${endpoints.createShoppingList}?recipe_id=${recipeId}`
        )
      } else {
        response = await axiosRequest(
          'PUT',
          token,
          endpoints.updateShoppingList,
          {
            ingredients: currentState.shoppingList,
          }
        )
      }
      set({ shoppingList: response.ingredients })
    } catch (err) {
      console.log(err)
      set({ errorMessage: 'Failed to add recipe!' })
    } finally {
      set({ loading: false })
    }
  },
  replace: async (
    newIngredinetList: ShoppingListIngredient[],
    token: string | null | undefined
  ) => {
    set({ loading: true, errorMessage: null })
    try {
      if (newIngredinetList.length === 0) {
        await axiosRequest('DELETE', token, endpoints.deleteShoppingList)
        set({shoppingList: []})
      } else {
        const ingredients: Ingredient[] = newIngredinetList.map((item: ShoppingListIngredient) => item.ingredient);
        await axiosRequest(
          'PUT',
          token,
          endpoints.updateShoppingList,
          {ingredients}
        )
        set({ shoppingList: newIngredinetList })
      }
    } catch (err) {
        console.log(err)
      set({ errorMessage: 'Failed saving the edited list' })
    } finally {
      set({ loading: false })
    }
  },
  setLoading: () => {},
  deleteItem: (index: number) => {
    const shoppingList = get().shoppingList.slice()
    shoppingList.splice(index, 1)
    set({ shoppingList })
  },
  setItemChecked: (id: number, isChecked: boolean) => {
    const shoppingList = get().shoppingList.slice()
    const index = shoppingList.findIndex(item => item.ingredient.id === id);
    if (index !== -1) {
        shoppingList[index].isChecked = isChecked;
        set({ shoppingList });
      }
  },
}))
