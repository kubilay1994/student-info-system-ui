import React from 'react';
import { Link } from '@reach/router';

import classes from './Sidebar.module.css';
import Button from '../../UIcomponents/Button';
import Dropdown from './Dropdown';

import {
    FaUserShield,
    FaAddressBook,
    FaClipboardList,
    FaHome,
    FaCreativeCommonsSa,
    FaBookOpen
} from 'react-icons/fa';

const isActive = ({ isCurrent }) => {
    const linkClasses = [classes.sidebarLink];
    if (isCurrent) {
        linkClasses.push(classes.linkActive);
    }
    return { className: linkClasses.join(' ') };
};

const Sidebar = ({ onLogout, open }) => {
    return (
        <nav className={`${classes.container} ${open && classes.slide}`}>
            <header className={classes.sidebarHeader}>
                <p className={classes.headerText}>
                    Header of the Sidebar. Probably some date with a photo
                </p>
            </header>

            <ul className={classes.items}>
                <li className={classes.item}>
                    <Link to="/" getProps={isActive}>
                        <FaHome size={20} className={classes.icon} />
                        Ana Sayfa
                    </Link>
                </li>
                <li className={classes.item}>
                    <Link to="courseSchedule" getProps={isActive}>
                        <FaClipboardList size={20} className={classes.icon} />
                        Ders Programı
                    </Link>
                </li>
                <li className={classes.item}>
                    <Link to="updateContactInfo" getProps={isActive}>
                        <FaAddressBook size={20} className={classes.icon} />
                        Öğrenci İletişim Bilgisi Düzenleme
                    </Link>
                </li>
                <li className={classes.item}>
                    <Link to="admin/createSection" getProps={isActive}>
                        <FaUserShield size={20} className={classes.icon} />
                        Ders Grubu Ekleme
                    </Link>
                </li>

                <Dropdown
                    isActive={isActive}
                    headerData={dropDownHeaderData}
                    itemData={dropdownItemData}
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
    );
};

export default Sidebar;

const dropDownHeaderData = {
    title: 'Admin İşlemleri',
    path: '#',
    HeaderIcon: FaUserShield
};

const dropdownItemData = [
    {
        id: 1,
        path: '/admin/section',
        title: 'Ders Grubu Ekleme',
        Icon: FaUserShield
    },
    {
        id: 2,
        path: '/admin/departments',
        title: 'Departman ekleme',
        Icon: FaCreativeCommonsSa
    },
    {
        id: 3,
        path: '/admin/courses',
        title: 'Ders işlemleri',
        Icon: FaBookOpen
    },
    {
        id: 4,
        dropdown: {
            headerData: {
                path: '#',
                title: 'Even more',
                HeaderIcon: FaUserShield
            },
            itemData: [{ id: 1, path: '#', title: 'wow', Icon: FaUserShield }]
        }
    }
];
