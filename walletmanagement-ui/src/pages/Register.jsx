import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthLogic } from '../hooks/useAuthLogic';
import registerHero from '../assets/register-hero.png';

function Register() {
    const {
        username, setUsername,
        email, setEmail,
        password, setPassword,
        loading, errors,
        handleRegister
    } = useAuthLogic();

    return (
        <div className="h-screen w-full flex items-center justify-start px-4 md:px-12 bg-cover bg-center bg-no-repeat overflow-hidden font-sans" style={{ backgroundImage: `url(${registerHero})` }}>
            <div className="w-full max-w-md bg-white/20 backdrop-blur-2xl border border-white/40 shadow-xl rounded-3xl px-8 py-6 md:px-10">
                <div className="mb-3">
                    <p className="text-[10px] tracking-[0.25em] text-red-100/80 font-semibold mb-1" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>YENİ HESAP</p>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">Wallet Management</h1>
                    <h2 className="text-base font-semibold text-slate-800 mb-2">Kayıt Ol</h2>
                    <p className="text-xs md:text-sm text-slate-900 font-medium leading-relaxed opacity-90">Cüzdanlarınızı yönetin, bakiyenizi takip edin ve işlemlerinizi güvenle gerçekleştirin.</p>
                </div>

                {errors.General && (
                    <div className="mb-3 rounded-lg border border-red-200 bg-red-50/90 px-3 py-2 text-xs text-red-700 font-bold">{errors.General[0]}</div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="relative">
                        <label className="block text-sm font-medium text-slate-900 mb-1 ml-1">Kullanıcı Adı</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={`w-full rounded-xl border ${errors.Username ? 'border-red-500 ring-1 ring-red-200' : 'border-red-100'} bg-white/80 px-4 py-2 text-sm text-slate-900 font-semibold shadow-sm focus:outline-none focus:ring-1 focus:ring-red-400 transition-all placeholder:text-slate-400`}
                            placeholder="Kullanıcı Adı"
                        />
                        {errors.Username && <p className="text-[10px] text-red-300 font-bold mt-1 ml-1 lowercase italic leading-none">*{errors.Username[0]}</p>}
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-slate-900 mb-1 ml-1">E-posta</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full rounded-xl border ${errors.Email ? 'border-red-500 ring-1 ring-red-200' : 'border-red-100'} bg-white/80 px-4 py-2 text-sm text-slate-900 font-semibold shadow-sm focus:outline-none focus:ring-1 focus:ring-red-400 transition-all placeholder:text-slate-400`}
                            placeholder="E-posta"
                        />
                        {errors.Email && <p className="text-[10px] text-red-300 font-bold mt-1 ml-1 lowercase italic leading-none">*{errors.Email[0]}</p>}
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-slate-900 mb-1 ml-1">Şifre</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full rounded-xl border ${errors.Password ? 'border-red-500 ring-1 ring-red-200' : 'border-red-100'} bg-white/80 px-4 py-2 text-sm text-slate-900 font-semibold shadow-sm focus:outline-none focus:ring-1 focus:ring-red-400 transition-all placeholder:text-slate-400`}
                            placeholder="••••••••"
                        />
                        {errors.Password && <p className="text-[10px] text-red-300 font-bold mt-1 ml-1 lowercase italic leading-none">*{errors.Password[0]}</p>}
                    </div>

                    <button type="submit" disabled={loading} className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-red-800 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-red-950 active:scale-95 disabled:cursor-not-allowed disabled:opacity-80">
                        {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-slate-800/80">
                    Zaten hesabınız var mı? <Link to="/login" className="font-semibold text-red-900 hover:text-red-950 font-extrabold transition-colors">Giriş Yap</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;