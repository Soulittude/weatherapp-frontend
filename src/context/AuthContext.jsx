import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (token) => {
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        setUser({
            id: decoded.id,
            username: decoded.username // Ensure this matches your JWT payload
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser({
                    id: decoded.id,
                    username: decoded.username // Ensure username is set
                });
            } catch (err) {
                logout(); // Clear invalid token
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);