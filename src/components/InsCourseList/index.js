import React from 'react';

import ErrorInfo from '../ErrorInfo';
import classes from './InsCourseList.module.css';
import { term, year } from '../../utils/constants';

const InsCourseList = ({ sections, navigate }) => {
    const handleRowClick = s => {
        navigate(`../course/${s.id}`, { state: { section: s } });
    };
    return (
        <div className={classes.container}>
            <h2>{`${year} ${term} Döneminde Vermiş Olduğunuz Ders Listesi`}</h2>

            {sections.length > 0 ? (
                <div className={classes.tableContainer}>
                    <div className={classes.info}>
                        Öğrenci Not Girişi ve Benzeri İşlemler İçin Seçmiş
                        Olduğunuz Dersin Üstüne Tıklayınız
                    </div>

                    <table className={classes.givenCourses}>
                        <thead>
                            <tr>
                                <th>Ders Kodu</th>
                                <th>Grup No</th>
                                <th>Dersin Adı</th>
                                <th>Dersin Dili</th>
                                <th>Öğrenci Sayısı</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sections.map(s => (
                                <tr
                                    key={s.id}
                                    onClick={() => handleRowClick(s)}
                                >
                                    <td>{s.course.courseCode}</td>
                                    <td>{s.sectionCode.split('-')[1]}</td>
                                    <td>{s.course.title} </td>
                                    <td>{s.course.language}</td>
                                    <td> {s.studentCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <ErrorInfo message="Vermiş olduğunuz bir ders bulunmamaktadır" />
            )}
        </div>
    );
};

export default InsCourseList;
