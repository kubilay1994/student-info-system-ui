import React, { useState, useEffect, useCallback } from 'react';
import { navigate } from '@reach/router';
import restAPI from '../axios-instances';

import { useDispatch } from '../store';
import { setUser } from '../store/actions/user';

const AuthContext = React.createContext({
    token: null,
    error: null,
    loginDate: null,
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
        localStorage.removeItem('user');
        return null;
    }
    return token;
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => getTokenAndAdjustLocalStorage());
    const [error, setError] = useState(null);

    const dispatch = useCallback(useDispatch(), []);

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
            dispatch(setUser(null));
            localStorage.removeItem('user');

            delete restAPI.defaults.headers.common['Authorization'];
        }
    }, [token, dispatch]);

    const login = async (username, password) => {
        try {
            const { data } = await restAPI.post('/api/auth/generatetoken', {
                username,
                password
            });
            let userInfo;

            if (data.role === 'Admin') {
                userInfo = { role: data.role, user: data.user };
            } else {
                userInfo = { role: data.role, ...data.user };
            }
            setToken(data.accessToken);
            setError(null);
            dispatch(setUser(userInfo));
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('expiresInMillis', data.expiresInMillis);
            localStorage.setItem('user', JSON.stringify(userInfo));
        } catch (err) {
            if (err.response) {
                setError(err.response.data);
            }
            return false;
        }
        return true;
    };

    const clearAuthData = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expiresInMillis');
    };

    const signup = () => {};

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                signup,
                clearAuthData,
                error
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
