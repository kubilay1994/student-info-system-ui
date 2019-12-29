import React, { useState, useRef } from 'react';

import { FaPlusSquare, FaTrashAlt, FaEdit } from 'react-icons/fa';

import { Button, Modal } from '../../../UIcomponents';

import { useDispatch } from '../../../store';
import { deleteCourse } from '../../../store/actions/course';

import classes from '../List.module.css';
import CListClasses from './CourseList.module.css';

const CourseList = ({ courses, navigate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const willBeDeletedId = useRef(null);

    const handleEditIconClick = c => {
        const { department, ...course } = c;
        course.departmentCode = 'BLM';
        course.prerequisites = course.prerequisites.map(p => p.courseCode);
        navigate('./edit/' + c.id, {
            state: {
                editedCourse: course
            }
        });
    };

    const handleTrashIconClicked = id => {
        willBeDeletedId.current = id;
        setIsModalOpen(true);
    };

    const handleCourseDelete = () => {
        dispatch(deleteCourse(willBeDeletedId.current));
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
                        <Button color="turkuaz" onClick={handleCourseDelete}>
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
                Bilgisayar Mühendisliği Ders Listesi
            </h2>

            <div className={classes.iconContainer}>
                <label className={classes.iconLabel}>Yeni Ders Ekle</label>
                <FaPlusSquare
                    onClick={() => navigate('./add')}
                    className={classes.icon}
                    size={20}
                />
            </div>
            {courses && courses.length > 0 && (
                <div className={classes.tableContainer}>
                    <table
                        className={`${classes.list} ${CListClasses.courseList}`}
                    >
                        <thead>
                            <tr>
                                <th>Kod</th>
                                <th>Ad</th>
                                <th>Kredi</th>
                                <th>Dil</th>
                                <th>Önkoşul</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map(c => (
                                <tr key={c.id}>
                                    <td>{c.courseCode}</td>
                                    <td>{c.title}</td>
                                    <td>{c.credit}</td>
                                    <td>{c.language}</td>
                                    <td>
                                        {c.prerequisites.map(p => (
                                            <div key={p.courseCode}>
                                                {p.courseCode}
                                            </div>
                                        ))}
                                    </td>
                                    <td>
                                        <div className={CListClasses.icons}>
                                            <FaEdit
                                                className={classes.icon}
                                                onClick={() =>
                                                    handleEditIconClick(c)
                                                }
                                            />
                                            <FaTrashAlt
                                                color="crimson"
                                                className={classes.icon}
                                                onClick={() =>
                                                    handleTrashIconClicked(c.id)
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

export default CourseList;
