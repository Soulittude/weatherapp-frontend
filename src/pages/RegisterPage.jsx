import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleRegister = async (username, email, password) => {
        try {
            const response = await api.post('/auth/register', { username, email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    };

    return <RegisterForm onSubmit={handleRegister} error={error} />;
};

export default RegisterPage;