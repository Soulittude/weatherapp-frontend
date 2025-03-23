import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const LoginPage = () => {
    const navigate = useNavigate();
    const { user, login } = useAuth();
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);

    const handleLogin = async (email, password) => {
        try {
            const { data } = await api.post('/auth/login', { email, password });
            login(data.token); // Update auth state
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return <LoginForm onSubmit={handleLogin} error={error} />;
};

export default LoginPage;