import React, { useState, useCallback } from 'react';
import styles from './App.module.css';

import LoginForm from '../src/components/LoginForm';
import AuthContext from './context/auth-context';

import restAPI from './axios-instances';

function App() {
    const [token, setToken] = useState(() => localStorage.getItem('token'));

    const handleLogin = useCallback(async (username, password) => {
        try {
            const key = 'AIzaSyCpwgagPGGwVPSdQ0Yy_olLza3fnbtsAXc';
            const { data } = await restAPI.post(
                `accounts:signInWithPassword?key=${key}`,
                {
                    email: username,
                    password,
                    returnSecureToken: true
                }
            );
            console.log(data);
            setToken(data.idToken);
            localStorage.setItem('token', data.idToken);
        } catch (error) {
            console.log(error.response);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                token,
                login: handleLogin,
                singup: () => {}
            }}
        >
            {!token ? (
                <div className={styles.container}>
                    <LoginForm />
                </div>
            ) : (
                <p>Welcome to our project</p>
            )}
        </AuthContext.Provider>
    );
}

export default App;
