export interface Recipe {
  description: string
  id: number
  image_url: string
  ingredients: Array<{
    name: string
    quantity: string
  }>
  name: string
}
