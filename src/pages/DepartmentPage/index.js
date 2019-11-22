import React, { useEffect, useState } from 'react';

import { Formik, Form, Field } from 'formik';
import FormInput from '../../UIcomponents/FormInput';
import Button from '../../UIcomponents/Button';
import Modal from '../../UIcomponents/Modal';

import * as Yup from 'yup';

import restAPI from '../../axios-instances';
import classes from './Department.module.css';
import DepartmentList from './DepartmentList';

const schema = Yup.object().shape({
    title: Yup.string().required('Departman ismi zorunludur'),
    departmentCode: Yup.string().required('Departman kodu girilmesi zorunludur')
});

const DepartmentPage = () => {
    const [departments, setDepartments] = useState(null);
    const [selectedDep, setSelectedDep] = useState(null);
    const [deletedDepId, setDeletedDepId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDepartmentCreate = (title, departmentCode) => {
        return restAPI
            .post('/api/rest/admin/departments', {
                title,
                departmentCode
            })
            .then(res =>
                setDepartments(departments => [...departments, res.data])
            );
    };

    const handleDepartmentUpdate = async (id, title, departmentCode) => {
        await restAPI.put(`/api/rest/admin/departments/${id}`, {
            title,
            departmentCode
        });
        setDepartments(deps =>
            deps.map(dep =>
                dep.id === id ? { ...dep, title, departmentCode } : dep
            )
        );
        setSelectedDep(null);
    };

    const onSubmit = async (
        { departmentCode, title },
        { setSubmitting, resetForm }
    ) => {
        setSubmitting(true);
        try {
            if (selectedDep) {
                await handleDepartmentUpdate(
                    selectedDep.id,
                    title,
                    departmentCode
                );
            } else {
                await handleDepartmentCreate(title, departmentCode);
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setSubmitting(false);
            resetForm();
        }
    };

    const handleDepartmentDelete = async id => {
        try {
            setIsModalOpen(false);
            await restAPI.delete(`/api/rest/admin/departments/${id}`);
            setDepartments(deps => deps.filter(dep => dep.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await restAPI.get('/api/rest/admin/departments');
                setDepartments(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchDepartments();
    }, []);

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
                            onClick={() => handleDepartmentDelete(deletedDepId)}
                        >
                            Evet
                        </Button>
                        <Button
                            color="red"
                            onClick={id => {
                                setIsModalOpen(false);
                            }}
                        >
                            Hayır
                        </Button>
                    </div>
                </div>
            </Modal>
            {departments ? (
                <DepartmentList
                    departments={departments}
                    onDepDelete={id => {
                        setDeletedDepId(id);
                        setIsModalOpen(true);
                    }}
                    onDepSelect={setSelectedDep}
                    onDepUnselect={() => setSelectedDep(null)}
                />
            ) : (
                <div>Loading ... </div>
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
