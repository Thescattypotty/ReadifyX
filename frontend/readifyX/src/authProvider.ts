import type { AuthActionResponse, AuthProvider } from "@refinedev/core";
import { axiosInstance } from "@refinedev/simple-rest";
import API_ENDPOINTS from "./config/endPoints";
import axios, { HttpStatusCode } from "axios";

import * as jwtDecode from 'jwt-decode';
import { LoginRequest ,RegisterRequest} from "./interfaces";
import { loginUser, registerUser } from "./config/apiMethods";

export const TOKEN_KEY = "refine-auth";
export const REFRESH_TOKEN_KEY = "refine-refresh-auth";

interface JwtPayload{
  roles: string[];
}

export const authProvider: AuthProvider = {
  login: async (loginRequest: LoginRequest) => {
    try {
      const jwtResponse = await loginUser(loginRequest); // Use the loginUser method

      localStorage.setItem(TOKEN_KEY, jwtResponse.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, jwtResponse.refreshToken);
      console.log(jwtResponse);
      return {
        success: true,
        redirectTo: "/",
      };
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Login Failed'
        : 'An unexpected error occurred';

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
      await registerUser(registerRequest);
      return {
        success: true,
        redirectTo: "/login",
      };
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Register failed'
        : 'An unexpected error occurred';

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
