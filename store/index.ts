import { configureStore } from '@reduxjs/toolkit';
import recipesSlice from './recipes';
import shoppingListSlice from './shopping-list';

const store = configureStore({
    reducer: {
        recipes: recipesSlice.reducer,
        shoppingList: shoppingListSlice.reducer
        }
})

export default store;