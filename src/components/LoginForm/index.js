import React, { useContext } from 'react';
import { Formik, ErrorMessage, FastField } from 'formik';
import * as Yup from 'yup';
import { navigate } from '@reach/router';

import classes from './LoginForm.module.css';

import Button from '../../UIcomponents/Button';
import FormInput from '../../UIcomponents/FormInput';

import logo from './yildiz_logo_gercek.png';

import AuthContext from '../../context/auth-context';
import ReCaptcha from 'react-google-recaptcha';

const reCaptchaKey = '6LeedrsUAAAAAOfoIrPCidkMGZkin1OBYP_GAwlF';

const loginValidationSchema = Yup.object().shape({
    username: Yup.string()
        .trim()
        // .email()
        // .matches(
        //     /^[A-Za-z][0-9]{7,8}$/,
        //     'Username must start with a letter than continue with 7 or 8 numbers'
        // )
        .required(),
    password: Yup.string()
        .trim()
        .min(6)
        .required(),
    isVerified: Yup.string()
        .required('Invalid Security Info')
        .nullable()
});

const LoginForm = props => {
    const { login, error: AuthError } = useContext(AuthContext);

    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
                isVerified: null
            }}
            validationSchema={loginValidationSchema}
            onSubmit={async ({ username, password }) => {
                const success = await login(username, password);
                if (success) {
                    navigate('/');
                }
            }}
        >
            {({ handleSubmit, isSubmitting, setFieldValue }) => (
                <form
                    className={classes.container}
                    onSubmit={handleSubmit}
                    autoComplete="on"
                >
                    <header>
                        <img src={logo} className={classes.logo} alt="Logo" />
                        <h3>YTÜ BİLGİSAYAR MÜHENDİSLİĞİ BİLGİ SİSTEMİ</h3>
                    </header>

                    {AuthError && (
                        <div className={classes.error}>
                            {/* Oturum süreniz dolmuştur. Lütfen tekrar giriş
                            yapınız. */}
                            {AuthError.message}
                        </div>
                    )}
                    <ErrorMessage
                        name="isVerified"
                        component="div"
                        className={classes.error}
                    />

                    <FastField
                        component={FormInput}
                        type="text"
                        label="Username"
                        name="username"
                        placeholder="Username"
                        containerClass={classes.loginInputContainer}
                    />
                    <FastField
                        component={FormInput}
                        type="password"
                        name="password"
                        label="Password"
                        placeholder="password"
                        containerClass={classes.loginInputContainer}
                    />

                    <ReCaptcha
                        name="isVerified"
                        sitekey={reCaptchaKey}
                        onChange={token => setFieldValue('isVerified', token)}
                        className={classes.reCaptcha}
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        btnCLass={classes.block}
                    >
                        Login
                    </Button>
                </form>
            )}
        </Formik>
    );
};

export default LoginForm;
