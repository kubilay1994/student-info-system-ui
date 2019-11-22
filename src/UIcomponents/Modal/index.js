import React from 'react';
import BackDrop from '../Backdrop';
import classes from './Modal.module.css';

const Modal = ({ open, onClose, children }) => {
    return (
        <div className={`${classes.modal} ${open && classes.modalOpen}`}>
            <BackDrop onBackdropClick={onClose} open={open} />
            {children}
        </div>
    );
};

export default Modal;
