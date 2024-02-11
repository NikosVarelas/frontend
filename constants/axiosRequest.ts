
import axios from "axios";

const postRequest = async (token: string, data: any, url: string): Promise<[any, string | null]> => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    try {
        const response = await axios.post(url, data, { headers: headers });
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.detail)
        } else {
            throw new Error('An error occured')
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
            throw new Error(error.response.data.detail)
        } else {
            throw new Error('An error occured')
        }
    }
};

const deleteRequest = async (token: string, url: string): Promise<any> => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    try {
        const response = await axios.delete(url, { headers: headers });
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.detail)
        } else {
            throw new Error('An error occured')
        }
    }
};

export const axiosRequest = async (method: string, token: string, url: string, data = null): Promise<any> => {
    if (method === 'POST') {
        return postRequest(token, data, url);
    } else if (method === 'GET') {
        return getRequest(token, url);
    } else if (method === 'DELETE') {
        return deleteRequest(token, url);
    } else {
        throw new Error('Unsupported HTTP method');
    }
};