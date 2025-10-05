import axios from 'axios';

const API_URL = 'http://localhost:5000/api/services';

export const getServices = () => axios.get(API_URL);

export const createService = (serviceData, token) =>
  axios.post(API_URL, serviceData, {
    headers: { Authorization: `Bearer ${token}` },
  });
