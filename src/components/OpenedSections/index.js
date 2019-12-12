import React from 'react';
import InfoBox from '../InfoBox';

import classes from './OpenedSections.module.css';

import { term, year } from '../../utils/constants';
const OpenedSections = ({ termSections }) => {
    return (
        <div className={classes.container}>
            <h2
                className={classes.title}
            >{`${year} ${term} Dönemi Bölüme Açılan Ders Listesi`}</h2>
            <InfoBox />

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
        </div>
    );
};

export default OpenedSections;
