import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form } from 'formik';

import { Button, Modal } from '../../UIcomponents';
import classes from './CourseEnroll.module.css';

import * as Yup from 'yup';

const schema = Yup.object().shape({
    enrolledSection: Yup.object().required()
});

const unenrollSchema = Yup.object().shape({
    unenrolledSection: Yup.object().required()
});

const CourseEnroll = ({ sections }) => {
    const [filterInput, setFilterInput] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const sectionRef = useRef(null);

    const filterSections = () => {
        // const filteredSections = sections.filter(
        //     s => s.course.courseCode === filterInput
        // );
        // console.log(sections, filteredSections);
        // console.log('hello');
        //Later with server
    };

    const handleScheduleClick = s => {
        sectionRef.current = s;
        setIsModalOpen(true);
    };

    return (
        <div className={classes.container}>
            <div className={classes.filterContainer}>
                <h3 className={classes.enrollTitle}>Alınabilecek Dersler</h3>
                <div className={classes.filter}>
                    <label>Ders Kodu/ Adı</label>

                    <input
                        type="text"
                        className={classes.input}
                        value={filterInput}
                        onChange={e => setFilterInput(e.target.value)}
                    />
                    <Button color="outline-blue" onClick={filterSections}>
                        Filtrele
                    </Button>
                </div>
            </div>

            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className={classes.modalBox}>
                    <h2>Ders Takvim Bilgisi</h2>
                    {sectionRef.current &&
                        sectionRef.current.sectionClassrooms.map(sc => (
                            <div key={sc.id}>
                                {`Sınıf: ${sc.classroomCode} ${sc.day} ${sc.startTime} - ${sc.finishTime}`}
                            </div>
                        ))}
                </div>
            </Modal>

            <Formik
                initialValues={{ enrolledSection: '' }}
                validationSchema={schema}
                validateOnMount={true}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);

                    console.log(values, 'hello');
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting, setFieldValue, isValid }) => (
                    <Form className={classes.form}>
                        <div className={classes.listContainer}>
                            <table className={classes.enrollList}>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Ders Kodu</th>
                                        <th>Ders Adı</th>
                                        <th>Grup No</th>
                                        <th>Kredi</th>
                                        <th>Dersin Dili</th>
                                        <th>Takvim</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sections.map(s => (
                                        <tr key={s.id}>
                                            <td>
                                                <input
                                                    type="radio"
                                                    name="enrolledSection"
                                                    value={s.id}
                                                    onChange={() =>
                                                        setFieldValue(
                                                            'enrolledSection',
                                                            s
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td>{s.course.courseCode}</td>
                                            <td>{s.course.title}</td>
                                            <td>
                                                {s.sectionCode.split('-')[1]}
                                            </td>
                                            <td>{s.course.credit}</td>
                                            <td>{s.course.language}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleScheduleClick(s)
                                                    }
                                                    className={classes.btnLink}
                                                >
                                                    Takvim
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Button
                            type="submit"
                            disabled={isSubmitting || !isValid}
                            btnCLass={classes.enrollBtn}
                            color="turkuaz"
                        >
                            Ekle
                        </Button>
                    </Form>
                )}
            </Formik>

            <h3 className={classes.takenCourseTitle}>Alınan Dersler</h3>
            {
                <Formik
                    initialValues={{ unenrolledSection: '' }}
                    validationSchema={unenrollSchema}
                    validateOnMount={true}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true);

                        console.log(values, 'hello');
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting, setFieldValue, isValid }) => (
                        <Form className={classes.form}>
                            <div className={classes.listContainer}>
                                <table className={classes.enrollList}>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Ders Kodu</th>
                                            <th>Ders Adı</th>
                                            <th>Grup No</th>
                                            <th>Kredi</th>
                                            <th>Dersin Dili</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sections.map(s => (
                                            <tr key={s.id}>
                                                <td>
                                                    <input
                                                        type="radio"
                                                        name="unenrolledSection"
                                                        value={s.id}
                                                        onChange={() =>
                                                            setFieldValue(
                                                                'unenrolledSection',
                                                                s
                                                            )
                                                        }
                                                    />
                                                </td>
                                                <td>{s.course.courseCode}</td>
                                                <td>{s.course.title}</td>
                                                <td>
                                                    {
                                                        s.sectionCode.split(
                                                            '-'
                                                        )[1]
                                                    }
                                                </td>
                                                <td>{s.course.credit}</td>
                                                <td>{s.course.language}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Button
                                type="submit"
                                disabled={isSubmitting || !isValid}
                                btnCLass={classes.enrollBtn}
                                color="turkuaz"
                            >
                                Sil
                            </Button>
                        </Form>
                    )}
                </Formik>
            }
        </div>
    );
};

export default CourseEnroll;
