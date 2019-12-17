import React, { useState, useRef } from 'react';

import { FaPlusSquare, FaTrashAlt, FaEdit } from 'react-icons/fa';

import { Button, Modal } from '../../../UIcomponents';

import { useDispatch } from '../../../store';
import { deleteSection } from '../../../store/actions/section';

import { parse } from 'date-fns';

import classes from '../List.module.css';
import SectionListClasses from './SectionList.module.css';

const SectionList = ({ sections, navigate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const willBeDeletedId = useRef(null);

    const handleEditIconClick = s => {
        const now = Date.now();
        const editedSection = {
            sectionNumber: s.sectionCode.split('-')[1],
            course: s.course.courseCode,
            instructor: s.instructor.instructorCode,
            term: s.term,
            year: s.year,
            quota: s.quota,
            sectionClassrooms: s.sectionClassrooms.map(sc => {
                return {
                    ...sc,
                    startTime: parse(sc.startTime, 'HH:mm', now),
                    finishTime: parse(sc.finishTime, 'HH:mm', now)
                };
            }),
            id: s.id
        };

        navigate(`./edit/${s.id}`, {
            state: { editedSection }
        });
    };


    const handleTrashIconClicked = id => {
        willBeDeletedId.current = id;
        setIsModalOpen(true);
    };

    const handleSectionDelete = () => {
        dispatch(deleteSection(willBeDeletedId.current));
        setIsModalOpen(false);
    };

    return (
        <div className={classes.container}>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className={classes.modalBox}>
                    <h4>
                        Silme işlemini gerçekleştirmek istediğinizden emin
                        misiniz
                    </h4>
                    <div className={classes.modalButtons}>
                        <Button color="turkuaz" onClick={handleSectionDelete}>
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

            <h2 className={classes.title}>
                Bilgisayar Mühendisliği Ders Grup Listesi
            </h2>

            <div className={classes.iconContainer}>
                <label className={classes.iconLabel}>Yeni Grup Ekle</label>
                <FaPlusSquare
                    onClick={() => navigate('./add')}
                    className={classes.icon}
                    size={20}
                />
            </div>
            {sections && sections.length > 0 && (
                <div className={classes.tableContainer}>
                    <table
                        className={`${classes.list} ${SectionListClasses.sectionList}`}
                    >
                        <thead>
                            <tr>
                                <th>Dönem</th>
                                <th>Kod</th>
                                <th>Grup No</th>
                                <th>Dersin Adı</th>
                                <th>Dersin Dili</th>
                                <th>Kapasite</th>
                                <th>Takvim</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {sections.map(s => (
                                <tr key={s.id}>
                                    <td>{`${s.year} ${s.term}`}</td>
                                    <td>{s.course.courseCode}</td>
                                    <td>{s.sectionCode.split('-')[1]}</td>
                                    <td>{s.course.title}</td>
                                    <td>{s.course.language}</td>
                                    <td>{s.quota}</td>
                                    <td>
                                        {s.sectionClassrooms.map(cl => (
                                            <div key={cl.id}>
                                                {`${cl.classroomCode} ${cl.day} ${cl.startTime}- ${cl.finishTime}`}
                                            </div>
                                        ))}
                                    </td>
                                    <td>
                                        <div className={classes.row}>
                                            <FaEdit
                                                className={classes.icon}
                                                size={16}
                                                onClick={() =>
                                                    handleEditIconClick(s)
                                                }
                                            />
                                            <FaTrashAlt
                                                color="crimson"
                                                className={classes.icon}
                                                size={16}
                                                onClick={() =>
                                                    handleTrashIconClicked(s.id)
                                                }
                                            />
                                        </div>
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

export default SectionList;
