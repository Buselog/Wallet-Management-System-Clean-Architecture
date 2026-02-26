import React from 'react';
import { Info } from 'lucide-react';

const EmptySelectionState = () => (
    <div className="bg-white/5 border border-white/10 p-12 rounded-[2.5rem] backdrop-blur-3xl flex flex-col items-center justify-center text-center shadow-2xl animate-in fade-in zoom-in duration-500">
        <div className="p-5 bg-red-800/10 rounded-3xl text-red-500 mb-6 border border-red-800/20">
            <Info size={40} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Henüz Bir Cüzdan Seçilmedi</h2>
        <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-8">
            İşlem yapabilmek, bakiyenizi ve işlem geçmişinizi görüntülemek için lütfen önce <strong className="text-white">Ana Sayfa</strong> üzerinden bir cüzdan seçin.
        </p>
        <a 
            href="/dashboard" 
            className="px-8 py-3.5 bg-red-800 hover:bg-red-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-red-900/20 active:scale-95"
        >
            Cüzdan Seçmeye Git
        </a>
    </div>
);

export default EmptySelectionState;