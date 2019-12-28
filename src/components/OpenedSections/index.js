import React, { useEffect, useState } from 'react';
import InfoBox from '../InfoBox';

import classes from './OpenedSections.module.css';

import restAPI from '../../axios-instances';

import { useSelector } from '../../store';
import { term, year } from '../../utils/constants';

const instructorCommonSectionPath = '/api/rest/instructor/sections/common';
const studentCommonSectionPath = '/api/rest/student/sections/common';
const adminCommonSectionPath = '/api/rest/admin/sections/common';

const roleSelector = state => state.user.role;

const OpenedSections = () => {
    // geçici fetch böyle yapılmaması daha iyi
    const [termSections, setTermSections] = useState([]);

    const role = useSelector(roleSelector);

    useEffect(() => {
        const fetchSectionByYearAndTerm = async () => {
            let url;
            if (role === 'Admin') {
                url = adminCommonSectionPath;
            } else if (role === 'Student') {
                url = studentCommonSectionPath;
            } else if (role === 'Instructor') {
                url = instructorCommonSectionPath;
            } else {
                return;
            }

            try {
                const res = await restAPI.get(`${url}/${year}/${term}`);
                setTermSections(res.data);
            } catch (error) {
                // console.log(error.message);
                // console.log(error.response);
                // console.log(error.request);
            }
        };

        fetchSectionByYearAndTerm();
    }, [role]);
    return (
        <div className={classes.container}>
            <h2
                className={classes.title}
            >{`${year} ${term} Dönemi Bölüme Açılan Ders Listesi`}</h2>
            <InfoBox />

            {termSections.length > 0 ? (
                <div className={classes.tableContainer}>
                    <table className={classes.offeredCourses}>
                        <thead>
                            <tr>
                                <th>Ders Kodu</th>
                                <th>Grup No</th>
                                <th>Dersin Adı</th>
                                <th>Dersin Dili</th>
                                <th>Kapasite</th>
                                <th>Takvim</th>
                            </tr>
                        </thead>
                        <tbody>
                            {termSections.map(ts => (
                                <tr key={ts.id}>
                                    <td>{ts.course.courseCode}</td>
                                    <td>{ts.sectionCode.split('-')[1]}</td>
                                    <td>{ts.course.title} </td>
                                    <td>{ts.course.language}</td>
                                    <td> {`${ts.studentCount}/${ts.quota}`}</td>
                                    <td>
                                        {ts.sectionClassrooms.map(cl => (
                                            <div key={cl.id}>
                                                {`${cl.classroomCode} ${cl.day} ${cl.startTime}- ${cl.finishTime}`}
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div style={{marginTop : '3rem'}}> Loading ... </div>
            )}
        </div>
    );
};

export default OpenedSections;
