import React, { useState, useEffect, useCallback } from 'react';
import { navigate } from '@reach/router';
import restAPI from '../axios-instances';

import { useDispatch } from '../store';
import { setRole, fetchUserInfoAndSet, setUser } from '../store/actions/user';

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
        localStorage.removeItem('role');
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
            const role = localStorage.getItem('role');
            dispatch(fetchUserInfoAndSet(role)).catch(err =>
                console.log(err.response)
            );
        } else {
            navigate('/login', { replace: true });
            dispatch(setRole(null));
            dispatch(setUser(null));
            localStorage.removeItem('role');
            delete restAPI.defaults.headers.common['Authorization'];
        }
    }, [token, dispatch]);

    const login = async (username, password) => {
        try {
            const { data } = await restAPI.post('/api/auth/generatetoken', {
                username,
                password
            });

            dispatch(setRole(data.role));
            localStorage.setItem('role', data.role);

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
