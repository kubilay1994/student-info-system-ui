import React from 'react';
import classes from './FormInput.module.css';

import { ErrorMessage } from 'formik';

const FormInput = ({
    label,
    inputClass,
    labelClass,
    containerClass,
    field,
    form: { touched, errors },
    ...rest
}) => (
    <div className={[classes.inputContainer, containerClass].join('')}>
        {label && (
            <label className={[classes.formLabel, labelClass].join(' ')}>
                {label}
            </label>
        )}

        <input
            className={[
                classes.formInput,
                errors[field.name] && touched[field.name] && classes.errorInput,
                inputClass
            ].join(' ')}
            {...field}
            {...rest}
        ></input>
        <ErrorMessage
            className={classes.error}
            name={field.name}
            component="div"
        />
    </div>
);

// export default React.memo(FormInput);
export default FormInput;
