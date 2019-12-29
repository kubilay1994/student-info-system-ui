import React, { useMemo } from 'react';

import classes from './CourseSchedule.module.css';

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
    '20:00',
    '21:00',
    '22:00',
    '23:00'
];

const dayToNumber = day => {
    switch (day) {
        case 'Pazartesi':
            return 0;
        case 'Salı':
            return 1;
        case 'Çarşamba':
            return 2;
        case 'Perşembe':
            return 3;
        case 'Cuma':
            return 4;
        case 'Cumartesi':
            return 5;
        case 'Pazar':
            return 6;
        default:
            return 0;
    }
};

const renderSectionInfoBox = (section, index) =>
    section ? (
        <td key={index} className={section.type === 'Lab' ? classes.lab : null}>
            <div>{section.course.title}</div>
            <div>{`${section.course.courseCode} ${section.sectionCode}`}</div>
            <div>Bilgisayar Mühendisliği</div>
        </td>
    ) : (
        <td key={index}></td>
    );

const CourseSchedule = ({ sections }) => {
    const schedule = useMemo(() => {
        const schedule = new Array(16)
            .fill(null)
            .map(() => new Array(7).fill(null));
        const gap = 8;

        for (const section of sections) {
            for (const {
                startTime,
                finishTime,
                day,
                type
            } of section.sectionClassrooms) {
                const col = dayToNumber(day);
                const start = Number.parseInt(startTime) - gap;
                const end = Number.parseInt(finishTime) - gap;
                for (let i = start; i <= end; i++) {
                    schedule[i][col] = { ...section };
                    schedule[i][col].type = type;
                }
            }
        }
        return schedule;
    }, [sections]);

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
                    {schedule.map((row, index) => (
                        <tr key={Math.random()}>
                            <td>{hours[index]}</td>
                            {row.map((section, index) =>
                                renderSectionInfoBox(section, index)
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className={classes.info}>
                Kırmızı ile yazılan ders saatleri o derslerin lablarını
                göstermektedir.
            </p>
        </div>
    );
};

export default CourseSchedule;
