import React from 'react';
import classes from './Classroom.module.css';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { FormInput, Select } from '../../UIcomponents';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Field } from 'formik';

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

const index = ({ form, push, remove }) => {
    const { setFieldValue } = form;
    const { sectionClassrooms } = form.values;
    return (
        <>
            <FaPlusCircle
                size={20}
                className={classes.icon}
                onClick={() =>
                    push({
                        day: 'Pazartesi',
                        startDate: null,
                        finishDate: null,
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
                            selected={sectionClassrooms[index].startDate}
                            onChange={date =>
                                setFieldValue(
                                    `sectionClassrooms[${index}].startDate`,
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
                            selected={sectionClassrooms[index].finishDate}
                            onChange={date => {
                                setFieldValue(
                                    `sectionClassrooms[${index}].finishDate`,
                                    date
                                );
                            }}
                        />

                        <Field
                            name={`sectionClassrooms[${index}].classroomCode`}
                            component={FormInput}
                            type="text"
                            label="Derslik Adı"
                            placeholder="Derslik kodunu giriniz"
                            containerClass={classes.formInput}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default index;
