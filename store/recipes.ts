import { createSlice } from '@reduxjs/toolkit'
import { type Recipe } from '@/clients/recipe-client'
import { axiosRequest } from '@/constants/axiosRequest'
import { endpoints } from '@/constants/endpoint'

const initialState: Recipe[] = []

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    add(state, action) {
      console.log(`Adding recipe ${action.payload.id}`)
    },
    delete(state) {},
    edit(state) {},
    replace(state, action) {
      return action.payload
    },
  },
})

export const fetchRecipeData = (token: string) => {
  return async (
    dispatch: (arg0: { payload: any; type: 'recipes/replace' }) => void
  ) => {
    try {
      // Fetch data from the API
      const response = await axiosRequest('GET', token, endpoints.getAllRecipes)

      dispatch(recipesSlice.actions.replace(response))
    } catch (error) {
      // Handle errors
      console.log(error)
      throw new Error(error)
    }
  }
}

export const recipesActions = recipesSlice.actions
export default recipesSlice
