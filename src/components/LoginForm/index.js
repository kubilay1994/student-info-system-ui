import React, { useContext } from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

import classes from './LoginForm.module.css';

import Button from '../../UIcomponents/Button';
import FormInput from '../../UIcomponents/FormInput';

import logo from './yildiz_logo_gercek.svg';

import AuthContext from '../../context/auth-context';
import ReCaptcha from 'react-google-recaptcha';

const reCaptchaKey = '6LeedrsUAAAAAOfoIrPCidkMGZkin1OBYP_GAwlF';

const loginValidationSchema = Yup.object().shape({
    username: Yup.string()
        .trim()
        .email()
        // .matches(
        //     /^[A-Za-z][0-9]{7,8}$/,
        //     'Username must start with a letter than continue with 7 or 8 numbers'
        // )
        .required(),
    password: Yup.string()
        .trim()
        .min(6)
        .required(),
    isVerified: Yup.string().required('Invalid Security Info')
});

const LoginForm = props => {
    const { login } = useContext(AuthContext);

    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
                isVerified: ''
            }}
            validationSchema={loginValidationSchema}
            onSubmit={async ({ username, password }, { setSubmitting }) => {
                setSubmitting(true);
                await login(username, password);
                setSubmitting(false);
            }}
        >
            {({
                handleSubmit,
                isSubmitting,
                // isValid,
                setFieldValue
            }) => (
                <form
                    className={classes.container}
                    onSubmit={handleSubmit}
                    autoComplete="on"
                    
                >
                    <header>
                        <img src={logo} className={classes.logo} alt="Logo" />
                        <h3>
                            YILDIZ TEKNİK ÜNİVERSİTESİ ÖĞRENCİ BİLGİ SİSTEMİ
                        </h3>
                    </header>

                    <ErrorMessage
                        name="isVerified"
                        component="div"
                        className={classes.error}
                    />

                    <Field
                        component={FormInput}
                        type="text"
                        label="Username"
                        name="username"
                        placeholder="Username"
                    />
                    <Field
                        component={FormInput}
                        type="password"
                        name="password"
                        label="Password"
                        placeholder="password"
                    />

                    <ReCaptcha
                        name="isVerified"
                        sitekey={reCaptchaKey}
                        onChange={token => setFieldValue('isVerified', token)}
                        className={classes.reCaptcha}
                    />
                    <Button type="submit" disabled={isSubmitting}>
                        Login
                    </Button>
                </form>
            )}
        </Formik>
    );
};

export default LoginForm;
