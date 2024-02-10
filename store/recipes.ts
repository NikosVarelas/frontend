import { createSlice } from '@reduxjs/toolkit'
import { Recipe } from '@/clients/recipe-client';

const initialState: Recipe[] = [];

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        add(state, action) {
            console.log(`Adding recipe ${action.payload.id}`)
        },
        delete(state) {},
        edit(state) {},
    }
})

export const recipesActions = recipesSlice.actions;
export default recipesSlice;