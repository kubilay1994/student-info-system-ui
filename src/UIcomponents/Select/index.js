import React from 'react';
import { ErrorMessage } from 'formik';

import classes from './Select.module.css';

import { combineCLasses } from '../../utils/classnames';

const Select = ({
    field,
    form: { touched, errors },
    options,
    label,
    containerClass,
    placeholder,
    ...rest
}) => {
    const selectClasses = combineCLasses({
        [classes.errorSelect]: touched[field.name] && errors[field.name],
        [classes.select]: true
    });

    const containerClasses = combineCLasses({
        [classes.container]: true,
        [containerClass]: containerClass
    });

    return (
        options && (
            <div className={containerClasses}>
                <label className={classes.label}>{label}</label>
                <select className={selectClasses} {...field} {...rest}>
                    {placeholder && <option>{placeholder}</option>}
                    {options.map(op => (
                        <option value={op.value} key={op.value}>
                            {op.label}
                        </option>
                    ))}
                </select>
                <ErrorMessage
                    className={classes.error}
                    name={field.name}
                    component="div"
                />
            </div>
        )
    );
};

export default Select;
