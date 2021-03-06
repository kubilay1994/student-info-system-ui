import React from 'react';

import { useSelector } from '../../store';

import classes from './InfoBox.module.css';
const userSelector = state => state.user.user;
const roleSelector = state => state.user.role;

const InfoBox = ({ mode }) => {
    const user = useSelector(userSelector);
    const role = useSelector(roleSelector);
    let schema = [
        { label: ' Ad Soyad : ', data: ` ${user.firstName} ${user.lastName}` },
        { label: 'Numara : ', data: user.studentCode },
        {
            label: ' Fakülte/Yüksekokul : ',
            data: ' Elektrik-Elektronik Fakültesi'
        },
        { label: ' Bölüm/Program : ', data: ' Bilgisayar Mühendisliği' }
    ];

    if (mode === 'extend') {
        schema.push({ label: 'Alınan / Toplam Kredi : ', data: '0/0' });
        schema.push({ label: 'AGNO : ', data: '0' });
    }

    if (role === 'Student') {
    } else if (role === 'Instructor') {
        schema[1] = { label: 'Numara : ', data: user.instructorCode };
    } else {
        schema = [];
    }

    return (
        <div className={classes.container}>
            {/* {schema.map(item => (
                <div key={item.label} className={classes.item}>
                    <em className={classes.label}>{item.label}</em>
                    <small className={classes.data}>{item.data}</small>
                </div>
            ))} */}

            {role === 'Admin' && <h2>Admin</h2>}

            <div className={classes.item}>
                {schema.map(({ label }) => (
                    <em key={label} className={classes.label}>
                        {label}
                    </em>
                ))}
            </div>
            <div className={classes.item}>
                {schema.map(({ data }) => (
                    <small key={data} className={classes.data}>
                        {data}
                    </small>
                ))}
            </div>
        </div>
    );
};

export default InfoBox;
