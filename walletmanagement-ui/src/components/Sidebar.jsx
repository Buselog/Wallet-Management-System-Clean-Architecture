import React from 'react';
import { LayoutDashboard, ArrowLeftRight, ListFilter, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';


const MENU_ITEMS = [
    { name: 'Ana Sayfa', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'İşlem Yap', icon: ArrowLeftRight, path: '/transactions' },
    { name: 'İşlem Geçmişi', icon: ListFilter, path: '/history' },
];

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        // Tüm oturum verilerini tek seferde temizleme işlemi:
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="hidden md:flex flex-col w-64 bg-gradient-to-b from-black to-[#0f172a] border-r border-white/5 h-screen p-6">

            {/* Logo Alanı */}
            <div className="flex items-center gap-3 px-2 mb-10">
                <div className="w-8 h-8 bg-red-800 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-red-900/40">
                    W
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent italic">
                    Wallet App
                </span>
            </div>

            {/* Navigasyon Menüsü */}
            <nav className="flex-1 space-y-2">
                {MENU_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${isActive
                                    ? 'bg-red-800 text-white shadow-lg shadow-red-900/20'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <span className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-red-400'}`}>
                                <Icon size={20} />
                            </span>
                            <span className="text-sm font-medium">{item.name}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Alt Alan / Çıkış Yap */}
            <div className="pt-6 border-t border-white/5">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-rose-500/10 rounded-2xl transition-all group"
                >
                    <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Çıkış Yap</span>
                </button>
            </div>
        </div>
    );
}

export default Sidebar;