import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import { FormInput, Button, Select } from '../../UIcomponents';

import classes from './CoursePage.module.css';
import restAPI from '../../axios-instances';

const languages = [
    { value: 'Türkçe', label: 'Türkçe' },
    { value: 'İngilizce', label: 'İngilizce' }
];

const schema = Yup.object().shape({
    courseCode: Yup.string().required('Ders kodu zorunludur'),
    // prerequisite :
    credit: Yup.number()
        .required('Dersin kredisinin girilmesi zorunludur')
        .integer('Lütfen tamsayı giriniz'),
    language: Yup.string()
        .oneOf(['Türkçe', 'İngilizce'])
        .required(),
    // goal: Yup.string().max(500, 'Maksimum 500 karakter'),
    // description: Yup.string().max(500, 'Maksimum 500 karakter')
    departmentCode: Yup.string()
        .max(3)
        .required(),
    title: Yup.string().required()
});

const CoursePage = () => {
    const [courses] = useState([
        { value: 'Hello', label: 'Hello' },
        { value: 'Kello', label: 'Kello' },
        { value: 'Dello', label: 'Dello' },
        { value: 'Fello', label: 'Fello' },
        { value: 'Gello', label: 'Gello' },
        { value: 'Lello', label: 'Lello' },
        { value: 'Nello', label: 'Nello' }
    ]);

    const onSubmit = async (values, { resetForm }) => {
        console.log(values);
        try {
            const res = await restAPI.post('/api/rest/admin/courses', values);
            console.log(res);
        } catch (error) {
            console.log(error.message);
        }
        resetForm();
    };

    return (
        <Formik
            initialValues={{
                departmentCode: '',
                courseCode: '',
                title: '',
                prerequisites: [],
                credit: '',
                language: 'Türkçe'
            }}
            validationSchema={schema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form className={classes.container}>
                    <h2 className={classes.center}>DEPARTMAN DERS EKLEME</h2>
                    <Field
                        name="departmentCode"
                        component={FormInput}
                        type="text"
                        label="Departman kodu*"
                    />
                    <Field
                        name="courseCode"
                        component={FormInput}
                        type="text"
                        label="Ders kodu*"
                    />
                    <Field
                        name="title"
                        component={FormInput}
                        type="text"
                        label="Ders Adı*"
                    />
                    <Field
                        name="prerequisites"
                        label="Ön koşul dersleri"
                        component={Select}
                        options={courses}
                        containerClass={classes.center}
                        multiple
                        size="3"
                    />
                    <Field
                        name="credit"
                        component={FormInput}
                        label="Dersin kredisi*"
                        type="text"
                    />
                    <Field
                        name="language"
                        component={Select}
                        label="Dersin dili*"
                        options={languages}
                        containerClass={classes.center}
                    />
                    {/* <Field
                        name="goal"
                        component={FormInput}
                        componentType="textarea"
                        label="Dersin amacı"
                        placeholder="Maximum 500 karakter"
                        rows="4"
                        cols="4"
                    />
                    <Field
                        name="description"
                        component={FormInput}
                        componentType="textarea"
                        label="Dersin tanımı"
                        placeholder="Maximum 500 karakter"
                        rows="4"
                        cols="4"
                    /> */}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        btnCLass={classes.btn}
                    >
                        Kaydet
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default CoursePage;
