import React from 'react';
import { Trash2 } from 'lucide-react';

const WalletCard = ({ wallet, isSelected, onSelect, onDelete }) => (
    <div
        onClick={() => onSelect(wallet)}
        className={`p-4 rounded-2xl border transition-all group cursor-pointer flex flex-col justify-between h-[105px] ${
            isSelected ? 'bg-red-800/20 border-red-800 shadow-xl' : 'bg-white/5 border-white/10 hover:border-red-800/50 hover:bg-white/[0.08]'
        }`}
    >
        <div className="flex justify-between items-center mb-1">
            <p className="text-[10px] font-medium text-slate-400 uppercase">Bireysel Cüzdan</p>
            <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 font-bold">ID: #{wallet.id}</span>
                <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(wallet.id); }}
                    className="p-1 text-slate-500 hover:text-red-500 transition-colors"
                >
                    <Trash2 size={13} />
                </button>
            </div>
        </div>
        <p className="text-2xl font-black text-white group-hover:text-red-400 transition-colors">
            ₺{(wallet.balance || 0).toLocaleString()}
        </p>
    </div>
);

export default WalletCard;