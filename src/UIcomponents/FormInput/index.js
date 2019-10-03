import React from 'react';
import classes from './FormInput.module.css';

import { ErrorMessage } from 'formik';

const FormInput = ({ field, form: { touched,errors }, ...rest }) => (
    <div className={[classes.inputContainer, rest.containerClass].join('')}>
        {rest.label && (
            <label
                form={rest.labelFor}
                className={[classes.formLabel, rest.labelClass].join(' ')}
            >
                {rest.label}
            </label>
        )}

        <input
            className={[
                classes.formInput,
                errors[field.name] && touched[field.name] && classes.errorInput,
                rest.inputClass
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

export default React.memo(FormInput);
// export default Input;
