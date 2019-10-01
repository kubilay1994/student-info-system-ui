import React, { useState, useCallback } from 'react';
import styles from './App.module.css';

import LoginForm from '../src/components/LoginForm';
import AuthContext from './context/auth-context';

import restAPI from './axios-instances';

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [token, setToken] = useState(null);

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
            setToken(data.idToken)
            setIsAuth(true);
        } catch (error) {
            console.log(error.response);
        }
    }, []);
    return (
        <AuthContext.Provider
            value={{
                isAuth,
                token,
                login: handleLogin,
                singup: () => {}
            }}
        >
            <div className={styles.container}>
                <LoginForm />
            </div>
        </AuthContext.Provider>
    );
}

export default App;
