import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Recipe, type Ingredient } from '@/models/Recipe'
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
    return async (dispatch: Dispatch<any>, getState: () => RootState) => {
      try {
        dispatch(shoppingListActions.setLoading(true))
  
        // Create a new ShoppingList object with the added recipe ingredients
        const newShoppingList: ShoppingList = {
          ingredients: data.ingredients,
        }
  
        // Dispatch the 'add' action to add the new shopping list to the store
        dispatch(shoppingListActions.add(newShoppingList))
  
        // Get the current state of the shopping list from the Redux store
        const currentState = getState().shoppingList
        console.log(currentState)
  
        // Send the updated shopping list to the server using axiosRequest
        const response: ShoppingList = await axiosRequest(
          'PUT',
          token,
          endpoints.updateShoppingList,
          currentState  // Pass the updated shopping list as data for the PUT request
        )
  
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

