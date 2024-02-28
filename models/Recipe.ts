export interface Ingredient {
  id: number
  name: string
  measure: string
  processed_name: string | null
  recipe_id: number | null
  shopping_list_id: number | null
}

export interface Recipe {
  id?: number | null
  name: string
  description: string | null
  image_url: string | null
  ingredients: Ingredient[]
  instructions: string
}
