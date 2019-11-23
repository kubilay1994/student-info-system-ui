import React, { useEffect, useCallback } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import { Button, Select } from '../../UIcomponents';
import classes from './SectionPage.module.css';
import { useSelector, useDispatch } from '../../store';
import { fetchCourses } from '../../store/actions/course';
import { fetchDeps } from '../../store/actions/department';

const schema = Yup.object().shape({
    department: Yup.string().required('Lütfen departman seçiniz')
});

const coursesSelector = state => state.course.courses;
const depsSelector = state => state.department.deps;
const SectionPage = () => {
    // const [courses, setCourses] = useState([]);
    const courses = useSelector(coursesSelector);
    const deps = useSelector(depsSelector);
    // const [instructors, setInstructors] = useState([]);

    const dispatch = useCallback(useDispatch(), []);

    useEffect(() => {
        dispatch(fetchCourses());
        dispatch(fetchDeps());
    }, [dispatch]);

    const depOpts = deps
        ? deps.map(dep => ({ value: dep.title, label: dep.title }))
        : [];

    const courseOpts = courses.map(course => ({
        value: course.courseCode,
        label: course.courseCode
    }));

    // const instOpts = instructors.map(instructor => ({
    //     value: instructor,
    //     label: instructor
    // }));
    const instOpts = [];

    return (
        <Formik
            initialValues={{
                department: '',
                course: '',
                instructor: '',
                startDate: null,
                finishDate: null
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                setTimeout(() => {
                    console.log(values);
                    setSubmitting(false);
                }, 1000);
            }}
        >
            {({
                isValid,
                isSubmitting,
                dirty,
                setFieldValue,
                values: { department, startDate, finishDate }
            }) => (
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
                            <DatePicker
                                selected={startDate}
                                onChange={setFieldValue}
                            />
                            <DatePicker
                                selected={finishDate}
                                onChange={setFieldValue}
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
