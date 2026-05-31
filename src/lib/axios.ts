import axios from 'axios';
import type { 
  InternalAxiosRequestConfig, 
  AxiosResponse, 
  AxiosError 
} from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const currentParams = config.params || {};

    config.params = {
      ...currentParams,
      api_key: import.meta.env.VITE_TMDB_API_KEY,
      language: 'en-US',
    };
    
    return config;
  },
  (error: unknown): Promise<never> => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<never> => {
    if (error.response) {
      const statusMessage = (error.response.data as { status_message?: string })?.status_message;
      console.error(
        `TMDB API Error [${error.response.status}]:`, 
        statusMessage || error.message
      );
    } else if (error.request) {
      console.error('TMDB API Error: No response received from server', error.request);
    } else {
      console.error('TMDB API Error Config:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;