import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import FormInput from '../../UIcomponents/FormInput';
import Button from '../../UIcomponents/Button';
import ErrorInfo from '../../components/ErrorInfo';

import { useSelector, useDispatch } from '../../store';
import { setUser } from '../../store/actions/user';
import restAPI from '../../axios-instances';

import classes from './InfoForm.module.css';

// might be more complex
const phoneRegex = /^\d{7,10}$/;

const schema = Yup.object().shape({
    address: Yup.string(),
    province: Yup.string(),
    district: Yup.string(),
    phoneNumber: Yup.string().matches(
        phoneRegex,
        'Lütfen geçerli bir gsm giriniz'
    ),
    mail: Yup.string()
        .email('Lütfen geçerli bir email adresi giriniz')
        .required('Email adresi zoruludur')
});

const userSelector = state => state.user.user;

const InfoForm = () => {
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    const handleCredentialSubmit = async (values, { setStatus, resetForm }) => {
        try {
            const res = await restAPI.put(
                '/api/rest/common/credentials',
                values
            );
            dispatch(setUser(res.data));
            setStatus('İşlem Başarılı');
        } catch (error) {
            setStatus(error.message);
        }
    };

    return (
        <Formik
            initialValues={{
                address: user.address ? user.address : '',
                province: user.province ? user.province : '',
                district: user.district ? user.district : '',
                phoneNumber: user.phoneNumber ? user.phoneNumber : '',
                mail: user.mail ? user.mail : ''
            }}
            validationSchema={schema}
            onSubmit={handleCredentialSubmit}
        >
            {({ isSubmitting, status }) => (
                <Form className={classes.infoForm}>
                    <ErrorInfo message={status} />
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
                        name="phoneNumber"
                        type="tel"
                        label="Telefon"
                        placeholder="GSM giriniz"
                    />
                    <Field
                        component={FormInput}
                        name="mail"
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
