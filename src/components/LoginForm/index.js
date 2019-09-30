import React, { useState, useContext } from 'react';
import classes from './LoginForm.module.css';

import Button from '../../UIcomponents/Button';
import Input from '../../UIcomponents/Input';

import logo from './yildiz_logo_gercek.svg';

import AuthContext from '../../context/auth-context';

const LoginForm = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { isAuth, login, token } = useContext(AuthContext);

    const handleSubmit = async event => {
        event.preventDefault();
        setLoading(true);
        login(username, password);
        setLoading(false);
    };

    // console.log(isAuth, token);
    return (
        <form autoComplete="on" className={classes.container}>
            <header>
                <img src={logo} className={classes.logo} alt="Logo" />
                <h3>YILDIZ TEKNİK ÜNİVERSİTESİ ÖĞRENCİ BİLGİ SİSTEMİ</h3>
            </header>
            <Input
                type="text"
                label="Username"
                placeholder="username"
                value={username}
                onChange={event => setUsername(event.target.value)}
            />
            <Input
                type="password"
                label="Password"
                placeholder="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
            />
            <Button type="submit" disabled={loading} onClick={handleSubmit}>
                Login
            </Button>
        </form>
    );
};

export default LoginForm;
