import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import restAPI from '../axios-instances';

const AuthContext = React.createContext({
    token: null,
    error: null,
    login: () => {},
    singup: () => {},
    clearAuthData: () => {}
});

const getTokenAndAdjustLocalStorage = () => {
    const token = localStorage.getItem('token');
    const expireTime = localStorage.getItem('expiresInMillis');

    // if token is expired
    if (token && expireTime < Date.now()) {
        localStorage.removeItem('token');
        localStorage.removeItem('expiresInMillis');
        return null;
    }
    return token;
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => getTokenAndAdjustLocalStorage());
    const [error, setError] = useState(null);

    useEffect(() => {
        const interceptor = restAPI.interceptors.response.use(
            res => res,
            err => {
                if (err.response && err.response.status === 401) {
                    clearAuthData();
                    setError(err.response.data);
                }
                return Promise.reject(err);
            }
        );
        return () => restAPI.interceptors.response.eject(interceptor);
    }, []);

    useEffect(() => {
        if (token) {
            restAPI.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${token}`;
        } else {
            navigate('/login', { replace: true });
            delete restAPI.defaults.headers.common['Authorization'];
        }
    }, [token]);

    const login = async (username, password) => {
        try {
            const { data } = await restAPI.post('/api/auth/generatetoken', {
                username,
                password
            });
            setToken(data.accessToken);
            setError(null);
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('expiresInMillis', data.expiresInMillis);
        } catch (err) {
            if (err.response) {
                setError(err.response.data);
            }
            return false;
        }
        return true;
    };

    const signup = () => {};

    const clearAuthData = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expiresInMillis');
    };

    return (
        <AuthContext.Provider
            value={{ token, login, signup, clearAuthData, error }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
