import React, { useState, useEffect } from 'react';

import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import { Button, Select } from '../../UIcomponents';
import classes from './SectionPage.module.css';
import restAPI from '../../axios-instances';

const schema = Yup.object().shape({
    department: Yup.string().required('Lütfen departman seçiniz')
});
const SectionPage = () => {
    const [deps, setDeps] = useState([]);
    const [courses, setCourses] = useState([]);
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await restAPI.get('/api/rest/admin/departments');
                setDeps(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDepartments();
    }, []);

    const depOpts = deps.map(dep => ({ value: dep.title, label: dep.title }));
    const courseOpts = courses.map(course => ({
        value: course,
        label: course
    }));
    const instOpts = instructors.map(instructor => ({
        value: instructor,
        label: instructor
    }));

    return (
        <Formik
            initialValues={{ department: '', course: '', instructor: '' }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                setTimeout(() => {
                    console.log(values);
                    setSubmitting(false);
                }, 1000);
            }}
        >
            {({ isValid, isSubmitting, dirty, values: { department } }) => (
                <Form className={classes.form}>
                    <Field
                        name="department"
                        component={Select}
                        options={depOpts}
                        label="Departman"
                        placeholder="Lütfen departman seçiniz"
                    />
                    {department && (
                        <>
                            <Field
                                name="course"
                                component={Select}
                                options={courseOpts}
                                label="Ders"
                            />
                            <Field
                                name="instructor"
                                component={Select}
                                options={instOpts}
                                label="Öğretmen"
                            />
                        </>
                    )}
                    <Button
                        type="submit"
                        disabled={!dirty || isSubmitting || !isValid}
                        btnCLass={classes.formButton}
                    >
                        Kaydet
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default SectionPage;
