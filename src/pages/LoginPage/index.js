import React from 'react';
import LoginForm from '../../components/LoginForm';

import styles from './LoginPage.module.css';

const LoginPage = ({ navigate }) => {
    return (
        <div className={styles.container}>
            <LoginForm />
        </div>
    );
};

export default LoginPage;
