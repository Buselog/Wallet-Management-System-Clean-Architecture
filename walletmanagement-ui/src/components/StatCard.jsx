import React from 'react';

const STATUS_STYLES = {
    total: "bg-[#f5f5dc]/10 text-[#f5f5dc] border-[#f5f5dc]/20",
    income: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    expense: "bg-rose-500/10 text-rose-400 border-rose-500/20"
};

function StatCard({ title, value, icon, type = "total", trendData }) {
    const { walletId, label, date } = trendData || {};
    const currentStyle = STATUS_STYLES[type] || STATUS_STYLES.total;

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-3xl hover:border-white/20 transition-all group cursor-default text-slate-100 shadow-xl relative overflow-hidden h-[160px] flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <div className="p-3 bg-slate-800/50 rounded-2xl group-hover:scale-110 transition-transform backdrop-blur-md">
                    {icon}
                </div>

               
                <div className={`px-3 py-1 rounded-xl border backdrop-blur-md ${currentStyle}`}>
                    {walletId ? (
                        <>
                           
                            <p className="text-[8px] opacity-70 font-black uppercase tracking-tighter leading-none mb-0.5">
                                Son İşlem:
                            </p>
                            <p className="text-[10px] font-bold tracking-tight">
                                Cüzdan #{walletId}
                            </p>
                        </>
                    ) : (
                        
                        <p className="text-[10px] font-bold tracking-tight">
                            {label || "Varlık Portföyü"}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.15em]">{title}</p>
                <h4 className="text-2xl font-black mt-1 tracking-tighter text-white">{value}</h4>
            </div>

            {/* SAĞ ALT: Tarih Bilgisi */}
            {date && (
                <div className="absolute bottom-4 right-5 text-right">
                    <p className="text-[#f5f5dc]/40 text-[9px] font-black tracking-widest leading-none mb-1">
                        Son İşlem Tarihi
                    </p>
                    <p className="text-[#f5f5dc] text-[11px] font-bold tracking-tight opacity-90">
                        {date}
                    </p>
                </div>
            )}
        </div>
    );
}

export default StatCard;