import { post } from '../utils/api';
import { setAuthToken } from '../utils/axiosConfig';

const BASE_URL = '/api/auth';

export const login = async (credentials) => {
    const response = await post(`${BASE_URL}/login`, credentials);
    if (response.data.token) {
        setAuthToken(response.data.token, response.data.role, response.data.userId);
    }
    return response;
};
