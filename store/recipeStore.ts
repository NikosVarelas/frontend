import { create } from 'zustand'
import { type Recipe } from '@/models/Recipe'

interface RecipeState {
  recipes: Recipe[]
  replace: (recipes: Recipe[]) => void
}

export const useRecipeStore = create<RecipeState>((set) => ({
  recipes: [],
  replace: (newRecipes: Recipe[]) => {
    set( {recipes: newRecipes})
  }
}))
