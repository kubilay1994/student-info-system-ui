import React from 'react';
import { Formik, Form } from 'formik';
import { object, number } from 'yup';

import { Button } from '../../UIcomponents';

import classes from './EnrollList.module.css';

const schema = object().shape({
    sectionId: number().required()
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

const EnrollList = ({
    data,
    deleteMode,
    onScheduleClick,
    onEnroll,
    onUnenroll,
    onError
}) => {
    const headerData = deleteMode ? deleteModeHeader : addModeHeader;
    const btnColor = deleteMode ? 'outline-red' : 'turkuaz';

    const onSubmit = async values => {
        try {
            if (deleteMode) {
                await onUnenroll(values.sectionId);
            } else {
                await onEnroll(values.sectionId);
            }
            onError(null);
        } catch (error) {
            if (error.response) {
                onError(error.response.data);
            }
        }
    };

    return (
        <Formik
            initialValues={{ sectionId: '' }}
            validationSchema={schema}
            validateOnMount
            onSubmit={onSubmit}
        >
            {({ isSubmitting, setFieldValue, isValid, status }) => (
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
                                                name="sectionId"
                                                value={d.id}
                                                onChange={() =>
                                                    setFieldValue(
                                                        'sectionId',
                                                        d.id
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
                        color={btnColor}
                    >
                        {deleteMode ? 'Sil' : 'Ekle'}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default EnrollList;
