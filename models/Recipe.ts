export interface Ingredient {
  name: string
  measure: string
}

export interface Recipe {
  id?: number | null
  name: string
  description: string | null
  image_url: string | null
  ingredients: Ingredient[]
}
