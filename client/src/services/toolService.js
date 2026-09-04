import { fetchWithAuth } from './api';

export const fetchTools = async () => {
    const response = await fetchWithAuth('/tools');

    if (!response.ok) {
        let errorMessage = `Server error: ${response.status} ${response.statusText}`;
        try {
            const errorData = await response.json();
            if (errorData && errorData.message) {
                errorMessage = errorData.message;
            }
        } catch (e) {
            // Response was not JSON (e.g. HTML 404 or 413 error page)
        }
        throw new Error(errorMessage);
    }

    return await response.json();
};

export const createTool = async (toolData) => {
    const response = await fetchWithAuth('/tools', {
        method: 'POST',
        body: JSON.stringify(toolData)
    });

    if (!response.ok) {
        let errorMessage = `Failed to create tool (${response.status} ${response.statusText})`;
        try {
            const errorData = await response.json();
            if (errorData && errorData.message) {
                errorMessage = errorData.message;
            }
        } catch (e) {
            if (response.status === 413) {
                errorMessage = 'Image payload is too large. Please select a smaller image.';
            }
        }
        throw new Error(errorMessage);
    }

    return await response.json();
};
