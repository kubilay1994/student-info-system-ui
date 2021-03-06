import React from 'react';
import classes from './Header.module.css';
import { FaBars } from 'react-icons/fa';

const Header = ({ onSidebarOpen }) => {
    return (
        <header className={classes.header}>
            <div className={classes.menuIcon}>
                <FaBars
                    onClick={onSidebarOpen}
                    size="2rem"
                    color="23303f"
                    cursor="pointer"
                />
            </div>
            <h2 className={classes.headerItem}>
                YTÜ Bilgisayar Mühendisliği Bilgi Sistemi
            </h2>
        </header>
    );
};

export default Header;
