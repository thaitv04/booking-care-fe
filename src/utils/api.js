import axios from './axiosConfig';

export const get = (url, config = {}) => {
    return axios.get(url, config);
};

export const post = (url, data, config = {}) => {
    return axios.post(url, data, config);
};

export const put = (url, data, config = {}) => {
    return axios.put(url, data, config);
};

export const del = (url, config = {}) => {
    return axios.delete(url, config);
};
