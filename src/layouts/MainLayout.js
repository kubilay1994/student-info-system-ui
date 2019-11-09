import React, { useContext, useState } from 'react';
import AuthContext from '../context/auth-context';

import Sidebar from '../UIcomponents/Sidebar';
import Header from '../components/Header';
import BackDrop from '../UIcomponents/Backdrop';

const MainLayout = () => {
    const { clearAuthData } = useContext(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const LogoutHandler = () => {
        clearAuthData();
    };

    return (
        <>
            <Header onSidebarOpen={() => setIsSidebarOpen(true)} />
            <BackDrop
                open={isSidebarOpen}
                onBackdropClick={() => setIsSidebarOpen(false)}
            />
            <Sidebar onLogout={LogoutHandler} open={isSidebarOpen}></Sidebar>
        </>
    );
};

export default React.memo(MainLayout);
