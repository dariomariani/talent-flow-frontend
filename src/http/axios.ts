import axios, {type AxiosInstance} from 'axios';
import {useAppStore} from "@/stores/app";

const httpClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Replace with your actual API URL
  timeout: 10000, // Optional timeout setting
  headers: {
    'Content-Type': 'application/json'
  }
});

export default httpClient;

// Add request interceptor
httpClient.interceptors.request.use(
  (config) => {
    const appStore = useAppStore();
    const token = appStore.authData?.token; // Get the token from the store

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
