import React, { useRef } from 'react';
import Sidebar from '../components/Sidebar';
import TransactionRow from '../components/TransactionRow';
import { useTransactionHistory } from '../hooks/useTransactionHistory';
import { Calendar, ChevronLeft, ChevronRight, Loader2, ListFilter } from 'lucide-react';

function TransactionHistory() {
    const {
        wallets,
        selectedWalletId,
        setSelectedWalletId,
        history,
        loading,
        filters,
        setFilters,
        totalCount,
        formatNumericDate
    } = useTransactionHistory();

    const startInputRef = useRef(null);
    const endInputRef = useRef(null);

    return (
        <div className="fixed inset-0 w-full h-full flex overflow-hidden font-sans text-slate-200">
            <Sidebar />
            
            <main className="flex-1 flex flex-col p-8 md:p-10 h-full max-h-screen overflow-hidden">
                <div className="max-w-6xl w-full mx-auto flex flex-col h-full space-y-6">
                    
                    <header className="flex items-center justify-between flex-shrink-0">
                        <div>
                            <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
                                <ListFilter className="text-red-800" size={32} /> İşlem Geçmişi
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">Cüzdan hareketlerini saniye bazlı takip edin</p>
                        </div>

                        <div className="flex items-center bg-white/[0.03] p-2 rounded-2xl border border-white/10 backdrop-blur-md">
                            <div className="flex flex-col px-4 cursor-pointer group" onClick={() => startInputRef.current.showPicker()}>
                                <label className="text-[7px] font-black text-red-500 uppercase tracking-[0.2em] mb-0.5">Başlangıç Tarihi</label>
                                <div className="flex items-center gap-2">
                                    <Calendar size={12} className="text-slate-500 group-hover:text-red-500 transition-colors" />
                                    <input ref={startInputRef} type="date" value={filters.start} onChange={(e) => setFilters({...filters, start: e.target.value, page: 1})} className="bg-transparent border-none text-[11px] font-bold text-slate-200 focus:outline-none cursor-pointer p-0 [color-scheme:dark]" />
                                </div>
                            </div>
                            <div className="w-px h-6 bg-white/10 mx-2"></div>
                            <div className="flex flex-col px-4 cursor-pointer group" onClick={() => endInputRef.current.showPicker()}>
                                <label className="text-[7px] font-black text-red-500 uppercase tracking-[0.2em] mb-0.5">Bitiş Tarihi</label>
                                <div className="flex items-center gap-2">
                                    <Calendar size={12} className="text-slate-500 group-hover:text-red-500 transition-colors" />
                                    <input ref={endInputRef} type="date" value={filters.end} onChange={(e) => setFilters({...filters, end: e.target.value, page: 1})} className="bg-transparent border-none text-[11px] font-bold text-slate-200 focus:outline-none cursor-pointer p-0 [color-scheme:dark]" />
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="flex gap-3 overflow-x-auto pb-2 flex-shrink-0 custom-scrollbar">
                        {wallets.map(w => (
                            <button key={w.id} onClick={() => setSelectedWalletId(w.id)} className={`px-8 py-3 rounded-2xl border text-sm font-bold transition-all whitespace-nowrap ${selectedWalletId === w.id ? 'bg-red-800 text-white border-red-800 shadow-xl shadow-red-900/20' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}>
                                Cüzdan #{w.id}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col flex-1 min-h-0 backdrop-blur-md shadow-2xl">
                        {loading ? (
                            <div className="flex-1 flex items-center justify-center"><Loader2 className="animate-spin text-red-800" size={40} /></div>
                        ) : (
                            <table className="w-full text-left table-fixed border-collapse h-full">
                                <thead className="bg-white/5 text-[9px] uppercase font-black text-slate-500 tracking-[0.2em] flex-shrink-0">
                                    <tr>
                                        <th className="px-12 py-5 w-[28%]">Tarih</th>
                                        <th className="px-12 py-5 w-[24%] text-center">İşlem Türü</th>
                                        <th className="px-12 py-5 w-[24%] text-center">Miktar</th>
                                        <th className="px-12 py-5 w-[24%] text-right">Referans No</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 flex-1 h-full">
                                    {history.map((tx, idx) => (
                                        <TransactionRow key={idx} tx={tx} formatDate={formatNumericDate} />
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    <footer className="flex justify-between items-center px-6 py-4 flex-shrink-0">
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Toplam {totalCount} Kayıt</p>
                        <div className="flex items-center gap-4">
                            <button disabled={filters.page === 1} onClick={() => setFilters({...filters, page: filters.page - 1})} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 disabled:opacity-20 transition-all border border-white/5">
                                <ChevronLeft size={20} />
                            </button>
                            <div className="flex items-center justify-center bg-red-800 text-white text-xs font-black w-10 h-10 rounded-[1.2rem] shadow-xl shadow-red-900/40 border border-red-700">
                                {filters.page}
                            </div>
                            <button disabled={filters.page * filters.size >= totalCount} onClick={() => setFilters({...filters, page: filters.page + 1})} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 disabled:opacity-20 transition-all border border-white/5">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
}

export default TransactionHistory;