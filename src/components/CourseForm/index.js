import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import { FormInput, Button, Select } from '../../UIcomponents';
import ErrorInfo from '../ErrorInfo';

import classes from './CourseForm.module.css';

import { useDispatch } from '../../store';
import { addCourse, updateCourse } from '../../store/actions/course';

const languages = [
    { value: 'Türkçe', label: 'Türkçe' },
    { value: 'İngilizce', label: 'İngilizce' }
];

const schema = Yup.object().shape({
    courseCode: Yup.string().required('Ders kodu zorunludur'),
    credit: Yup.number()
        .required('Dersin kredisinin girilmesi zorunludur')
        .integer('Lütfen tamsayı giriniz'),
    language: Yup.string()
        .oneOf(['Türkçe', 'İngilizce'])
        .required(),
    title: Yup.string().required()
});

const CourseForm = ({ courses, navigate, location }) => {
    const dispatch = useDispatch();
    const { editedCourse } = location.state;

    const editMode = !!editedCourse;

    // might be expensive consider useMemo later on
    const courseOptions = courses.map(({ courseCode, title }) => ({
        value: courseCode,
        label: title
    }));

    const onSubmit = async (values, { resetForm, setStatus }) => {
        const body = {
            ...values,
            courseCode: values.courseCode.toUpperCase()
        };
        try {
            if (editMode) {
                await dispatch(updateCourse(body));
                resetForm({ values });
            } else {
                await dispatch(addCourse(body));
                resetForm();
            }
            setStatus('İşlem Başarıyla Gerçekleştirildi');
        } catch (error) {
            if (error.response) {
                setStatus(error.response.data);
            }
        }
    };

    const initialValues = {
        departmentCode: 'BLM',
        courseCode: '',
        title: '',
        prerequisites: [],
        credit: 0,
        language: 'Türkçe'
    };

    return (
        <Formik
            initialValues={editedCourse || initialValues}
            validationSchema={schema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting, status }) => (
                <Form className={classes.container}>
                    <h2 className={classes.center}>
                        BİLGİSAYAR MÜDENDİSLİĞİ DERS
                        {editMode ? ' GÜNCELLEME' : ' EKLEME'} EKRANI
                    </h2>

                    <ErrorInfo message={status} />
                    <Field
                        name="courseCode"
                        component={FormInput}
                        type="text"
                        label="Ders kodu*"
                        inputClass={classes.uppercaseInput}
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
                        containerClass={`${classes.center} ${classes.select}`}
                        multiple
                        size="3"
                    />
                    <Field
                        name="credit"
                        component={FormInput}
                        label="Dersin kredisi*"
                        type="number"
                        inputClass={classes.courseNumInput}
                        min="0"
                    />
                    <Field
                        name="language"
                        component={Select}
                        label="Dersin dili*"
                        options={languages}
                        containerClass={classes.center}
                    />
                    <div className={classes.btnContainer}>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            btnCLass={classes.btn}
                            color="outline-blue"
                        >
                            {editMode ? 'Güncelle' : 'Kaydet'}
                        </Button>
                        <Button
                            type="button"
                            btnCLass={classes.btn}
                            onClick={() => navigate('/admin/courses')}
                            color="outline-red"
                        >
                            Geri
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default CourseForm;
