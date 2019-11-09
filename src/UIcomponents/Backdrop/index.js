import React from 'react';
import { backdrop, openBackdrop } from './Backdrop.module.css';

import { combineCLasses } from '../../utils/classnames';

const Backdrop = ({ onBackdropClick, open }) => {
    const classnames = combineCLasses({
        [backdrop]: true,
        [openBackdrop]: open
    });

    return <div className={classnames} onClick={onBackdropClick}></div>;
};

export default Backdrop;
