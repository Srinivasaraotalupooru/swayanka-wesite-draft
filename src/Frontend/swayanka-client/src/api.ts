import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust port if needed

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};

export const getCart = async (userId: string) => {
    const response = await api.get(`/cart/${userId}`);
    return response.data;
};

export const addToCart = async (userId: string, item: any) => {
    await api.post(`/cart/${userId}/items`, item);
};

export const removeFromCart = async (userId: string, index: number) => {
    await api.delete(`/cart/${userId}/items/${index}`);
};

export const clearCart = async (userId: string) => {
    await api.delete(`/cart/${userId}`);
};

export const getOrders = async (userId: string) => {
    const response = await api.get(`/orders/${userId}`);
    return response.data;
};

export const createOrder = async (order: any) => {
    const response = await api.post('/orders', order);
    return response.data;
};
