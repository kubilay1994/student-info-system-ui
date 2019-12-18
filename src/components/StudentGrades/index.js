import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { Select, Button } from '../../UIcomponents';
import { term, year } from '../../utils/constants';

import restAPI from '../../axios-instances';

import ErrorInfo from '../ErrorInfo';
import classes from './StudentGrades.module.css';

const initiliazeSelectOp = () => {
    const opts = [];

    opts.push({ label: `${year} ${term}`, value: `${year} ${term}` });
    if (term === 'Bahar') {
        opts.push({ label: `${year} Güz`, value: `${year} Güz` });
    }

    for (let i = 1; i < 8; i++) {
        opts.push({ label: `${year - i} Bahar`, value: `${year - i} Bahar` });
        opts.push({ label: `${year - i} Güz`, value: `${year - i} Güz` });
    }

    return opts;
};

const selectOps = initiliazeSelectOp();
const StudentGrades = () => {
    const [sections, setSections] = useState([]);

    return (
        <div className={classes.container}>
            <h2>Öğrenci Sınav Not Görüntüleme</h2>
            <Formik
                initialValues={{
                    termAndYear: `${year} ${term}`
                }}
                onSubmit={async ({ termAndYear }, { setStatus, resetForm }) => {
                    const [year, term] = termAndYear.split(' ');
                    try {
                        const res = await restAPI.get(
                            `/api/rest/student/studentsections/${year}/${term}`
                        );
                        // console.log(res);
                        if (res.data.length === 0) {
                            setStatus(
                                `Öğrencinin ${year} ${term} döneminde aldığı ders bulunmamaktadır`
                            );
                        } else {
                            resetForm();
                        }
                        setSections(res.data);
                    } catch (error) {
                        console.log(error.response);
                    }
                }}
            >
                {({ isSubmitting, status }) => (
                    <Form className={classes.form}>
                        <Field
                            name="termAndYear"
                            component={Select}
                            label="Dönem"
                            options={selectOps}
                            selectClass={classes.select}
                            containerClass={classes.selectContainer}
                        />
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            btnCLass={classes.btn}
                        >
                            Göster
                        </Button>
                        <ErrorInfo message={status} />
                    </Form>
                )}
            </Formik>

            {sections.length > 0 && (
                <div className={classes.listContainer}>
                    <table className={classes.gradeList}>
                        <thead>
                            <tr>
                                <th>Ders Kodu</th>
                                <th>Ders Adı</th>
                                <th>Gr No</th>
                                <th>Yürütücü</th>
                                <th>Vize 1</th>
                                <th>Vize 2</th>
                                <th>Final</th>
                                <th>Proje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sections.map(({ section: s, grades }) => (
                                <tr key={s.id}>
                                    <td>{s.course.courseCode}</td>
                                    <td>{s.course.title}</td>
                                    <td>{s.sectionCode.split('-')[1]}</td>
                                    <td>{`${s.instructor.firstName} ${s.instructor.lastName}`}</td>
                                    <td>
                                        {grades['Vize 1'] &&
                                            grades['Vize 1'].grade}
                                    </td>
                                    <td>
                                        {grades['Vize 2'] &&
                                            grades['Vize 2'].grade}
                                    </td>
                                    <td>
                                        {grades['Final'] &&
                                            grades['Final'].grade}
                                    </td>
                                    <td>
                                        {grades['Proje'] &&
                                            grades['Proje'].grade}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default StudentGrades;
