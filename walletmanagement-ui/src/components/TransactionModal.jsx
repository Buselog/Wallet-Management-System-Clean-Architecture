import React, { useState, useEffect } from 'react';
import { deposit, withdraw } from '../services/walletService';
import Swal from 'sweetalert2';

const DetailRow = ({ label, value, highlight, color }) => (
    <div className="flex justify-between items-center font-bold uppercase tracking-wider">
        <span className="text-slate-500">{label}</span>
        <span className={`${highlight ? `${color} text-lg tracking-tight` : 'text-slate-200'}`}>
            {value}
        </span>
    </div>
);

function TransactionModal({ isOpen, onClose, data }) {
    const [timeLeft, setTimeLeft] = useState(50);

    useEffect(() => {
        if (timeLeft === 0) onClose();
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, onClose]);

    const handleConfirm = async () => {
        try {
            const payload = {
                walletId: data.walletId,
                amount: parseFloat(data.amount),
                referenceId: `REF-${Date.now()}`
            };
            
            data.type === 'deposit' ? await deposit(payload) : await withdraw(payload);

            await Swal.fire({
                title: 'Başarılı!',
                icon: 'success',
                background: '#020617',
                color: '#fff',
                confirmButtonColor: '#991b1b',
                timer: 1500
            });
            onClose();
            window.location.reload();
        } catch (err) {
            Swal.fire({ 
                title: 'Hata', 
                text: err.response?.data?.Message || "İşlem gerçekleştirilemedi.",
                icon: 'error', 
                background: '#020617', 
                color: '#fff',
                confirmButtonColor: '#991b1b'
            });
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm overflow-hidden">
            <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-[2.5rem] p-6 backdrop-blur-3xl shadow-2xl relative">
                <div className="flex justify-center mb-4 relative">
                    <svg className="w-16 h-16 transform -rotate-90">
                        <circle cx="32" cy="32" r="29" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/5" />
                        <circle 
                            cx="32" cy="32" r="29" stroke="currentColor" strokeWidth="4" fill="transparent"
                            strokeDasharray="182" 
                            style={{ strokeDashoffset: (timeLeft / 80) * 182, transition: 'stroke-dashoffset 1s linear' }}
                            className="text-red-600" 
                        />
                    </svg>
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-black text-white">{timeLeft}</span>
                </div>

                <h2 className="text-center text-xl font-bold text-white mb-1">İşlem Merkezi</h2>
                <p className="text-center text-slate-500 text-[11px] font-medium tracking-wide mb-6">Lütfen bilgileri kontrol edin.</p>

                <div className="space-y-3 mb-6 bg-black/40 p-5 rounded-[1.5rem] border border-white/5 shadow-inner text-[10px]">
                    <DetailRow label="Cüzdan" value={`#${data.walletId}`} />
                    <DetailRow label="Tür" value={data.type === 'deposit' ? 'Para Yatırma' : 'Para Çekme'} />
                    <DetailRow
                        label="Tutar"
                        value={`₺${parseFloat(data.amount).toLocaleString()}`}
                        highlight
                        color={data.type === 'deposit' ? 'text-emerald-400' : 'text-red-500'}
                    />
                    <DetailRow label="Tarih" value={data.date} />
                </div>

                <div className="flex gap-3">
                    <button onClick={handleConfirm} className="flex-1 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl font-bold text-[9px] uppercase tracking-widest transition-all">Onayla</button>
                    <button onClick={onClose} className="flex-1 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/10 rounded-xl font-bold text-[9px] uppercase tracking-widest transition-all">Vazgeç</button>
                </div>
            </div>
        </div>
    );
}

export default TransactionModal;