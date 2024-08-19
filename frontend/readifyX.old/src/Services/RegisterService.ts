
import axiosInstance from "../Config/AxiosInstance";

import API_ENDPOINTS from '../Config/ApiConfig';
import { RegisterRequest } from "../Types/Request/RegisterRequest";
import axios, { HttpStatusCode } from "axios";

export async function register(registerRequest: RegisterRequest): Promise<boolean>
{
    try {
        const response = await axiosInstance.post<void>(API_ENDPOINTS.REGISTER, registerRequest);
        return response.status === HttpStatusCode.Created;
    } catch (error) {
        if(axios.isAxiosError(error))
        {
            throw new Error(error.response?.data?.message|| 'Register failed');
        }else{
            throw new Error('An unexpected error occured');
        }
    }
}