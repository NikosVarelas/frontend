import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Recipe, type Ingredient } from '@/models/Recipe'
import { type Dispatch } from 'redux'
import { axiosRequest } from '@/constants/axiosRequest'
import { endpoints } from '@/constants/endpoint'
import { type ShoppingList } from '@/models/ShoppingList'
import { type StoreState } from '.'

export interface ShoppingListState {
  loading: boolean
  ingredients: Ingredient[]
}

const initialState: ShoppingListState = {
  loading: false,
  ingredients: [],
}

const shoppingListSlice = createSlice({
  name: 'shopping-list',
  initialState,
  reducers: {
    add(state, action: PayloadAction<ShoppingList>) {
      state.ingredients = state.ingredients.concat(action.payload.ingredients)
    },
    replace(state, action: PayloadAction<ShoppingList>) {
      state.ingredients = action.payload.ingredients
    },
    getState(state) {
      return state
    },
    edit(state) {},
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
  },
})

export const fetchSLData = (token: string | null) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch(shoppingListActions.setLoading(true))
      const response: ShoppingList = await axiosRequest(
        'GET',
        token,
        endpoints.getShoppingList
      )
      dispatch(shoppingListActions.replace(response))
    } catch (error) {
      throw new Error(error)
    } finally {
      dispatch(shoppingListActions.setLoading(false))
    }
  }
}

export const addRecipe = (token: string | null, data: Recipe) => {
  return async (dispatch: Dispatch<any>, getState: () => StoreState) => {
    try {
      dispatch(shoppingListActions.setLoading(true))

      const initialState: ShoppingList = getState().shoppingList

      const newShoppingList: ShoppingList = {
        ingredients: data.ingredients,
      }

      dispatch(shoppingListActions.add(newShoppingList))
      const currentState: ShoppingList = getState().shoppingList

      let response: ShoppingList

      if (initialState.ingredients.length === 0) {
        response = await axiosRequest(
          'POST',
          token,
          endpoints.createShoppingList,
          currentState
        )
      } else {
        response = await axiosRequest(
          'PUT',
          token,
          endpoints.updateShoppingList,
          currentState // Pass the updated shopping list as data for the PUT request
        )
      }

      // Replace the shopping list in the store with the updated one
      dispatch(shoppingListActions.replace(response))
    } catch (error) {
      console.error('Error adding recipe:', error)
      throw new Error(error)
    } finally {
      dispatch(shoppingListActions.setLoading(false))
    }
  }
}

export const shoppingListActions = shoppingListSlice.actions
export default shoppingListSlice
