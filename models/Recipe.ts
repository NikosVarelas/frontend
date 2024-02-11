export interface Ingredient {
  name: string
  quantity: string
  quantity_type: string
}

export interface Recipe {
  id: number | null
  name: string
  description: string | null
  image_url: string | null
  ingredients: Ingredient[]
}
