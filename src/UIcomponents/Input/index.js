import React from 'react';
import classes from './Input.module.css';

import { ErrorMessage } from 'formik';

const Input = props => (
    <div className={[classes.inputContainer, props.containerClass].join('')}>
        {props.label && (
            <label
                form={props.labelFor}
                className={[classes.formLabel, props.labelClass].join(' ')}
            >
                {props.label}
            </label>
        )}
        <input
            className={[
                classes.formInput,
                props.error && classes.errorInput,
                props.inputClass
            ].join(' ')}
            {...props}
        ></input>
        <ErrorMessage
            className={classes.error}
            name={props.name}
            component="div"
        />
    </div>
);

export default React.memo(Input);
// export default Input;
