import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { user, login } = useAuth();
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);

    const handleRegister = async (username, email, password) => {
        try {
            const { data } = await api.post('/auth/register', { username, email, password });
            login(data.token); // Update auth state
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        }
    };

    return <RegisterForm onSubmit={handleRegister} error={error} />;
};

export default RegisterPage;