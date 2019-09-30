import React from 'react';
import btnClasses from './Button.module.css';

const Button = props => (
    <button
        className={[btnClasses.btn, btnClasses[props.type]].join(' ')}
        disabled={props.disabled}
        {...props}
    >
        {props.children}
    </button>
);

export default React.memo(Button);
// export default Button;
