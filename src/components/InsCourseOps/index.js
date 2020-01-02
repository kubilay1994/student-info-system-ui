import React, { useState, useEffect } from 'react';
import classes from './InsCourseOps.module.css';
import restAPI from '../../axios-instances';
import ErrorInfo from '../ErrorInfo';

import { Formik, Field, Form } from 'formik';
import { Select, Button, FormInput } from '../../UIcomponents';

const gradeOps = [
    { label: 'Vize 1', value: 'Vize 1' },
    { label: 'Vize 2', value: 'Vize 2' },
    { label: 'Proje', value: 'Proje' },
    { label: 'Final', value: 'Final' }
];

const InsCourseOps = ({ location, navigate }) => {
    const [studentList, setStudentList] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        const fetchStudentListForGivenCourse = async id => {
            const baseUrl = '/api/rest/instructor/students';
            try {
                const res = await restAPI.get(`${baseUrl}/${id}`);
                setStudentList(res.data);
            } catch (error) {
                // console.log(error.response);
            }
        };
        if (location.state && location.state.section) {
            fetchStudentListForGivenCourse(location.state.section.id);
        }
    }, [location.state]);

    const handleGradeSubmit = async (values, { resetForm, setStatus }) => {
        const body = {
            [values.type]: values.grade
        };

        const studentSection = selectedStudent.studentSections.find(
            st => st.section.id === location.state.section.id
        );

        try {
            await restAPI.post(
                `/api/rest/instructor/grades/${studentSection.id}`,
                body
            );
            setSelectedStudent(null);
        } catch (error) {
            if (error.response) {
                setStatus('Bir Hata oluştu');
            }
            // console.log(error.response);
        }
    };

    return location.state ? (
        <div className={classes.container}>
            <h2>{`${location.state.section.course.title} Dersi Öğrenci Listesi ve Not İşlemleri Sayfası`}</h2>

            {studentList.length > 0 ? (
                <div className={classes.studentListContainer}>
                    <table className={classes.studentList}>
                        <thead>
                            <tr>
                                <th>Öğrenci No</th>
                                <th>Ad</th>
                                <th>Soyad</th>
                                <th>E-mail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentList.map(s => (
                                <tr
                                    key={s.id}
                                    onClick={() => setSelectedStudent(s)}
                                >
                                    <td>{s.studentCode}</td>
                                    <td>{s.firstName}</td>
                                    <td>{s.lastName}</td>
                                    <td>{s.mail}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {!selectedStudent && (
                        <Button
                            color="outline-red"
                            onClick={() => navigate('../../courseList')}
                            btnCLass={classes.btn}
                        >
                            Geri
                        </Button>
                    )}

                    {selectedStudent && (
                        <Formik
                            initialValues={{
                                type: 'Vize 1',
                                grade: 0
                            }}
                            onSubmit={handleGradeSubmit}
                        >
                            {({ isSubmitting, status }) => (
                                <Form>
                                    <ErrorInfo message={status} />
                                    <h3>{`${selectedStudent.studentCode} Numaralı Öğrenci için Not Girişi`}</h3>
                                    <div className={classes.inputContainer}>
                                        <Field
                                            name="type"
                                            component={Select}
                                            options={gradeOps}
                                            label="Not Tipi"
                                            containerClass={
                                                classes.selectContainer
                                            }
                                        />
                                        <Field
                                            name="grade"
                                            label="Not"
                                            component={FormInput}
                                            type="number"
                                            min="0"
                                            max="100"
                                            inputClass={classes.input}
                                        />
                                    </div>

                                    <div className={classes.btnContainer}>
                                        <Button
                                            type="submit"
                                            color="outline-blue"
                                            disabled={isSubmitting}
                                            btnCLass={classes.btn}
                                        >
                                            Kaydet
                                        </Button>

                                        <Button
                                            color="outline-red"
                                            type="button"
                                            onClick={() =>
                                                navigate('../../courseList')
                                            }
                                            btnCLass={classes.btn}
                                        >
                                            Geri
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    )}
                </div>
            ) : (
                <ErrorInfo message="Seçilen Derste Öğrenci Bulunmamaktadır" />
            )}
        </div>
    ) : null;
};

export default InsCourseOps;
