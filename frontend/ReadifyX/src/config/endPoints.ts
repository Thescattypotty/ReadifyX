export const BASE_URL = "http://localhost:8222/api/v1";

const API_ENDPOINTS = {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    GET_CURRENT: `${BASE_URL}/auth/user`
};
export default API_ENDPOINTS;
