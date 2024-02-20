import { create } from 'zustand'
import { axiosRequest } from '@/constants/axiosRequest'
import { endpoints } from '@/constants/endpoint'
import { type Recipe } from '@/models/Recipe'

interface RecipeState {
  recipes: Recipe[]
  loading: boolean
  errorMessage: string | null
  fetchRecipes: (token: string | null) => Promise<void>
}

export const useRecipeStore = create<RecipeState>((set) => ({
  recipes: [],
  loading: false,
  errorMessage: null,
  fetchRecipes: async (token: string | null | undefined) => {
    set((state) => ({ ...state, loading: true, errorMessage: null }))
    try {
      const response: Recipe[] = await axiosRequest(
        'GET',
        token,
        endpoints.getAllRecipes
      )
      set((state) => ({
        ...state,
        recipes: response,
        loading: false,
        errorMessage: null,
      }))
    } catch (error) {
      set({ errorMessage: 'Failed to load recipes!' })
    } finally {
      set((state) => ({ ...state, loading: false }))
    }
  },
}))
