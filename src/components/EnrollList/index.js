import React from 'react';
import { Formik, Form } from 'formik';
import { object } from 'yup';

import { Button } from '../../UIcomponents';

import classes from './EnrollList.module.css';

const schema = object().shape({
    enrolledSection: object().required()
});

const unenrollSchema = object().shape({
    unenrolledSection: object().required()
});

const addModeHeader = [
    'Ders Kodu',
    'Ders Adı',
    'Grup No',
    'Kredi',
    'Dersin Dili',
    'Takvim'
];

const deleteModeHeader = [
    'Ders Kodu',
    'Ders Adı',
    'Grup No',
    'Kredi',
    'Dersin Dili'
];

const EnrollList = ({ data, deleteMode, onScheduleClick }) => {
    const formSchema = deleteMode ? unenrollSchema : schema;
    const initialValues = deleteMode
        ? { enrolledSection: '' }
        : { unenrolledSection: '' };

    const headerData = deleteMode ? deleteModeHeader : addModeHeader;

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={formSchema}
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
                                    {headerData.map(d => (
                                        <th key={d}>{d}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(d => (
                                    <tr key={d.id}>
                                        <td>
                                            <input
                                                type="radio"
                                                name="enrolledSection"
                                                value={d.id}
                                                onChange={() =>
                                                    setFieldValue(
                                                        'enrolledSection',
                                                        d
                                                    )
                                                }
                                            />
                                        </td>
                                        <td>{d.course.courseCode}</td>
                                        <td>{d.course.title}</td>
                                        <td>{d.sectionCode.split('-')[1]}</td>
                                        <td>{d.course.credit}</td>
                                        <td>{d.course.language}</td>
                                        {!deleteMode && (
                                            <td>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onScheduleClick(d)
                                                    }
                                                    className={classes.btnLink}
                                                >
                                                    Takvim
                                                </button>
                                            </td>
                                        )}
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
    );
};

export default EnrollList;
