import React, { useCallback, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import { FormInput, Button, Select } from '../../UIcomponents';

import classes from './CoursePage.module.css';

import { useDispatch, useSelector } from '../../store';
import { fetchCourses, addCourse } from '../../store/actions/course';

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

const coursesSelector = state => state.course.courses;

const CoursePage = () => {
    const courses = useSelector(coursesSelector);
    const dispatch = useCallback(useDispatch(), []);

    // might be expensive consider useMemo later on
    const courseOptions = courses.map(({ courseCode }) => ({
        value: courseCode,
        label: courseCode
    }));

    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);

    const onSubmit = async (values, { resetForm }) => {
        try {
            await dispatch(addCourse(values));
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
                credit: 0,
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
                        options={courseOptions}
                        containerClass={classes.center}
                        multiple
                        size="3"
                    />
                    <Field
                        name="credit"
                        component={FormInput}
                        label="Dersin kredisi*"
                        type="number"
                    />
                    <Field
                        name="language"
                        component={Select}
                        label="Dersin dili*"
                        options={languages}
                        containerClass={classes.center}
                    />
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
