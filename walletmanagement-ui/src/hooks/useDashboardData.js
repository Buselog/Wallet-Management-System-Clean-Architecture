import { useState, useEffect } from 'react';
import { getWallets, getBalance } from '../services/walletService';

export const useDashboardData = () => {
    const [wallets, setWallets] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [stats, setStats] = useState({
        aggregateDeposit: 0,
        aggregateWithdraw: 0,
        lastDepInfo: { date: null, walletId: null },
        lastWitInfo: { date: null, walletId: null }
    });

    const formatDate = (dateStr) => {
        if (!dateStr) return null;
        return new Date(dateStr).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const fetchData = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) return;

            const [walletsData] = await Promise.all([getWallets(), getBalance(userId)]);
            const currentWallets = walletsData || [];
            
            setWallets(currentWallets);
            setTotalBalance(currentWallets.reduce((acc, w) => acc + (w.balance || 0), 0));

            const savedId = localStorage.getItem('activeWalletId');
            if (savedId) {
                const saved = currentWallets.find(w => w.id === parseInt(savedId));
                if (saved) setSelectedWallet(saved);
            }

            let dep = 0, wit = 0;
            currentWallets.forEach(w => {
                const txs = w.transactions || [];
                const lastD = [...txs].filter(t => t.transactionType === 'deposit').sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))[0];
                const lastW = [...txs].filter(t => t.transactionType === 'withdraw').sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))[0];
                if (lastD) dep += lastD.amount;
                if (lastW) wit += lastW.amount;
            });

            const allTxs = currentWallets.flatMap(w => (w.transactions || []).map(t => ({ ...t, parentWalletId: w.id })));
            const gLastD = [...allTxs].filter(t => t.transactionType === 'deposit').sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))[0];
            const gLastW = [...allTxs].filter(t => t.transactionType === 'withdraw').sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))[0];

            setStats({
                aggregateDeposit: dep,
                aggregateWithdraw: wit,
                lastDepInfo: { date: formatDate(gLastD?.createdDate), walletId: gLastD?.parentWalletId },
                lastWitInfo: { date: formatDate(gLastW?.createdDate), walletId: gLastW?.parentWalletId }
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    return { wallets, totalBalance, loading, selectedWallet, setSelectedWallet, stats, fetchData, setLoading, formatDate };
};