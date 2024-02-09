
import axios from "axios";

const postRequest = async (token: string, data: any, url: string): Promise<any> => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    try {
        const response = await axios.post(url, data, { headers: headers });
        return [response.data, null];
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            [null , error.response.data.detail]
        } else {
            [null, "An error occurred"];
        }
    }
};

const getRequest = async (token: string, url: string): Promise<any> => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    try {
        const response = await axios.get(url, { headers: headers });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            [null , error.response.data.detail]
        } else {
            [null, "An error occurred"];
        }
    }
};

export const axiosRequest = async (method: string, token: string, url: string, data = null): Promise<any> => {
    if (method === 'POST') {
        return postRequest(token, data, url);
    } else if (method === 'GET') {
        return getRequest(token, url);
    } else {
        throw new Error('Unsupported HTTP method');
    }
};