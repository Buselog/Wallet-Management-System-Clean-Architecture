import React from 'react';
import Sidebar from '../components/Sidebar';
import TransactionModal from '../components/TransactionModal';
import EmptySelectionState from '../components/EmptySelectionState';
import { useTransactionLogic } from '../hooks/useTransactionLogic';
import { Wallet, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

function Transactions() {
    const {
        amount, setAmount,
        activeWallet,
        isModalOpen, setIsModalOpen,
        transactionType,
        loading,
        openConfirmModal
    } = useTransactionLogic();

    return (
        <div className="fixed inset-0 w-full h-full flex overflow-hidden font-sans text-slate-200">
            <Sidebar />

            <main className="flex-1 flex flex-col p-6 md:p-8 overflow-hidden items-center justify-center">
                <div className="max-w-4xl w-full flex flex-col">
                    <header className="mb-6 flex-shrink-0">
                        <h1 className="text-3xl font-bold text-white tracking-tight">İşlem Merkezi</h1>
                        <p className="text-slate-500 text-sm mt-1">Güvenli ve hızlı varlık yönetimi</p>
                    </header>

                    {!activeWallet && !loading ? (
                        <EmptySelectionState />
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch animate-in slide-in-from-bottom-4 duration-700">
                            {/* Cüzdan Bilgi Kartı */}
                            <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-3xl flex flex-col shadow-xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2.5 bg-red-800/20 rounded-xl text-emerald-500">
                                        <Wallet size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Aktif Cüzdan</h3>
                                        <p className="text-white font-bold text-base">ID: #{activeWallet?.id}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 py-4 border-y border-white/5">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-600 text-[9px] uppercase font-bold tracking-wider">Oluşturulma Tarihi</span>
                                        <span className="text-slate-300 text-xs font-medium">
                                            {activeWallet?.createdDate ? new Date(activeWallet.createdDate).toLocaleDateString('tr-TR') : '---'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-600 text-[9px] uppercase font-bold tracking-wider">Son İşlem Tarihi</span>
                                        <span className="text-slate-300 text-xs font-medium text-right">
                                            {activeWallet?.lastTransactionDate && activeWallet.lastTransactionDate !== "0001-01-01T00:00:00"
                                                ? new Date(activeWallet.lastTransactionDate).toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                                                : "İşlem geçmişi bulunamadı"}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Net Bakiye</span>
                                    <p className="text-4xl font-black text-white tracking-tight mt-1">
                                        ₺{activeWallet?.balance?.toLocaleString() || '0'}
                                    </p>
                                </div>
                            </div>

                            {/* İşlem Giriş Kartı */}
                            <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-md flex flex-col justify-center shadow-lg">
                                <label className="text-slate-500 text-[9px] font-bold uppercase mb-3 block ml-2 tracking-widest">Transfer Tutarı</label>
                                <div className="relative mb-6">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl font-bold text-red-600">₺</span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-black/30 border border-white/5 rounded-2xl pl-12 pr-6 py-4 text-2xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-red-800/30 transition-all placeholder:text-slate-800"
                                        placeholder="0"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button onClick={() => openConfirmModal('deposit')} className="flex-1 flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 py-3.5 rounded-xl transition-all active:scale-95 text-[10px] font-bold uppercase tracking-widest">
                                        <ArrowUpCircle size={16} /> Para Yatır
                                    </button>
                                    <button onClick={() => openConfirmModal('withdraw')} className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 py-3.5 rounded-xl transition-all active:scale-95 text-[10px] font-bold uppercase tracking-widest">
                                        <ArrowDownCircle size={16} /> Para Çek
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {isModalOpen && (
                <TransactionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    data={{
                        walletId: activeWallet?.id,
                        amount: amount,
                        type: transactionType,
                        date: new Date().toLocaleString('tr-TR')
                    }}
                />
            )}
        </div>
    );
}

export default Transactions;