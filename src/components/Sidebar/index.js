import React from 'react';
import { Link } from '@reach/router';

import classes from './Sidebar.module.css';
import { Button } from '../../UIcomponents';
import Dropdown from './Dropdown';

import { CSSTransition } from 'react-transition-group';

import { useSelector } from '../../store';

import {
    FaUserShield,
    FaAddressBook,
    FaClipboardList,
    FaHome,
    FaBookOpen,
    FaBook,
    FaChessBoard,
    FaListUl,
    FaUserGraduate,
    FaChalkboardTeacher,
    FaListOl
} from 'react-icons/fa';

const isActive = ({ isCurrent }) => {
    const linkClasses = [classes.sidebarLink];
    if (isCurrent) {
        linkClasses.push(classes.linkActive);
    }
    return { className: linkClasses.join(' ') };
};

const userSelector = state => state.user.user;
const roleSelector = state => state.user.role;

const Sidebar = ({ onLogout, open, onLinkClicked }) => {
    const user = useSelector(userSelector);
    const role = useSelector(roleSelector);

    return (
        <CSSTransition in={open} timeout={400} classNames="slide" unmountOnExit>
            <nav className={classes.container}>
                <header className={classes.sidebarHeader}>
                    <h3 className={classes.headerText}>
                        <div>{`${role} Account `}</div>
                        {role !== 'Admin' &&
                            `${user.firstName} ${user.lastName}`}
                    </h3>
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

                    {role !== 'Admin' && (
                        <li className={classes.item}>
                            <Link
                                to="updateContactInfo"
                                getProps={isActive}
                                onClick={onLinkClicked}
                            >
                                <FaAddressBook
                                    size={20}
                                    className={classes.icon}
                                />
                                İletişim Bilgisi Düzenleme
                            </Link>
                        </li>
                    )}
                    <li className={classes.item}>
                        <Link
                            to="offeredCourses"
                            getProps={isActive}
                            onClick={onLinkClicked}
                        >
                            <FaAddressBook size={20} className={classes.icon} />
                            Bölüme Açılan Dersler
                        </Link>
                    </li>

                    {role === 'Student' && (
                        <Dropdown
                            isActive={isActive}
                            headerData={courseOpsHeaderData}
                            itemData={courseOpData}
                            onLinkClicked={onLinkClicked}
                        />
                    )}
                    {role === 'Admin' && (
                        <Dropdown
                            isActive={isActive}
                            headerData={dropDownHeaderData}
                            itemData={dropdownItemData}
                            onLinkClicked={onLinkClicked}
                        />
                    )}

                    {role === 'Instructor' && (
                        <Dropdown
                            isActive={isActive}
                            headerData={insHeaderData}
                            itemData={insData}
                            onLinkClicked={onLinkClicked}
                        />
                    )}
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

const insHeaderData = {
    title: 'Öğretmen İşlemleri',
    path: '#',
    HeaderIcon: FaChalkboardTeacher
};

const insData = [
    {
        id: 1,
        path: 'instructor/courseList',
        title: 'Verilen Ders Listesi',
        Icon: FaListOl
    },
    {
        id: 2,
        path: 'instructor/courseSchedule',
        title: 'Ders Programı',
        Icon: FaClipboardList
    }
];

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
    },
    {
        id: 2,
        path: 'student/stdCourseList',
        title: 'Öğrencinin Aldığı Dersler ',
        Icon: FaListUl
    },
    {
        id: 3,
        path: 'student/courseSchedule',
        title: 'Ders Programı',
        Icon: FaClipboardList
    },
    {
        id: 4,
        path: 'student/grades',
        title: 'Öğrencinin Ders Notları',
        Icon: FaUserGraduate
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
        title: 'Ders Grup İşlemleri',
        Icon: FaUserShield
    },

    {
        id: 3,
        path: '/admin/courses',
        title: 'Ders işlemleri',
        Icon: FaBookOpen
    }
];
