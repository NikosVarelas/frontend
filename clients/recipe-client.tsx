import axios from "axios";
import { endpoints } from "@/constants/endpoint";


export interface Ingredient {
    name: string
    quantity: string
    quantity_type: string
}

export interface Recipe {
    name: string
    description: string
    image_url: string
    ingredients: Ingredient[]

}



const createRecipe = async (token: string, recipe: Recipe): Promise<Recipe> => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    try {
        const response = await axios.post(endpoints.createRecipe, recipe, { headers: headers });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data.detail;
        } else {
            throw "An error occurred";
        }
    }
};


const getRecipe = async (token: string): Promise<Recipe> => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      };

    try {
        const response = await axios.get(endpoints.getRecipe, { headers })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data.detail
          } 
        else {
            throw "An error occured"
        }
    }
}

const getAllRecipes = async (token: string): Promise<Recipe[]> => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      try {
        const response = await axios.get(endpoints.getAllRecipes, { headers })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data.detail
          } 
        else {
            throw "An error occured"
        }
    }
}

export const RecipeClient = {
    createRecipe,
    getRecipe,
    getAllRecipes
}