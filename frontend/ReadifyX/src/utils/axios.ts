import axios from "axios";
import type { HttpError } from "@refinedev/core";

const axiosInstance = axios.create({
  headers:{
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});


axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('refine-auth');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);

export { axiosInstance };
