import { configureStore } from '@reduxjs/toolkit';
import recipesSlice, { type RecipeState } from './recipes';
import shoppingListSlice from './shopping-list';

export interface StoreState {
    recipes: RecipeState
}

const store = configureStore({
    reducer: {
        recipes: recipesSlice.reducer,
        shoppingList: shoppingListSlice.reducer
        }
})

export default store;