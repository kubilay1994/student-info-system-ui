import React from 'react';

import classes from './CourseTable.module.css';

const hours = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00'
];

const CourseTable = () => {
    return (
        <div className={classes.container}>
            <h3 className={classes.title}>Ders Programı</h3>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Pazartesi</th>
                        <th>Salı</th>
                        <th>Çarşamba</th>
                        <th>Perşembe</th>
                        <th>Cuma</th>
                        <th>Cumartesi</th>
                        <th>Pazar</th>
                    </tr>
                </thead>
                <tbody>
                    {hours.map(hour => (
                        <tr key={Math.random()}>
                            <td>{hour}</td>
                            <td>Empty</td>
                            <td>for</td>
                            <td>now</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseTable;
