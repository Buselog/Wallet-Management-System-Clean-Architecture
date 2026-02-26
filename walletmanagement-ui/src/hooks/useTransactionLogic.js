import { useState, useEffect } from 'react';
import { getWallets } from '../services/walletService';

export const useTransactionLogic = () => {
    const [amount, setAmount] = useState('');
    const [activeWallet, setActiveWallet] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transactionType, setTransactionType] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActiveWallet = async () => {
            try {
                const wallets = await getWallets();
                const id = localStorage.getItem('activeWalletId');
                if (id) {
                    const selected = wallets.find(w => w.id === parseInt(id));
                    setActiveWallet(selected);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchActiveWallet();
    }, []);

    const openConfirmModal = (type) => {
        if (!amount || parseFloat(amount) <= 0) return;
        setTransactionType(type);
        setIsModalOpen(true);
    };

    return {
        amount, setAmount,
        activeWallet,
        isModalOpen, setIsModalOpen,
        transactionType,
        loading,
        openConfirmModal
    };
};