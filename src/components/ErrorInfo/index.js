import React from 'react';
import classes from './ErrorInfo.module.css';

const ErrorInfo = ({ message }) => {
    return message ? <div className={classes.error}>{message}</div> : null;
};

export default ErrorInfo;
