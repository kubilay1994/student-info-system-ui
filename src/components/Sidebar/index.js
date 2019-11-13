import React from 'react';
import { Link } from '@reach/router';

import classes from './Sidebar.module.css';
import Button from '../../UIcomponents/Button';
import Dropdown from './Dropdown';

import { FaArchive, FaAddressBook, FaClipboardList } from 'react-icons/fa';

const Sidebar = ({ onLogout, open }) => {
    const isActive = ({ isCurrent }) => {
        const linkClasses = [classes.sidebarLink];
        if (isCurrent) {
            linkClasses.push(classes.linkActive);
        }
        return { className: linkClasses.join(' ') };
    };

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
                        <FaArchive size={20} className={classes.icon} />
                        Some Link
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

const dropDownHeaderData = { title: 'Some Link', path: '#' };

const dropdownItemData = [
    { id: 1, path: '#', title: 'Some inner link' },
    { id: 2, path: '#', title: 'Some inner link' },
    {
        id: 3,
        dropdown: {
            headerData: { path: '#', title: 'Even more' },
            itemData: [{ id: 1, path: '#', title: 'wow' }]
        }
    }
];
