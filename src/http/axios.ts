import axios, {type AxiosInstance} from 'axios';

const httpClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Replace with your actual API URL
  timeout: 10000, // Optional timeout setting
  headers: {
    'Content-Type': 'application/json'
  }
});

export default httpClient;
