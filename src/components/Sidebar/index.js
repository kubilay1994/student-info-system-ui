import React from 'react';
import { Link } from '@reach/router';

import classes from './Sidebar.module.css';
import { Button } from '../../UIcomponents';
import Dropdown from './Dropdown';

import { CSSTransition } from 'react-transition-group';

import {
    FaUserShield,
    FaAddressBook,
    FaClipboardList,
    FaHome,
    FaBookOpen,
    FaBook,
    FaChessBoard
} from 'react-icons/fa';

const isActive = ({ isCurrent }) => {
    const linkClasses = [classes.sidebarLink];
    if (isCurrent) {
        linkClasses.push(classes.linkActive);
    }
    return { className: linkClasses.join(' ') };
};

const Sidebar = ({ onLogout, open, onLinkClicked }) => {
    return (
        <CSSTransition in={open} timeout={400} classNames="slide" unmountOnExit>
            <nav className={classes.container}>
                <header className={classes.sidebarHeader}>
                    <p className={classes.headerText}>
                        Header of the Sidebar. Probably some date with a photo
                    </p>
                </header>

                <ul className={classes.items}>
                    <li className={classes.item}>
                        <Link
                            to="/"
                            getProps={isActive}
                            onClick={onLinkClicked}
                        >
                            <FaHome size={20} className={classes.icon} />
                            Ana Sayfa
                        </Link>
                    </li>
                    <li className={classes.item}>
                        <Link
                            to="courseSchedule"
                            getProps={isActive}
                            onClick={onLinkClicked}
                        >
                            <FaClipboardList
                                size={20}
                                className={classes.icon}
                            />
                            Ders Programı
                        </Link>
                    </li>
                    <li className={classes.item}>
                        <Link
                            to="updateContactInfo"
                            getProps={isActive}
                            onClick={onLinkClicked}
                        >
                            <FaAddressBook size={20} className={classes.icon} />
                            Öğrenci İletişim Bilgisi Düzenleme
                        </Link>
                    </li>

                    <Dropdown
                        isActive={isActive}
                        headerData={courseOpsHeaderData}
                        itemData={courseOpData}
                        onLinkClicked={onLinkClicked}
                    />
                    <Dropdown
                        isActive={isActive}
                        headerData={dropDownHeaderData}
                        itemData={dropdownItemData}
                        onLinkClicked={onLinkClicked}
                    />

                    <Button
                        btnCLass={classes.sidebarBtn}
                        onClick={onLogout}
                        color="outline-blue"
                    >
                        Çıkış
                    </Button>
                </ul>
            </nav>
        </CSSTransition>
    );
};

export default Sidebar;

const courseOpsHeaderData = {
    title: 'Ders İşlemleri',
    path: '#',
    HeaderIcon: FaBook
};

const courseOpData = [
    {
        id: 1,
        path: 'student/enrollCourse',
        title: 'Ders Ekle',
        Icon: FaChessBoard
    }
];

const dropDownHeaderData = {
    title: 'Admin İşlemleri',
    path: '#',
    HeaderIcon: FaUserShield
};

const dropdownItemData = [
    {
        id: 1,
        path: '/admin/sections',
        title: 'Ders Grubu Ekleme',
        Icon: FaUserShield
    },

    {
        id: 3,
        path: '/admin/courses',
        title: 'Ders işlemleri',
        Icon: FaBookOpen
    }
];
