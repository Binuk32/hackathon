console.log('API_BASE_URL =', import.meta.env.VITE_API_BASE_URL);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://indunilrents.onrender.com/api';

export const fetchWithAuth = async (endpoint, options = {}) => {
    const storedUser = JSON.parse(localStorage.getItem('indunil_admin'));
    const token = storedUser?.token;

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    return response;
};