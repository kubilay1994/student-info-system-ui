import React from 'react';

import InfoBox from '../InfoBox';

import classes from './StdEnrollList.module.css';

const StdEnrollList = ({ studentSections }) => {
    return (
        <div className={classes.container}>
            <InfoBox mode="extend" />

            {studentSections && studentSections.length > 0 && (
                <div className={classes.listContainer}>
                    <table className={classes.stdEnrollList}>
                        <thead>
                            <tr>
                                <th>Dönem</th>
                                <th>Ders Kodu</th>
                                <th>Ders Adı</th>
                                <th>Gr No.</th>
                                <th>Kredi</th>
                                <th>Not</th>
                                <th>Dersin Dili</th>
                                <th>Yürütücü</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentSections.map(studentSection => (
                                <tr key={Math.random()}>
                                    <td>{`${studentSection.year} ${studentSection.term}`}</td>
                                    <td>
                                        {
                                            studentSection.course
                                                .courseCode
                                        }
                                    </td>
                                    <td>
                                        {studentSection.course.title}
                                    </td>
                                    <td>
                                        {
                                            studentSection.sectionCode.split(
                                                '-'
                                            )[1]
                                        }
                                    </td>
                                    <td>
                                        {studentSection.course.credit}
                                    </td>
                                    <td>{studentSection.grade}</td>
                                    <td>
                                        {studentSection.course.language}
                                    </td>
                                    <td>{`${studentSection.instructor.firstName} ${studentSection.instructor.lastName}`}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default StdEnrollList;
