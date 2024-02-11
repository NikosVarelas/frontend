import axios from 'axios'

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
    const response = await axios.post(url, data, { headers })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response != null) {
      console.log(error.response.data.detail)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      throw new Error(error.response.data.detail)
    } else {
      throw new Error('An error occured')
    }
  }
}

const getRequest = async (token: string | null, url: string): Promise<any> => {
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  }

  try {
    const response = await axios.get(url, { headers })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response != null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      throw new Error(error.response.data.detail)
    } else {
      throw new Error('An error occured')
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
    const response = await axios.delete(url, { headers })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response != null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      throw new Error(error.response.data.detail)
    } else {
      throw new Error('An error occured')
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
  } else {
    throw new Error('Unsupported HTTP method')
  }
}
