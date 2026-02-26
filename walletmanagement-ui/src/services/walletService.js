import api from './api';

export const getWallets = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId || userId === "null" || userId === "undefined") {
        return [];
    }
    const response = await api.get(`/Wallet/my-wallets/${userId}`);
    return response.data;
};

export const getBalance = async (userId) => {
    const response = await api.get(`/Wallet/balance/${userId}`);
    return response.data.balance;
};

export const createWallet = async () => {
    const userId = parseInt(localStorage.getItem('userId'));
    
    const response = await api.post('/Wallet/createWallet', userId, {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
};

export const deleteWallet = async (walletId, userId) => {
    const response = await api.delete(`/Wallet/${walletId}/${userId}`);
    return response.data;
};

export const deposit = async ({ walletId, amount, referenceId }) => {
    const payload = {
        WalletId: walletId,
        Amount: amount,
        ReferenceId: referenceId,
    };
    const response = await api.post('/Wallet/deposit', payload);
    return response.data;
};

export const withdraw = async ({ walletId, amount, referenceId }) => {
    const payload = {
        WalletId: walletId,
        Amount: amount,
        ReferenceId: referenceId,
    };
    const response = await api.post('/Wallet/withdraw', payload);
    return response.data;
};