import { create } from 'zustand'
import { axiosRequest } from '@/constants/axiosRequest'
import { endpoints } from '@/constants/endpoint'

export interface Recipe {
  id: number
  name: string
  // Add more properties as needed
}

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
    set((state) => ({ ...state, loading: true }))
    try {
      const response: Recipe[] = await axiosRequest(
        'GET',
        token,
        endpoints.getAllRecipes
      )
      set((state) => ({ ...state, recipes: response, loading: false, errorMessage: null }))
    } catch (error) {
      set({errorMessage: error})
    } finally {
      set((state) => ({ ...state, loading: false }))
    }
  },
}))
