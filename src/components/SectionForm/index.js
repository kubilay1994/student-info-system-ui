import React, { useCallback } from 'react';
import { format } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';

import { Formik, Field, Form, FieldArray } from 'formik';
import * as Yup from 'yup';

import ClassroomPicker from '../ClassroomPicker';
import ErrorInfo from '../ErrorInfo';

import { Button, Select, FormInput } from '../../UIcomponents';
import classes from './SectionForm.module.css';
import { useSelector, useDispatch } from '../../store';
import { addSection, updateSection } from '../../store/actions/section';

const termOps = [
    { value: 'Güz', label: 'Güz' },
    { value: 'Bahar', label: 'Bahar' }
];

const currYear = new Date().getFullYear();

const schema = Yup.object().shape({
    sectionNumber: Yup.number().required('Grup kodu zorunludur'),
    course: Yup.string().required('Lütfen ders seçiniz'),
    sectionClassrooms: Yup.array()
        .of(
            Yup.object().shape({
                startTime: Yup.date().required('Başlangıç zamanı giriniz'),
                finishTime: Yup.date().required('Bitiş zamanı giriniz'),
                classroomCode: Yup.string().required('Geçerli Derslik giriniz')
            })
        )
        .required('En az bir adet derslik bilgisi girmeniz gerekli')
});

const coursesSelector = state => state.course.courses;

const SectionForm = ({ location, navigate }) => {
    const courses = useSelector(coursesSelector);
    const dispatch = useCallback(useDispatch(), []);

    const courseOpts = courses.map(course => ({
        value: course.courseCode,
        label: course.title
    }));

    const editedSection = location.state ? location.state.editedSection : null;
    const editMode = !!editedSection;
    const instOpts = [{ value: '99011001', label: 'M Utku Kalay' }];

    const onSubmit = async (values, { resetForm, setStatus }) => {
        const body = {
            sectionCode: `GR-${values.sectionNumber}`,
            courseCode: values.course,
            instructorCode: values.instructor,
            sectionClassrooms: values.sectionClassrooms.map(item => ({
                ...item,
                startTime: format(item.startTime, 'HH:mm'),
                finishTime: format(item.finishTime, 'HH:mm')
            })),
            year: values.year.toString(),
            term: values.term,
            quota: values.quota
        };


        try {
            if (editMode) {
                await dispatch(updateSection(body, editedSection.id));
            } else {
                await dispatch(addSection(body));
            }
            resetForm();
        } catch (error) {
            resetForm();
            if (error.response) {
                setStatus(error.response.data);
            }
        }
    };

    const initialValues = {
        sectionNumber: 1,
        course: '',
        instructor: '',
        year: currYear,
        term: '',
        quota: 0,
        sectionClassrooms: []
    };

    const minQuota = editMode ? editedSection.quota : initialValues.quota;

    return (
        <Formik
            initialValues={editMode ? editedSection : initialValues}
            validationSchema={schema}
            onSubmit={onSubmit}
        >
            {({ isValid, status, isSubmitting, dirty, values: { course } }) => (
                <Form className={classes.form}>
                    <h2>
                        Ders Grubu {editMode ? 'Güncelleme ' : 'Oluşturma '}
                        Ekranı
                    </h2>
                    <ErrorInfo message={status} />
                    <Field
                        name="course"
                        component={Select}
                        options={courseOpts}
                        label="Ders"
                        placeholder="Lütfen ders seçiniz"
                        containerClass={classes.formSelectContainer}
                        selectClass={classes.formSelect}
                        disabled={editMode}
                    />
                    {course && (
                        <>
                            <Field
                                name="sectionNumber"
                                component={FormInput}
                                label="Grup Numarası"
                                type="number"
                                containerClass={classes.input}
                                inputClass={classes.numAlign}
                                min="1"
                            />

                            <Field
                                name="quota"
                                component={FormInput}
                                type="number"
                                label="Kontenjan"
                                min={minQuota}
                                containerClass={classes.input}
                                inputClass={classes.numAlign}
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

                            <div className={classes.timePickerContainer}>
                                <div className={classes.dateContainer}>
                                    <label className={classes.label}>
                                        Ders Grubu başlangıç senesi
                                    </label>

                                    <Field
                                        name="year"
                                        component={FormInput}
                                        type="number"
                                        placeholder="Lütfen grup numarasını giriniz"
                                        containerClass={classes.input}
                                        inputClass={`${classes.numInput} ${classes.numAlign}`}
                                        min={currYear}
                                    />
                                </div>

                                <Field
                                    name="term"
                                    component={Select}
                                    options={termOps}
                                    label="Ders Grubu Dönemi"
                                    placeholder="Dönem Seçiniz"
                                    containerClass={classes.formSelectContainer}
                                    selectClass={classes.termSelect}
                                />
                            </div>

                            <FieldArray
                                name="sectionClassrooms"
                                component={ClassroomPicker}
                            />
                        </>
                    )}
                    <div className={classes.buttonContainer}>
                        <Button
                            type="submit"
                            disabled={!dirty || isSubmitting || !isValid}
                            btnCLass={classes.formButton}
                        >
                            Kaydet
                        </Button>
                        <Button
                            type="button"
                            onClick={() => navigate('/admin/sections')}
                            color="outline-red"
                            btnCLass={classes.formButton}
                        >
                            Geri
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default SectionForm;
