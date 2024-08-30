import { get, del, post } from '../utils/api';
import axios from '../utils/axiosConfig';

const BASE_URL = '/api/majors';

export const getAllMajors = (data) => {
    return post(`${BASE_URL}/search`, data);
};

export const getMajorById = (id) => {
    return get(`${BASE_URL}/${id}`);
};

export const createMajor = (majorData) => {
    return axios.post(BASE_URL, majorData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const updateMajor = (majorData) => {
    return axios.put(BASE_URL, majorData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const deleteMajor = (id) => {
    return del(`${BASE_URL}/${id}`);
};
