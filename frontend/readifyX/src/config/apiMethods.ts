// src/api/apiMethods.ts
import axios, { HttpStatusCode } from "axios";
import axiosInstance from "./axiosInstance";
import API_ENDPOINTS from "./endPoints";
import { LoginRequest ,JwtResponse, RegisterRequest, UserRequest,UserResponse} from "../interfaces";


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
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.REGISTER, data);
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

export const saveUser = async (data: UserRequest): Promise<void> => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.SAVE_USER, data);
        if(response.status != HttpStatusCode.Created)
        {
            const message = "An error occurred during the request";
            console.error(`Registration failed: ${message}`);
            throw new Error(message);
        }
    } catch (error: unknown) {
        const message = handleAxiosError(error);
        console.error(`Saving user failed: ${message}`);
        throw new Error(message);
    }
};

export const findAllUsers = async (): Promise<UserResponse[]> => {
    try {
        const response = await axiosInstance.get<UserResponse[]>(API_ENDPOINTS.FIND_ALL_USERS);
        return response.data;
    } catch (error: unknown) {
        const message = handleAxiosError(error);
        console.error(`Fetching all users failed: ${message}`);
        throw new Error(message);
    }
};

export const findUserById = async (id: string): Promise<UserResponse> => {
    try {
        const response = await axiosInstance.get<UserResponse>(API_ENDPOINTS.FIND_ONE_USER(id));
        return response.data;
    } catch (error: unknown) {
        const message = handleAxiosError(error);
        console.error(`Fetching user by ID failed: ${message}`);
        throw new Error(message);
    }
};

export const verifyUserExistence = async (username?: string, email?: string): Promise<boolean> => {
    try {
        const response = await axiosInstance.post<boolean>(API_ENDPOINTS.VERIFY_USER_EXISTENCE, { username, email });
        return response.data;
    } catch (error: unknown) {
        const message = handleAxiosError(error);
        console.error(`Verifying user existence failed: ${message}`);
        throw new Error(message);
    }
};
export const updateUser = async(id: string , user: UserRequest): Promise<void> => {
    try {
        const response = await axiosInstance.put<void>(API_ENDPOINTS.UPDATE_USER(id) , user);
        if(response.status != HttpStatusCode.Accepted)
        {
            const message = "An error occurred during the request";
            console.error(`Updating User failed: ${message}`);
            throw new Error(message);
        }
    } catch (error: unknown) {
        const message = handleAxiosError(error);
        console.error(`Updating user failed: ${message}`);
        throw new Error(message);
    }
}

export const deleteUser = async(id: string): Promise<void> => {
    try {
        const response = await axiosInstance.delete<void>(API_ENDPOINTS.DELETE_USER(id));
        if(response.status != HttpStatusCode.Accepted)
        {
            const message = "An error occurred during the request";
            console.error(`Deleting User failed: ${message}`);
            throw new Error(message);
        }
    } catch (error: unknown) {
        const message = handleAxiosError(error);
        console.error(`Deleting user failed: ${message}`);
        throw new Error(message);
    }
}