import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Recipe } from '@/clients/recipe-client'
import { axiosRequest } from '@/constants/axiosRequest'
import { endpoints } from '@/constants/endpoint'
import { type Dispatch } from 'redux'

const initialState: Recipe[] = []

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    add(state, action: PayloadAction<Recipe>) {
      state.push(action.payload)
    },
    delete(state, action: PayloadAction<number>) {
        return state.filter(recipe => recipe.id !== action.payload)
      },
    edit(state) {},
    replace(state, action) {
      return action.payload
    },
  },
})

export const fetchRecipeData = (token: string | null) => {
  return async (dispatch: Dispatch<PayloadAction<Recipe[]>>) => {
    try {
      const response = await axiosRequest('GET', token, endpoints.getAllRecipes)

      dispatch(recipesSlice.actions.replace(response))
    } catch (error) {
      throw new Error(error)
    }
  }
}

export const createRecipe = (token: string | null, data: Recipe) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response: Recipe = await axiosRequest(
        'POST',
        token,
        endpoints.createRecipe,
        data
      )
      dispatch(recipesSlice.actions.add(response))
    } catch (error) {
      throw new Error(error)
    }
  }
}

export const deleteRecipe = (token: string | null, id: number) => {
    return async (dispatch: Dispatch<any>) => {
      try {
        await axiosRequest(
            'DELETE',
            token,
            endpoints.deleteRecipe + `/${id}`
          )
        dispatch(recipesSlice.actions.delete(id))
      } catch (error) {
        throw new Error(error)
      }
    }
  }

export const recipesActions = recipesSlice.actions
export default recipesSlice
