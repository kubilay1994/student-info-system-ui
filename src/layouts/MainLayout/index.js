import React, { useContext, useState } from 'react';
import AuthContext from '../../context/auth-context';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import BackDrop from '../../UIcomponents/Backdrop';

import classes from './MainLayout.module.css';

const MainLayout = () => {
    const { clearAuthData } = useContext(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const LogoutHandler = () => {
        clearAuthData();
    };

    const handleLinkClicked = () => {
        setIsSidebarOpen(false);
    };

    return (
        <>
            <Header onSidebarOpen={() => setIsSidebarOpen(true)} />
            <BackDrop
                open={isSidebarOpen}
                onBackdropClick={() => setIsSidebarOpen(false)}
            />
            <Sidebar
                onLogout={LogoutHandler}
                open={isSidebarOpen}
                onLinkClicked={handleLinkClicked}
            />
            <div className={classes.h} />
        </>
    );
};

export default React.memo(MainLayout);
