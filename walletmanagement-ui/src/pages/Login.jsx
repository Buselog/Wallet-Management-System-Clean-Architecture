import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthLogic } from '../hooks/useAuthLogic';
import loginHero from '../assets/login-hero.png';

function Login() {
    const {
        username, setUsername,
        password, setPassword,
        loading,
        errors,
        handleLogin
    } = useAuthLogic();

    return (
        <div className="h-screen w-full flex items-center justify-start px-4 md:px-12 py-8 bg-cover bg-center bg-no-repeat overflow-hidden" style={{ backgroundImage: `url(${loginHero})` }}>
            <div className="w-full max-w-md bg-white/25 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-3xl px-8 py-8 md:px-10 md:py-10">
                <div className="mb-6">
                    <p className="text-xs tracking-[0.25em] text-amber-200 font-medium mb-2" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.18)' }}>HOŞ GELDİNİZ</p>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-0.5">Wallet Management</h1>
                    <h2 className="text-base font-semibold text-slate-800 mb-2">Giriş Yap</h2>
                    <p className="text-sm text-slate-800/90">Cüzdanlarınızı yönetin, bakiyenizi takip edin ve işlemlerinizi güvenle gerçekleştirin.</p>
                </div>

                {errors.General && (
                    <div className="mb-4 rounded-xl border border-red-200 bg-red-50/90 px-3 py-2 text-sm text-red-700 font-bold">{errors.General[0]}</div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-slate-900 mb-1">Kullanıcı Adı</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={`w-full rounded-lg border ${errors.Username ? 'border-red-500 ring-1 ring-red-200' : 'border-orange-100'} bg-white/85 px-3 py-2 text-sm text-slate-900 font-semibold shadow-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300/70 placeholder:text-slate-400`}
                            placeholder="Kullanıcı Adı"
                            autoComplete="username"
                        />
                        {errors.Username && <p className="text-[10px] text-red-600 font-bold mt-1 ml-1 lowercase italic leading-none">*{errors.Username[0]}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-900 mb-1">Şifre</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full rounded-lg border ${errors.Password ? 'border-red-500 ring-1 ring-red-200' : 'border-orange-100'} bg-white/85 px-3 py-2 text-sm text-slate-900 font-semibold shadow-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300/70 placeholder:text-slate-400`}
                            placeholder="••••••••"
                            autoComplete="current-password"
                        />
                        {errors.Password && <p className="text-[10px] text-red-600 font-bold mt-1 ml-1 lowercase italic leading-none">*{errors.Password[0]}</p>}
                    </div>

                    <button type="submit" disabled={loading} className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-300/70 transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300/80 disabled:cursor-not-allowed disabled:opacity-80">
                        {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-slate-800/80">
                    Henüz hesabınız yok mu? <Link to="/register" className="font-semibold text-orange-700 hover:text-orange-800 font-extrabold transition-colors">Kayıt Ol</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;