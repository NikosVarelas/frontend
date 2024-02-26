import { create } from 'zustand'
import { type Ingredient } from '@/models/Recipe'
import { type ShoppingList } from '@/models/ShoppingList'

export interface ShoppingListIngredient {
  ingredient: Ingredient
}

interface ItemChecked {
  id: number
  checked: boolean
}

interface ShoppingListStore {
  ingredients: ShoppingListIngredient[]
  loading: boolean
  errorMessage: string | undefined | null
  setItemChecked: (index: number, isChecked: boolean) => void
  checkedItems: ItemChecked[]
}

export const useShoppingListStore = create<ShoppingListStore>((set, get) => ({
  ingredients: [],
  checkedItems: [],
  loading: false,
  errorMessage: null,
  setItemChecked: (id: number, isChecked: boolean) => {
    const { checkedItems } = get()
    const index = checkedItems.findIndex((item) => item.id === id)
    if (index !== -1) {
      checkedItems[index].checked = isChecked
    } else {
      checkedItems.push({ id, checked: isChecked })
    }
    set({ checkedItems })
  },
}))
