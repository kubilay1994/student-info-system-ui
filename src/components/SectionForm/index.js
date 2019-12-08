import React, { useCallback } from 'react';
import { format } from 'date-fns';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Formik, Field, Form, FieldArray } from 'formik';
import * as Yup from 'yup';

import ClassroomPicker from '../ClassroomPicker';
import ErrorInfo from '../ErrorInfo';

import { Button, Select, FormInput } from '../../UIcomponents';
import classes from './SectionForm.module.css';
import { useSelector, useDispatch } from '../../store';
import { addSection } from '../../store/actions/section';

const schema = Yup.object().shape({
    sectionNumber: Yup.number().required('Grup kodu zorunludur'),
    course: Yup.string().required('Lütfen ders seçiniz'),
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

const SectionForm = ({ location, navigate }) => {
    const courses = useSelector(coursesSelector);
    const dispatch = useCallback(useDispatch(), []);

    const courseOpts = courses.map(course => ({
        value: course.courseCode,
        label: course.title
    }));

    const { editedSection } = location.state;
    const editMode = !!editedSection;

    const instOpts = [{ value: '99011001', label: 'M Utku Kalay' }];

    const onSubmit = async (values, { resetForm, setStatus }) => {
        const body = {
            sectionCode: `GR-${values.sectionNumber}`,
            courseCode: values.course,
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
            await dispatch(addSection(body));
            resetForm();
        } catch (error) {
            resetForm();
            if (error.response) {
                setStatus(error.response.data);
            }
        }
    };

    return (
        <Formik
            initialValues={{
                sectionNumber: '',
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
                status,
                isSubmitting,
                dirty,
                setFieldValue,
                values: { course, startDate, finishDate }
            }) => (
                <Form className={classes.form}>
                    <h2>Ders Grubu Oluşturma Ekranı</h2>
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
                                placeholder="Lütfen grup numarasını giriniz"
                                containerClass={classes.input}
                                inputClass={classes.numInput}
                                min="0"
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
