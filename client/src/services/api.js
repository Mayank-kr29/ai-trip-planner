import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const createTrip = (tripData) => API.post('/trips/plan', tripData);
export const saveTrip = (tripData) => API.post('/trips/save', tripData);
export const updateTrip = (id, tripData) => API.put(`/trips/save/${id}`, tripData);
export const deleteTrip = (id) => API.delete(`/trips/${id}`);
export const getAllTrips = () => API.get('/trips');
