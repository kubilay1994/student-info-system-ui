import React from 'react';
import BackDrop from '../Backdrop';
import classes from './Modal.module.css';

import { CSSTransition } from 'react-transition-group';

const Modal = ({ open, onClose, children }) => {
    return (
        <CSSTransition
            in={open}
            timeout={500}
            unmountOnExit
            classNames={{
                enter: classes['fade-enter'],
                enterActive: classes['fade-enter-active'],
                exitActive: classes['fade-exit-active']
            }}
        >
            <div className={classes.modal}>
                <BackDrop onBackdropClick={onClose} open={open} />
                {children}
            </div>
        </CSSTransition>
    );
};

export default Modal;
