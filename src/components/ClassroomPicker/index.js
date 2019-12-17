import React, { useEffect, useCallback } from 'react';
import classes from './Classroom.module.css';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { Select } from '../../UIcomponents';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Field } from 'formik';

import { setMinutes, setHours } from 'date-fns';

import { fetchDepClassrooms } from '../../store/actions/classroom';

import { useDispatch, useSelector } from '../../store';

const dayOptions = [
    'Pazartesi',
    'Salı',
    'Çarşamba',
    'Perşembe',
    'Cuma',
    'Cumartersi',
    'Pazar'
].map(day => ({ value: day, label: day }));

const classTypeOpts = ['Ders', 'Lab'].map(opt => ({ value: opt, label: opt }));

const excludedTimes = [
    setHours(setMinutes(new Date(), 0), 0),
    setHours(setMinutes(new Date(), 0), 1),
    setHours(setMinutes(new Date(), 0), 2),
    setHours(setMinutes(new Date(), 0), 3),
    setHours(setMinutes(new Date(), 0), 4),
    setHours(setMinutes(new Date(), 0), 5),
    setHours(setMinutes(new Date(), 0), 6),
    setHours(setMinutes(new Date(), 0), 7),
];

const classroomSelector = state => state.classroom.classrooms;

const ClassroomPicker = ({ form, push, remove }) => {
    const { setFieldValue } = form;
    const { sectionClassrooms } = form.values;

    const dispatch = useCallback(useDispatch(), []);
    const classrooms = useSelector(classroomSelector);

    const classroommOpts = classrooms.map(c => ({
        value: c.classroomCode,
        label: c.classroomCode
    }));

    useEffect(() => {
        dispatch(fetchDepClassrooms());
    }, [dispatch]);

    return (
        <>
            <FaPlusCircle
                size={20}
                className={classes.icon}
                onClick={() =>
                    push({
                        day: 'Pazartesi',
                        startTime: null,
                        finishTime: null,
                        type: 'Ders',
                        classroomCode: ''
                    })
                }
            />
            <label className={classes.label}>
                Ders saati eklemek için tıklayınız
            </label>
            <div className={classes.pickerContainer}>
                {sectionClassrooms.map((_, index) => (
                    <div key={index} className={classes.picker}>
                        <FaMinusCircle
                            className={classes.minus}
                            size={20}
                            onClick={() => remove(index)}
                        />
                        <div className={classes.row}>
                            <Field
                                name={`sectionClassrooms[${index}].day`}
                                component={Select}
                                options={dayOptions}
                                label="Ders Günü"
                                containerClass={classes.select}
                            />
                            <Field
                                label="Derslik Tipi"
                                name={`sectionClassrooms[${index}].type`}
                                component={Select}
                                options={classTypeOpts}
                            />
                        </div>
                        <DatePicker
                            className={classes.hourPicker}
                            placeholderText="Ders başlangıç saati"
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={60}
                            timeCaption="Time"
                            timeFormat="HH:mm"
                            dateFormat="HH:mm"
                            excludeTimes={excludedTimes}
                            selected={sectionClassrooms[index].startTime}
                            onChange={date =>
                                setFieldValue(
                                    `sectionClassrooms[${index}].startTime`,
                                    date
                                )
                            }
                        />
                        <DatePicker
                            className={classes.hourPicker}
                            placeholderText="Ders Bitiş saati"
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={60}
                            timeCaption="Time"
                            timeFormat="H:mm"
                            dateFormat="H:mm"
                            selected={sectionClassrooms[index].finishTime}
                            excludeTimes={excludedTimes}
                            onChange={date => {
                                setFieldValue(
                                    `sectionClassrooms[${index}].finishTime`,
                                    date
                                );
                            }}
                        />

                        <Field
                            name={`sectionClassrooms[${index}].classroomCode`}
                            component={Select}
                            label="Derslik Adı"
                            placeholder="Derslik kodunu giriniz"
                            options={classroommOpts}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default ClassroomPicker;
