import React from 'react';
import classes from './Input.module.css';

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
            className={[classes.formInput, props.inputClass].join(' ')}
            {...props}
        ></input>
    </div>
);

export default React.memo(Input);
// export default Input;
