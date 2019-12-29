import React from 'react';

import InfoBox from '../InfoBox';

import classes from './StdEnrollList.module.css';

const StdEnrollList = ({ studentSections }) => {
    return (
        <div className={classes.container}>
            <InfoBox  />

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
                            {studentSections.map(section => (
                                <tr key={section.id}>
                                    <td>{`${section.year} ${section.term}`}</td>
                                    <td>{section.course.courseCode}</td>
                                    <td>{section.course.title}</td>
                                    <td>{section.sectionCode.split('-')[1]}</td>
                                    <td>{section.course.credit}</td>
                                    <td>{}</td>
                                    <td>{section.course.language}</td>
                                    <td>{`${section.instructor.firstName} ${section.instructor.lastName}`}</td>
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
