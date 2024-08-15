import axios, { AxiosInstance, AxiosRequestHeaders } from "axios"

import { StorageKeys } from "../constants"

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${API_ENDPOINT}/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
})

// INFO: modify config
axiosInstance.interceptors.request.use(
  config => {
    return config
  },
  error => Promise.reject(error.response.data)
)

// INFO: modify reject
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    throw error.response.data
  }
)

// INFO: interceptor to store access auth and cms token
axiosInstance.interceptors.response.use(response => {
  if (response.data.access_token) {
    localStorage.set(StorageKeys.ACCESS_TOKEN, response.data.access_token)
  }
  return response
})

// INFO: if accessToken is present, send it with the request
axiosInstance.interceptors.request.use(
  config => {
    const modifiedHeaders = {
      ...config.headers,
      ...(localStorage.getItem(StorageKeys.ACCESS_TOKEN)
        ? {
            Authorization: `Bearer ${localStorage.getItem(StorageKeys.ACCESS_TOKEN)}`
          }
        : {})
    } as AxiosRequestHeaders
    return { ...config, headers: modifiedHeaders }
  },
  error => Promise.reject(error.response.data)
)

export default axiosInstance
