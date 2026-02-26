import React from 'react';

const TransactionRow = ({ tx, formatDate }) => (
    <tr className="hover:bg-white/[0.03] transition-all h-[calc(100%/3)]">
        <td className="px-12 text-[11px] text-slate-300 font-bold">
            {formatDate(tx.createdDate)}
        </td>
        <td className={`px-12 text-[10px] font-black tracking-widest text-center ${tx.transactionType === 'deposit' ? 'text-emerald-400' : 'text-rose-500'}`}>
            <div className="flex items-center justify-center gap-3">
                <span className={`w-1.5 h-1.5 rounded-full ${tx.transactionType === 'deposit' ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]' : 'bg-rose-500'}`}></span>
                {tx.transactionType === 'deposit' ? 'PARA YATIRMA' : 'PARA ÇEKME'}
            </div>
        </td>
        <td className={`px-12 text-base font-black text-center ${tx.transactionType === 'deposit' ? 'text-emerald-400' : 'text-rose-500'}`}>
            {tx.transactionType === 'deposit' ? '+' : '-'} ₺{tx.amount.toLocaleString()}
        </td>
        <td className="px-12 text-[9px] font-mono text-slate-600 text-right transition-colors tracking-tighter truncate">
            {tx.referenceId}
        </td>
    </tr>
);

export default TransactionRow;