import axios from 'axios';
import { endpoints } from '@/constants/endpoint';

interface AuthData  {
  token: string | null;
};

const logIn = async (username: string, password: string): Promise<AuthData> => {
  try {
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);
    
    const response = await axios.post(endpoints.authLoginAccessToken, data);

    const authData: AuthData = {
      token: response.data.access_token,
    };

    console.log(authData)

    return authData;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.detail;
    } else {
      throw new Error("An error occurred");
    }
  }
};


export const authClient = {
  logIn,
};
