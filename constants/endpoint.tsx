import axios from "axios"

const axiosEndpoint = (baseURL: string) => {
    return (token: string) => {
        return axios.create({
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    };
};

export const endpoints = {
    authLoginAccessToken: "http://192.168.0.37:8000/v1/auth/login/access-token",
    getUserMe: "http://192.168.0.37:8000/v1/user/me",
    createRecipe: "http://localhost:8000/v1/recipe/add",
    getRecipe: "http://localhost:8000/v1/recipe",
    getAllRecipes: "http://localhost:8000/v1/recipe/recipes",
    deleteRecipe: "http://localhost:8000/v1/recipe/delete"
}