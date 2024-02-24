import { axiosRequest } from "@/constants/axiosRequest";
import { endpoints } from "@/constants/endpoint";
import { type Recipe } from "@/models/Recipe";

export const fetchRecipes = async (token: string | null | undefined): Promise<Recipe[]> => {
    const response: Recipe[] = await axiosRequest(
        'GET',
        token,
        endpoints.getAllRecipes
    );
    return response;
};