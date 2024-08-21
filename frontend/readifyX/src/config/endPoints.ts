
export const BASE_URL = "http://localhost:8222/api/v1";

const API_ENDPOINTS = {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    SAVE_USER: `${BASE_URL}/user`,
    FIND_ALL_USERS: `${BASE_URL}/user`,
    FIND_ONE_USER: (id: string) => `${BASE_URL}/user/${id}`,
    VERIFY_USER_EXISTENCE: `${BASE_URL}/user/exist`,
    UPDATE_USER: (id: string) => `${BASE_URL}/user/${id}`,
    DELETE_USER: (id: string) => `${BASE_URL}/user/${id}`
};
export default API_ENDPOINTS;
