import React, { useEffect, useState, useRef, useCallback } from 'react';

import { Formik, Form, Field } from 'formik';
import FormInput from '../../UIcomponents/FormInput';
import Button from '../../UIcomponents/Button';
import Modal from '../../UIcomponents/Modal';

import * as Yup from 'yup';

import classes from './Department.module.css';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

import { useDispatch, useSelector } from '../../store';

import {
    addDepartment,
    deleteDep,
    fetchDeps,
    updateDep
} from '../../store/actions/department';

const schema = Yup.object().shape({
    title: Yup.string().required('Departman ismi zorunludur'),
    departmentCode: Yup.string().required('Departman kodu girilmesi zorunludur')
});

const depSelector = state => state.department.deps;

const DepartmentPage = () => {
    const [selectedDep, setSelectedDep] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const markedDepId = useRef(null);

    const deps = useSelector(depSelector);
    const dispatch = useCallback(useDispatch(), []);

    const handleDepartmentCreate = (title, departmentCode) => {
        return dispatch(addDepartment(title, departmentCode));
    };

    const handleDepartmentUpdate = dep => {
        setSelectedDep(null);
        return dispatch(updateDep(dep));
    };

    const onSubmit = async ({ departmentCode, title }, { resetForm }) => {
        try {
            if (selectedDep) {
                await handleDepartmentUpdate({
                    id: selectedDep.id,
                    title,
                    departmentCode
                });
            } else {
                await handleDepartmentCreate(title, departmentCode);
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            resetForm();
        }
    };

    const handleDepartmentDelete = async () => {
        setIsModalOpen(false);
        dispatch(deleteDep(markedDepId.current));
    };

    useEffect(() => {
        dispatch(fetchDeps());
    }, [dispatch]);

    return (
        <div className={classes.container}>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className={classes.modalBox}>
                    <h4>
                        Silme işlemini gerçekleştirmek istediğinizden emin
                        misiniz
                    </h4>
                    <div className={classes.modalButtons}>
                        <Button
                            color="turkuaz"
                            onClick={() => handleDepartmentDelete(markedDepId)}
                        >
                            Evet
                        </Button>
                        <Button
                            color="red"
                            onClick={() => {
                                setIsModalOpen(false);
                            }}
                        >
                            Hayır
                        </Button>
                    </div>
                </div>
            </Modal>

            {deps && deps.length > 0 && (
                <ul className={classes.departmentList}>
                    <FaPlus
                        size={20}
                        className={`${classes.icon} ${classes.add}`}
                        onClick={() => setSelectedDep(null)}
                    />
                    {deps.map(dep => (
                        <li key={dep.id}>
                            {dep.title}
                            <div className={classes.icons}>
                                <FaEdit
                                    size={20}
                                    className={classes.icon}
                                    onClick={() => setSelectedDep(dep)}
                                />
                                <FaTrash
                                    color="crimson"
                                    size={20}
                                    className={classes.icon}
                                    onClick={() => {
                                        setIsModalOpen(true);
                                        markedDepId.current = dep.id;
                                    }}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <Formik
                initialValues={{
                    title: selectedDep ? selectedDep.title : '',
                    departmentCode: selectedDep
                        ? selectedDep.departmentCode
                        : ''
                }}
                enableReinitialize
                validationSchema={schema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className={classes.form}>
                        <header className={classes.header}>
                            {selectedDep
                                ? `${selectedDep.title} departmanının bilgilerini güncelle`
                                : 'Departman Oluştur'}
                        </header>
                        <Field
                            name="title"
                            type="text"
                            component={FormInput}
                            label="İsim"
                        />
                        <Field
                            name="departmentCode"
                            type="text"
                            component={FormInput}
                            label="Kod"
                        />
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            btnCLass={classes.button}
                        >
                            {selectedDep ? 'Güncelle' : 'Kaydet'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default DepartmentPage;
