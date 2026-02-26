import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import TransactionHistory from './pages/TransactionHistory';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <div className="min-h-screen w-full bg-gradient-to-br from-black via-[#1e293b] to-black font-sans text-slate-200">
        <Routes>
          {/* Kimlik Doğrulama Yolları */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Uygulama Ana Yolları */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/history" element={<TransactionHistory />} />

          {/* Yönlendirme Kuralları */}
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
          />

          {/* Tanımsız Yollar */}
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;