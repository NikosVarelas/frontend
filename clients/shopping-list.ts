import { axiosRequest } from '@/constants/axiosRequest'
import { endpoints } from '@/constants/endpoint'
import { type ShoppingList } from '@/models/ShoppingList'

export const fetchShoppingList = async (
  token: string | null | undefined
): Promise<ShoppingList> => {
  return await axiosRequest('GET', token, endpoints.getShoppingList)
}

export const addRecipeToSL = async (
  token: string | null | undefined,
  recipeId: number
): Promise<ShoppingList> => {
  return await axiosRequest(
    'POST',
    token,
    `${endpoints.addRecipeToSL}?recipe_id=${recipeId}`
  )
}

export const updateShoppingList = async (
  token: string | null | undefined,
  ingredients: any
): Promise<ShoppingList> => {
  return await axiosRequest('PUT', token, endpoints.updateShoppingList, {
    ingredients,
  })
}

export const deleteShoppingList = async (
  token: string | null | undefined
): Promise<void> => {
  return await axiosRequest('DELETE', token, endpoints.deleteShoppingList)
}

export const updateIngredient = async (
    token: string | null | undefined,
    ingredientId: number,
    isChecked: boolean
    ): Promise<ShoppingList> => {
    return await axiosRequest(
        'PUT',
        token,
        `${endpoints.updateIngredient}?ingredient_id=${ingredientId}`
    )
    }
