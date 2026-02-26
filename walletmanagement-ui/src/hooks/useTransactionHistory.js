import { useState, useEffect, useCallback } from 'react';
import { getWallets } from '../services/walletService';
import axios from 'axios';

export const useTransactionHistory = () => {
    const [wallets, setWallets] = useState([]);
    const [selectedWalletId, setSelectedWalletId] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [filters, setFilters] = useState({ start: '', end: '', page: 1, size: 3 });

    useEffect(() => {
        const loadInitialData = async () => {
            const data = await getWallets();
            setWallets(data);
            const savedId = localStorage.getItem('activeWalletId');
            setSelectedWalletId(savedId ? parseInt(savedId) : (data[0]?.id || null));
        };
        loadInitialData();
    }, []);

    const fetchHistory = useCallback(async () => {
        if (!selectedWalletId) return;

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5138/api/Wallet/history/${selectedWalletId}`, {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    start: filters.start || null,
                    end: filters.end || null,
                    page: filters.page,
                    size: filters.size
                }
            });
            setHistory(response.data.items || []);
            setTotalCount(response.data.totalCount || 0);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [selectedWalletId, filters]);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    const formatNumericDate = (dateStr) => {
        const d = new Date(dateStr);
        const pad = (n) => n.toString().padStart(2, '0');
        return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    };

    return {
        wallets,
        selectedWalletId,
        setSelectedWalletId,
        history,
        loading,
        filters,
        setFilters,
        totalCount,
        formatNumericDate
    };
};