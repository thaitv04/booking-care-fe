import { get, put, post } from '../utils/api';

const BASE_URL = '/api/bookings';

export const getAllBookings = (data) => {
    return post(`${BASE_URL}/search`, data);
};

export const getCalendars = () => {
    return get(`${BASE_URL}/calendars`);
};

export const getBookingById = (id) => {
    return get(`${BASE_URL}/${id}`);
};

export const createBooking = (bookingData) => {
    return post(BASE_URL, bookingData);
};

export const updateBooking = (bookingData) => {
    return put(BASE_URL, bookingData);
};
