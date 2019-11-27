import React, { useEffect, useCallback } from 'react';
import { format } from 'date-fns';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Formik, Field, Form, FieldArray } from 'formik';
import * as Yup from 'yup';

import ClassroomPicker from '../ClassroomPicker';

import restAPI from '../../axios-instances';

import { Button, Select, FormInput } from '../../UIcomponents';
import classes from './SectionForm.module.css';
import { useSelector, useDispatch } from '../../store';
import { fetchCourses } from '../../store/actions/course';
import { fetchDeps } from '../../store/actions/department';

const schema = Yup.object().shape({
    sectionCode: Yup.string().required('Grup kodu zorunludur'),
    department: Yup.string().required('Lütfen departman seçiniz'),
    sectionClassrooms: Yup.array()
        .of(
            Yup.object().shape({
                startDate: Yup.date().required('Başlangıç zamanı giriniz'),
                finishDate: Yup.date().required('Bitiş zamanı giriniz'),
                classroomCode: Yup.string().required('Geçerli Derslik giriniz')
            })
        )
        .required('En az bir adet derslik bilgisi girmeniz gerekli')
});

const coursesSelector = state => state.course.courses;
const depsSelector = state => state.department.deps;

const SectionForm = () => {
    const courses = useSelector(coursesSelector);
    const deps = useSelector(depsSelector);

    const dispatch = useCallback(useDispatch(), []);

    useEffect(() => {
        dispatch(fetchCourses());
        dispatch(fetchDeps());
    }, [dispatch]);

    const depOpts = deps
        ? deps.map(dep => ({ value: dep.departmentCode, label: dep.title }))
        : [];

    const courseOpts = courses.map(course => ({
        value: course.courseCode,
        label: course.title
    }));

    const instOpts = [{ value: '99011001', label: 'M Utku Kalay' }];

    const onSubmit = async (values, { resetForm }) => {
        const body = {
            sectionCode: values.sectionCode,
            courseCode: values.course,
            departmentCode: values.department,
            instructorCode: values.instructor,
            sectionClassrooms: values.sectionClassrooms.map(item => ({
                ...item,
                startDate: format(item.startDate, 'HH:mm'),
                finishDate: format(item.finishDate, 'HH:mm')
            })),
            startDate: format(values.startDate, 'dd/MM/yyyy'),
            finishDate: format(values.finishDate, 'dd/MM/yyyy')
        };
        try {
            await restAPI.post('/api/rest/admin/sections', body);
        } catch (error) {
            console.log(error.message);
        } finally {
            // resetForm();
            console.log(body);
        }
    };

    return (
        <Formik
            initialValues={{
                sectionCode: '',
                department: '',
                course: '',
                instructor: '',
                startDate: new Date(),
                finishDate: new Date(),
                sectionClassrooms: []
            }}
            validationSchema={schema}
            onSubmit={onSubmit}
        >
            {({
                isValid,
                isSubmitting,
                dirty,
                setFieldValue,
                values: { department, startDate, finishDate }
            }) => (
                <Form className={classes.form}>
                    <h2>Ders Grubu Oluşturma Ekranı</h2>

                    <Field
                        name="sectionCode"
                        component={FormInput}
                        label="SectionCode"
                        placeholder="Lütfen grup kodunu giriniz"
                    />
                    <Field
                        name="department"
                        component={Select}
                        options={depOpts}
                        label="Departman"
                        placeholder="Lütfen departman seçiniz"
                        containerClass={classes.formSelectContainer}
                        selectClass={classes.formSelect}
                    />
                    {department && (
                        <>
                            <Field
                                name="course"
                                component={Select}
                                options={courseOpts}
                                label="Ders"
                                placeholder="Lütfen ders seçiniz"
                                containerClass={classes.formSelectContainer}
                                selectClass={classes.formSelect}
                            />
                            <Field
                                name="instructor"
                                component={Select}
                                options={instOpts}
                                label="Öğretmen"
                                placeholder="Lütfen öğretmen seçiniz"
                                containerClass={classes.formSelectContainer}
                                selectClass={classes.formSelect}
                            />

                            <div>
                                <div className={classes.dateContainer}>
                                    <label className={classes.label}>
                                        Ders Grubu başlangıç tarihi
                                    </label>
                                    <DatePicker
                                        className={classes.datePicker}
                                        selected={startDate}
                                        onChange={date =>
                                            setFieldValue('startDate', date)
                                        }
                                    />
                                </div>

                                <div className={classes.dateContainer}>
                                    <label className={classes.label}>
                                        Ders Grubu bitiş tarihi
                                    </label>
                                    <DatePicker
                                        className={classes.datePicker}
                                        selected={finishDate}
                                        onChange={date =>
                                            setFieldValue('finishDate', date)
                                        }
                                    />
                                </div>
                            </div>

                            <FieldArray
                                name="sectionClassrooms"
                                component={ClassroomPicker}
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

export default SectionForm;
