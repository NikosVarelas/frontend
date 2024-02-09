import axios from "axios";
import { endpoints } from "@/constants/endpoint";


export interface User {
    id: Number
    recipes: [] | null
    isActive: boolean
}


const getUser = async (token: string):  Promise<User> => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      };

    try {
    const response = await axios.get(endpoints.getUserMe, { headers })
    const userData: User = {
        id: response.data.id,
        recipes: response.data.recipes,
        isActive: response.data.is_active
        }
        console.log(userData)
    return userData
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data.detail
          } 
        else {
            throw "An error occured"
        }
    }
}

export const UserClient = {
    getUser
}