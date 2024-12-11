import axios from 'axios';

export const fetchPromotions = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/myprofile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        return null;
    }
};
