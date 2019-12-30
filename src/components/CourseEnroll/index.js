import React, { useState, useRef } from 'react';

import { Button, Modal } from '../../UIcomponents';
import classes from './CourseEnroll.module.css';

import EnrollList from '../EnrollList';
import ErrorInfo from '../ErrorInfo';

import restAPI from '../../axios-instances';
import { term, year } from '../../utils/constants';

const CourseEnroll = ({ sections, enrolledSections, onEnroll, onUnenroll }) => {
    const [filterInput, setFilterInput] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [enrollError, setEnrollError] = useState('');

    const [filteredTermSections, setFilteredTermSections] = useState([]);

    const sectionRef = useRef(null);

    const enrollCourseList =
        filteredTermSections.length > 0 ? filteredTermSections : sections;

    const filterSections = async () => {
        if (filterInput.trim().length === 0) {
            return setFilteredTermSections([]);
        }

        try {
            const res = await restAPI(
                `/api/rest/student/sections/common/${year}/${term}`,
                {
                    params: {
                        query: filterInput
                    }
                }
            );
            console.log(res);
            setFilteredTermSections(res.data);
        } catch (error) {
            console.log(error.response);
        }
    };

    const handleScheduleClick = s => {
        sectionRef.current = s;
        setIsModalOpen(true);
    };

    const handleApiError = err => {
        setEnrollError(err);
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

            <ErrorInfo message={enrollError} />

            {enrollCourseList.length > 0 ? (
                <EnrollList
                    data={enrollCourseList}
                    onScheduleClick={handleScheduleClick}
                    onEnroll={onEnroll}
                    onError={handleApiError}
                />
            ) : (
                <ErrorInfo message="Ders bulunamadı" />
            )}

            {enrolledSections && enrolledSections.length > 0 && (
                <>
                    <h3 className={classes.takenCourseTitle}>Alınan Dersler</h3>
                    <EnrollList
                        data={enrolledSections}
                        deleteMode
                        onUnenroll={onUnenroll}
                        onError={handleApiError}
                    />
                </>
            )}
        </div>
    );
};

export default CourseEnroll;
