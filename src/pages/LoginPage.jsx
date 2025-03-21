import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogin = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return <LoginForm onSubmit={handleLogin} error={error} />;
};

export default LoginPage;