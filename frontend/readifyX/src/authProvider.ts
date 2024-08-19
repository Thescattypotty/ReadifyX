import type { AuthActionResponse, AuthProvider } from "@refinedev/core";
import { LoginRequest } from "./types/Request/LoginRequest";
import { axiosInstance } from "@refinedev/simple-rest";
import { JwtResponse } from "./types/Response/JwtResponse";
import API_ENDPOINTS from "./config/apiConfig";
import axios, { HttpStatusCode } from "axios";

import * as jwtDecode from 'jwt-decode';
import { RegisterRequest } from "./types/Request/RegisterRequest";


export const TOKEN_KEY = "refine-auth";
export const REFRESH_TOKEN_KEY = "refine-refresh-auth";

interface JwtPayload{
  roles: string[];
}

export const authProvider: AuthProvider = {
  login: async (loginRequest: LoginRequest) => {
    try {
      const response = await axiosInstance.post<JwtResponse>(API_ENDPOINTS.LOGIN,loginRequest);
      
      const jwtResponse : JwtResponse = response.data;

      localStorage.setItem(TOKEN_KEY, jwtResponse.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, jwtResponse.refreshToken);
      console.log(jwtResponse);
      return{
        success: true,
        redirectTo: "/",
      };

    } catch (error: unknown) {
      var message: string;

      if(axios.isAxiosError(error))
      {
        message = error.response?.data?.message || 'Login Failed';
      }else{
        message = 'An unexpected error occurred';
      }
      console.log(error);
      return {
        success: false,
        error: {
          name: "LoginError",
          message: message
        },
      };
    }
  },
  register: async (registerRequest: RegisterRequest): Promise<AuthActionResponse> => {
    try {
      const response = await axiosInstance.post<void>(API_ENDPOINTS.REGISTER, registerRequest);
      if (response.status == HttpStatusCode.Created) {
        console.log(response);
        return {
          success: true,
          redirectTo: "/login",
        };
      } else {
        return {
          success: false,
          error: {
            name: "RegisterError",
            message: 'Unexpected response status',
          },
        };
      }
    } catch (error: unknown) {
      var message: string;

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || 'Register failed';
      } else {
        message = 'An unexpected error occurred';
      }
      return {
          success: false,
          error: {
            name: "RegisterError",
            message: message,
          },
        };
    }
  },

  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    //verify with backend , i should create an api for this !
    if(token)
    {
      return{
        authenticated: true,
      };
    }
    return{
      authenticated: false,
      redirectTo: "/login"
    };
  },
  getPermissions: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      try {
        const decodedToken: JwtPayload = jwtDecode.jwtDecode(token);
        return decodedToken.roles;
      } catch (error) {
        console.error('Failed to decode token', error);
      }
    }
    return null;
  },

  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if(token){
      try {
        
      } catch (error) {
        
      }
    }
    return null;
  },
  
  onError: async (error) => {
    console.log(error);
    return { error }
  },
};
