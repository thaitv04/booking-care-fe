import { post } from '../utils/api';

const BASE_URL = '/api/times';

export const getAllTimes = (data) => {
    return post(`${BASE_URL}/search`, data);
};