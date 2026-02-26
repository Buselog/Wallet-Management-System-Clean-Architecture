import React from 'react';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import WalletCard from '../components/WalletCard';
import { useDashboardData } from '../hooks/useDashboardData';
import { createWallet, deleteWallet } from '../services/walletService';
import { Wallet, Plus, Loader2, ArrowUpRight, ArrowDownLeft, XCircle } from 'lucide-react';
import Swal from 'sweetalert2';

function Dashboard() {
    const { wallets, totalBalance, loading, selectedWallet, setSelectedWallet, stats, fetchData, setLoading, formatDate } = useDashboardData();

    const handleCreateWallet = async () => {
        try {
            setLoading(true);
            await createWallet();
            await Swal.fire({ title: 'Başarılı!', text: 'Yeni cüzdanınız oluşturuldu.', icon: 'success', confirmButtonColor: '#991b1b', background: '#0f172a', color: '#fff' });
            await fetchData();
        } catch (error) {
            Swal.fire({ title: 'Hata', text: 'Cüzdan oluşturulamadı.', icon: 'error', background: '#0f172a', color: '#fff' });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteWallet = async (walletId) => {
        const result = await Swal.fire({
            title: 'Emin misiniz?',
            text: "Silme isteği sunucuya iletilecek ve kurallar kontrol edilecektir.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#991b1b',
            cancelButtonColor: '#334155',
            confirmButtonText: 'Evet, isteği gönder',
            cancelButtonText: 'Vazgeç',
            background: '#0f172a',
            color: '#fff'
        });

        if (result.isConfirmed) {
            try {
                await deleteWallet(walletId, localStorage.getItem('userId'));
                await Swal.fire({ title: 'Silindi!', text: 'Cüzdan başarıyla silindi.', icon: 'success', background: '#0f172a', color: '#fff', confirmButtonColor: "#991b1b" });
                if (selectedWallet?.id === walletId) {
                    setSelectedWallet(null);
                    localStorage.removeItem('activeWalletId');
                }
                await fetchData();
            } catch (error) {
                Swal.fire({ title: 'İşlem Reddedildi', text: error.response?.data?.Message, icon: 'error', background: '#0f172a', color: '#fff', confirmButtonColor: '#991b1b' });
            }
        }
    };

    const handleSelectWallet = (wallet) => {
        setSelectedWallet(wallet);
        localStorage.setItem('activeWalletId', wallet.id);
        Swal.fire({ title: 'Cüzdan Seçildi', text: `${wallet.id} ID'li cüzdan aktif.`, icon: 'info', timer: 1500, showConfirmButton: false, background: '#0f172a', color: '#fff' });
    };

    if (loading) return <div className="h-screen w-full flex items-center justify-center bg-[#0f172a]"><Loader2 className="animate-spin text-red-800" size={48} /></div>;

    return (
        <div className="flex h-screen overflow-hidden text-slate-200 font-sans">
            <Sidebar />
            <main className="flex-1 overflow-hidden bg-slate-900/50 p-6 md:p-8 flex flex-col">
                <div className="flex justify-between items-center mb-6 flex-shrink-0">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Ana Sayfa</h1>
                        <p className="text-slate-400 text-sm mt-1">Varlıklarınızın güncel dağılımı</p>
                    </div>
                    <button onClick={handleCreateWallet} className="flex items-center gap-2 bg-red-800 hover:bg-red-900 text-white px-5 py-2.5 rounded-2xl transition-all shadow-lg active:scale-95 shadow-red-900/20">
                        <Plus size={20} /> <span className="font-semibold text-sm">Yeni Cüzdan</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 flex-shrink-0">
                    <StatCard title={selectedWallet ? "Cüzdan Bakiyesi" : "Toplam Bakiye"} value={`₺${(selectedWallet ? selectedWallet.balance : totalBalance).toLocaleString()}`} icon={<Wallet className="text-[#f5f5dc]" />} type="total" trendData={{ label: selectedWallet ? "Seçili Cüzdan Portföyü" : "Varlık Portföyü" }} />
                    <StatCard title={selectedWallet ? "Cüzdan Geliri" : "Genel Gelirler"} value={`₺${(selectedWallet ? (selectedWallet.transactions?.filter(t => t.transactionType === 'deposit').sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))[0]?.amount || 0) : stats.aggregateDeposit).toLocaleString()}`} icon={<ArrowUpRight className="text-emerald-400" />} type="income" trendData={selectedWallet ? { date: formatDate(selectedWallet.transactions?.filter(t => t.transactionType === 'deposit').sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))[0]?.createdDate) } : stats.lastDepInfo} />
                    <StatCard title={selectedWallet ? "Cüzdan Gideri" : "Genel Giderler"} value={`₺${(selectedWallet ? (selectedWallet.transactions?.filter(t => t.transactionType === 'withdraw').sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))[0]?.amount || 0) : stats.aggregateWithdraw).toLocaleString()}`} icon={<ArrowDownLeft className="text-rose-400" />} type="expense" trendData={selectedWallet ? { date: formatDate(selectedWallet.transactions?.filter(t => t.transactionType === 'withdraw').sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))[0]?.createdDate) } : stats.lastWitInfo} />
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col flex-1 min-h-0 overflow-hidden">
                    <div className="flex justify-between items-start mb-5 flex-shrink-0">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-bold text-white leading-tight">Cüzdanlarım</h3>
                            <p className="text-slate-500 text-[11px] font-medium tracking-tight">İşlem yapmak için bir cüzdana tıklayarak seçim yapabilirsiniz.</p>
                        </div>
                        {selectedWallet && (
                            <button onClick={() => { setSelectedWallet(null); localStorage.removeItem('activeWalletId'); }} className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-red-400 transition-colors bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                                <XCircle size={14} /> Tümünü Göster
                            </button>
                        )}
                    </div>
                    <div className="overflow-y-auto pr-1 custom-scrollbar flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-2">
                            {wallets.map((wallet) => (
                                <WalletCard key={wallet.id} wallet={wallet} isSelected={selectedWallet?.id === wallet.id} onSelect={handleSelectWallet} onDelete={handleDeleteWallet} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;