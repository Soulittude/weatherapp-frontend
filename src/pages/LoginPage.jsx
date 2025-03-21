import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/apiClient';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogin = async (credentials) => {
        try {
            const { data } = await api.post('/auth/login', credentials);
            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return <LoginForm onSubmit={handleLogin} error={error} />;
};

export default LoginPage;