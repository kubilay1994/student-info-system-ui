import React, { useState, useRef } from 'react';

import { Button, Modal } from '../../UIcomponents';
import classes from './CourseEnroll.module.css';

import EnrollList from '../EnrollList';
import ErrorInfo from '../ErrorInfo';

const CourseEnroll = ({ sections, enrolledSections, onEnroll, onUnenroll }) => {
    const [filterInput, setFilterInput] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [enrollError, setEnrollError] = useState('');

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

            <EnrollList
                data={sections}
                onScheduleClick={handleScheduleClick}
                onEnroll={onEnroll}
                onError={handleApiError}
            />

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
