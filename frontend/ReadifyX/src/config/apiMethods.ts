import axios, { HttpStatusCode } from "axios";
import { LoginRequest , JwtResponse, RegisterRequest, UserResponse } from "../interfaces";
import { axiosInstance } from "../utils/axios";
import API_ENDPOINTS from "./endPoints";


const handleAxiosError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message || 'An error occurred during the request';
    }
    return 'An unexpected error occurred';
};

export const loginUser = async (data: LoginRequest): Promise<JwtResponse> => {
    try {
        const response = await axiosInstance.post<JwtResponse>(API_ENDPOINTS.LOGIN, data);
        return response.data;
    } catch (error: unknown) {
        const message = handleAxiosError(error);
        console.error(`Login failed: ${message}`);
        throw new Error(message);
    }
};

export const registerUser = async (data: RegisterRequest): Promise<void> => {
    console.log("Trying to register");
    try {
        console.log("data",data);
        const response = await axiosInstance.post(API_ENDPOINTS.REGISTER, data);
        console.log("response",response);
        if(response.status != HttpStatusCode.Created)
        {
            const message = "An error occurred during the request";
            console.error(`Registration failed: ${message}`);
            throw new Error(message);
        }
    } catch (error: unknown) {
        const message = handleAxiosError(error);
        console.error(`Registration failed: ${message}`);
        throw new Error(message);
    }
};
export const getCurrentUser = async (data: string): Promise<UserResponse> => {
    try {
        const response = await axiosInstance.get<UserResponse>(API_ENDPOINTS.GET_CURRENT, {
            params: { username: data }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        const message = handleAxiosError(error);
        console.error(`Failed to get Current user: ${message}`);
        throw new Error(message);
    }
}
