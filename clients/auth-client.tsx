import axios from 'axios';
import { endpoints } from '@/constants/endpoint';

export type AuthData = {
  token: string;
};

export type ErrorMessage = {
  message: string
};

const logIn = async (username: string, password: string): Promise<AuthData | ErrorMessage> => {
  try {
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);
    const response = await axios.post(endpoints.authLoginAccessToken, data);

    const authData: AuthData = {
      token: response.data.access_token,
    };

    return authData;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage: ErrorMessage =  {
        message: error.response.data.detail
    }
    throw errorMessage
  } else {
    const errorMessage: ErrorMessage = {
      message: "An error occured"
    }
    throw errorMessage
  }
};}

export const authClient = {
  logIn,
};
