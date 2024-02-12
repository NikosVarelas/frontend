import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Ingredient } from '@/models/Recipe'
import { type Dispatch } from 'redux'
import { axiosRequest } from '@/constants/axiosRequest'
import { endpoints } from '@/constants/endpoint'
import { type ShoppingList } from '@/models/ShoppingList'

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
      state.ingredients.concat(action.payload.ingredients)
    },
    replace(state, action: PayloadAction<ShoppingList>) {
      state.ingredients = action.payload.ingredients
    },
    delete(state) {},
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
        const response: Ingredient[] = await axiosRequest(
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
  

export const shoppingListActions = shoppingListSlice.actions
export default shoppingListSlice
