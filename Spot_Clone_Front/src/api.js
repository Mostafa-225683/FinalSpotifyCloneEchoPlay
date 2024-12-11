import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api/users', // Replace with your backend URL
});

export const registerUser = (userData) => API.post('/register', userData);
export const loginUser = (credentials) => API.post('/login', credentials);
