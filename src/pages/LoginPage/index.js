import React from 'react';
import LoginForm from '../../components/LoginForm';

import styles from './LoginPage.module.css';

const LoginPage = props => {
    return (
        <div className={styles.container}>
            <LoginForm />
        </div>
    );
};

export default LoginPage;
