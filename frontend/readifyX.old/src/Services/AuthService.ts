import axios from 'axios'; // Import AxiosError for type checking
import axiosInstance from "../Config/AxiosInstance";

import { LoginRequest } from "../Types/Request/LoginRequest";
import { JwtResponse } from "../Types/Response/JwtResponse";
import API_ENDPOINTS from "../Config/ApiConfig";

export async function login(loginRequest : LoginRequest): Promise<JwtResponse>
{
    try {
        const response = await axiosInstance.post<JwtResponse>(API_ENDPOINTS.LOGIN, loginRequest);
        return response?.data;
    } catch (error: unknown) {
        if(axios.isAxiosError(error))
        {
            throw new Error(error.response?.data?.message || 'Login failed');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
}