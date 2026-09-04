import { fetchWithAuth } from './api';

export const createRental = async (rentalData) => {
    const response = await fetchWithAuth('/rentals', {
        method: 'POST',
        body: JSON.stringify(rentalData)
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Failed to process rental');
    }
    return await response.json();
};

export const fetchRentals = async () => {
    const response = await fetchWithAuth('/rentals');
    if (!response.ok) throw new Error('Failed to fetch rentals');
    return await response.json();
};

export const returnTool = async (rentalId) => {
    const response = await fetchWithAuth(`/rentals/${rentalId}/return`, {
        method: 'PUT'
    });
    if (!response.ok) throw new Error('Failed to return tool');
    return await response.json();
};