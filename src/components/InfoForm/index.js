import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import FormInput from '../../UIcomponents/FormInput';
import Button from '../../UIcomponents/Button';

import { useSelector } from '../../store';
import classes from './InfoForm.module.css';

const schema = Yup.object().shape({
    address: Yup.string(),
    province: Yup.string(),
    district: Yup.string(),
    gsm: Yup.number().typeError('Lütfen geçerli bir numara giriniz'),
    email: Yup.string()
        .email('Lütfen geçerli bir email adresi giriniz')
        .required('Email adresi zoruludur')
});


const userSelector = state => state.user.user;

const InfoForm = () => {
    const user = useSelector(userSelector);


    return (
        <Formik
            initialValues={{
                address: user.address ? user.address : '',
                province: '',
                district: '',
                gsm: user.phoneNumber ? user.phoneNumber : '',
                email: user.mail ? user.mail : ''
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                setTimeout(() => setSubmitting(false), 5000);
            }}
        >
            {({ isSubmitting }) => (
                <Form className={classes.infoForm}>
                    <span>İletişim Bilgileri</span>
                    <Field
                        component={FormInput}
                        name="address"
                        type="text"
                        label="Adress"
                        placeholder="Adres giriniz"
                    />
                    <div className={classes.inputGrup}>
                        <Field
                            component={FormInput}
                            name="province"
                            type="text"
                            label="İl"
                        />
                        <Field
                            component={FormInput}
                            name="district"
                            type="text"
                            label="İlçe"
                        />
                    </div>
                    <Field
                        component={FormInput}
                        name="gsm"
                        type="tel"
                        label="Telefon"
                        placeholder="GSM giriniz"
                    />
                    <Field
                        component={FormInput}
                        name="email"
                        type="email"
                        label="Email  *"
                    />
                    <Button
                        type="submit"
                        color="turkuaz"
                        disabled={isSubmitting}
                        btnCLass={classes.saveButton}
                    >
                        Kaydet
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default InfoForm;
