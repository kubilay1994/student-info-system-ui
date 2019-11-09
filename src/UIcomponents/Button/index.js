import React from 'react';
import classes from './Button.module.css';
import { combineCLasses } from '../../utils/classnames';

const Button = ({ btnCLass, children, color, ...rest }) => {
    const classNames = combineCLasses({
        [classes.btn]: true,
        [btnCLass]: true,
        [classes[color]]: color,
    });

    return (
        <button className={classNames} {...rest}>
            {children}
        </button>
    );
};

export default React.memo(Button);
// export default Button;
