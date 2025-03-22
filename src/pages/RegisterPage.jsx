import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleRegister = async (username, email, password) => {
        try {
            const { data } = await api.post('/auth/register', { username, email, password });
            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        }
    };

    return <RegisterForm onSubmit={handleRegister} error={error} />;
};

export default RegisterPage;