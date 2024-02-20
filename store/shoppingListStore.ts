import { create } from 'zustand'
import { type Recipe, type Ingredient } from '@/models/Recipe'
import { type ShoppingList } from '@/models/ShoppingList'
import { axiosRequest } from '@/constants/axiosRequest'
import { endpoints } from '@/constants/endpoint'

interface ShoppingListStore {
  ingredients: Ingredient[]
  loading: boolean
  errorMessage: string | undefined | null
  fetchShoppingList: (token: string | null | undefined) => Promise<void>
  add: (newRecipe: Recipe, token: string | null) => Promise<void>
  replace: (newIngredinetList: Ingredient[]) => void
  setLoading: () => void
  deleteItem: (index: number) => void
}

export const useShoppingListStore = create<ShoppingListStore>((set, get) => ({
  ingredients: [],
  loading: false,
  errorMessage: null,
  fetchShoppingList: async (token: string | null | undefined) => {
    try {
      set({ loading: true })
      const response: ShoppingList = await axiosRequest(
        'GET',
        token,
        endpoints.getShoppingList
      )
      set({ ingredients: response.ingredients, errorMessage: null })
    } catch (error) {
      set({errorMessage: error})
    } finally {
      set({ loading: false })
    }
  },
  add: async (newRecipe: Recipe, token: string | null) => {
    set({ loading: true })
    try {
      const currentState = get()
      const newShoppingList: ShoppingList = {
        ingredients: newRecipe.ingredients,
      }

      let response: ShoppingList

      if (currentState.ingredients.length === 0) {
        response = await axiosRequest(
          'POST',
          token,
          endpoints.createShoppingList,
          newShoppingList
        )
      } else {
        response = await axiosRequest(
          'PUT',
          token,
          endpoints.updateShoppingList,
          {
            ingredients: [
              ...currentState.ingredients,
              ...newShoppingList.ingredients,
            ],
          }
        )
      }
      set({ ingredients: response.ingredients })
    } catch (err) {
      set({ errorMessage: err })
    } finally {
      set({ loading: false })
    }
  },
  replace: (newIngredinetList: Ingredient[]) => {
    set({ingredients: newIngredinetList})
  },
  setLoading: () => {},
  deleteItem: (index: number) => {
    const ingredients = get().ingredients.slice() 
    ingredients.splice(index, 1)
    set({ ingredients })
  },
}))
