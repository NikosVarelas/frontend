import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Recipe } from '@/models/Recipe'
import { axiosRequest } from '@/constants/axiosRequest'
import { endpoints } from '@/constants/endpoint'
import { type Dispatch } from 'redux'

export interface RecipeState {
  recipes: Recipe[];
  loading: boolean;
}

const initialState: RecipeState = {
  recipes: [],
  loading: false
}

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    add(state, action: PayloadAction<Recipe>) {
      state.recipes.push(action.payload)
    },
    delete(state, action: PayloadAction<number>) {
      state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload)
    },
    edit(state) {},
    replace(state, action: PayloadAction<Recipe[]>) {
      state.recipes = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    }
  },
})

export const fetchRecipeData = (token: string | null) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch(recipesActions.setLoading(true))
      const response: Recipe[] = await axiosRequest('GET', token, endpoints.getAllRecipes)
      dispatch(recipesSlice.actions.replace(response))
    } catch (error) {
      throw new Error(error)
    } finally {
      dispatch(recipesActions.setLoading(false))
    }
  }
}

export const createRecipe = (token: string | null, data: Recipe) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch(recipesActions.setLoading(true))
      const response: Recipe = await axiosRequest('POST', token, endpoints.createRecipe, data)
      dispatch(recipesSlice.actions.add(response))
    } catch (error) {
      throw new Error(error)
    } finally {
      dispatch(recipesActions.setLoading(false))
    }
  }
}

export const deleteRecipe = (token: string | null, id: number) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch(recipesActions.setLoading(true))
      await axiosRequest('DELETE', token, `${endpoints.deleteRecipe}/${id}`)
      dispatch(recipesSlice.actions.delete(id))
    } catch (error) {
      throw new Error(error)
    } finally {
      dispatch(recipesActions.setLoading(false))
    }
  }
}

export const recipesActions = { ...recipesSlice.actions, setLoading: recipesSlice.actions.setLoading }
export default recipesSlice
