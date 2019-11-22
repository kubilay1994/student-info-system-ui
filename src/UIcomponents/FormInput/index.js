import React from 'react';
import classes from './FormInput.module.css';

import { ErrorMessage } from 'formik';

const FormInput = ({
    componentType,
    label,
    inputClass,
    labelClass,
    containerClass,
    field,
    form: { touched, errors },
    ...rest
}) => {
    let Component;
    switch (componentType) {
        case 'textarea':
            Component = 'textarea';
            break;
        default:
            Component = 'input';
    }

    return (
        <div className={[classes.inputContainer, containerClass].join(' ')}>
            {label && (
                <label className={[classes.formLabel, labelClass].join(' ')}>
                    {label}
                </label>
            )}

            <Component
                className={[
                    classes.formInput,
                    errors[field.name] &&
                        touched[field.name] &&
                        classes.errorInput,
                    inputClass
                ].join(' ')}
                {...field}
                {...rest}
            ></Component>
            <ErrorMessage
                className={classes.error}
                name={field.name}
                component="div"
            />
        </div>
    );
};

export default FormInput;
