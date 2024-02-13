import axios from "axios"

const postRequest = async (
  token: string | null,
  data: any,
  url: string
): Promise<[any, string | null]> => {
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  }

  try {
    const response = await axios.post(url, data, { headers, timeout: 5000 })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response != null) {
      throw new Error(error.response.data.detail)
    } else {
      throw new Error('An error occurred')
    }
  }
}

const getRequest = async (token: string | null, url: string): Promise<any> => {
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  }

  try {
    const response = await axios.get(url, { headers, timeout: 5000 }) // 5 second timeout
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response != null) {
      throw new Error(error.response.data.detail)
    } else {
      throw new Error('An error occurred')
    }
  }
}

const deleteRequest = async (
  token: string | null,
  url: string
): Promise<any> => {
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  }

  try {
    const response = await axios.delete(url, { headers, timeout: 5000 }) // 5 second timeout
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response != null) {
      throw new Error(error.response.data.detail)
    } else {
      throw new Error('An error occurred')
    }
  }
}

const putRequest = async (
  token: string | null,
  data: any,
  url: string
): Promise<any> => {
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  }

  try {
    const response = await axios.put(url, data, { headers, timeout: 5000 }) // 5 second timeout
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response != null) {
      throw new Error(error.response.data.detail)
    } else {
      throw new Error('An error occurred')
    }
  }
}

export const axiosRequest = async (
  method: string,
  token: string | null,
  url: string,
  data: any = null
): Promise<any> => {
  if (method === 'POST') {
    return await postRequest(token, data, url)
  } else if (method === 'GET') {
    return await getRequest(token, url)
  } else if (method === 'DELETE') {
    return await deleteRequest(token, url)
  } else if (method === 'PUT') {
    return await putRequest(token, data, url)
  } else {
    throw new Error('Unsupported HTTP method')
  }
}
