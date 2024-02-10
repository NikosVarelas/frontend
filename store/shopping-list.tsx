import { createSlice } from '@reduxjs/toolkit'

const initialState: [] = [];

const shoppingListSlice = createSlice({
    name: 'shopping-list',
    initialState,
    reducers: {
        add(state, action) {
            console.log(`Adding recipe to shopping list${action.payload.id}`)
        },
        delete(state) {},
        edit(state) {},
    }
})

export const shoppingListActions = shoppingListSlice.actions
export default shoppingListSlice