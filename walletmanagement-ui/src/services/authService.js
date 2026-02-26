import api from './api';

export const register = async ({ username, email, password }) => {
    const payload = {
        Username: username,
        Email: email,
        Password: password,
    };
    const response = await api.post('/Auth/register', payload);
    return response.data;
};

export const login = async ({ username, password }) => {
    const payload = {
        Username: username,
        Password: password,
    };

    const response = await api.post('/Auth/login', payload);
    const data = response.data;
    const token = data.token || data.Token;
    const userId = data.userId || data.UserId;

    if (!token) {
        throw new Error('Giriş başarısız: Sunucudan token alınamadı.');
    }

    localStorage.setItem('token', token);
    localStorage.setItem('userName', username);
    if (userId) localStorage.setItem('userId', userId.toString());

    return data;
};