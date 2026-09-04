const API_URL = '/api/rentals';

const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user && user.token
        ? { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` }
        : { 'Content-Type': 'application/json' };
};

export const getRentals = async () => {
    const response = await fetch(API_URL, {
        headers: getAuthHeaders(),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch rentals');
    }
    return data;
};

export const returnTool = async (rentalId) => {
    const response = await fetch(`${API_URL}/${rentalId}/return`, {
        method: 'PUT',
        headers: getAuthHeaders(),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to mark tool as returned');
    }
    return data;
};