import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/authService';
import Swal from 'sweetalert2';

export const useAuthLogic = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);
        try {
            const response = await login({ username, password });
            const data = response.data || response;
            const token = data.token || data.Token;
            const userId = data.userId || data.UserId;

            if (token && userId) {
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId.toString());
                await Swal.fire({ title: 'Giriş Başarılı!', text: 'Yönlendiriliyorsunuz...', icon: 'success', confirmButtonColor: '#ff7f00' });
                navigate('/dashboard');
            } else {
                throw new Error("Giriş verileri eksik.");
            }
        } catch (err) {
            handleAuthError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);
        try {
            await register({ username, email, password });
            await Swal.fire({ title: 'Başarılı!', text: 'Hesabınız oluşturuldu, giriş yapabilirsiniz.', icon: 'success', confirmButtonColor: '#991b1b', confirmButtonText: 'Giriş Yap' });
            navigate('/login');
        } catch (err) {
            handleAuthError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAuthError = (err) => {
        const apiErrors = err?.response?.data?.errors;
        if (apiErrors) {
            setErrors(apiErrors);
        } else {
            const message = err?.response?.data?.message || err?.response?.data?.Message || err?.message || 'Bir hata oluştu.';
            setErrors({ General: [message] });
        }
    };

    return {
        username, setUsername,
        email, setEmail,
        password, setPassword,
        loading, errors,
        handleLogin, handleRegister
    };
};