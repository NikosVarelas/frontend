import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Ingredient, type Recipe } from '@/models/Recipe'

export interface ShoppingList {
  recipes: Recipe[]
  loading: boolean
  ingredients: Ingredient[]
}

const initialState: ShoppingList = {
  recipes: [],
  loading: false,
  ingredients: []
}

const shoppingListSlice = createSlice({
  name: 'shopping-list',
  initialState,
  reducers: {
    add(state, action: PayloadAction<Recipe>) {
        state.recipes.push(action.payload)
        state.ingredients.concat(action.payload.ingredients)
      },
    delete(state) {},
    edit(state) {},
  },
})

export const shoppingListActions = shoppingListSlice.actions
export default shoppingListSlice
