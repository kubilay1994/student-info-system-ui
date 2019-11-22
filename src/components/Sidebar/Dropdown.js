// import React, { useState } from 'react';
import React from 'react';
import { Link } from '@reach/router';
import { FaCaretLeft } from 'react-icons/fa';

import classes from './Dropdown.module.css';
// import { combineCLasses } from '../../utils/classnames';

const Dropdown = ({ isActive, headerData, itemData }) => {
    const { HeaderIcon } = headerData;
    // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // const handleDropdownOpen = event => {
    //     event.stopPropagation();
    //     setIsDropdownOpen(prev => !prev);
    // };

    // const dropdownClasses = combineCLasses({
    //     [classes.dropDownHeader]: true,
    //     [classes.open]: isDropdownOpen
    // });

    return (
        <li className={classes.dropDownHeader}>
            <Link to={headerData.path} getProps={isActive}>
                <HeaderIcon className={classes.icon} size={20} />
                {headerData.title}
                <FaCaretLeft className={classes.caretIcon} />
            </Link>
            <ul className={classes.dropdownMenu}>
                {itemData.map(({ dropdown, id, title, Icon, path }) => {
                    if (dropdown) {
                        return (
                            <Dropdown
                                isActive={isActive}
                                headerData={dropdown.headerData}
                                itemData={dropdown.itemData}
                                key={id}
                            />
                        );
                    }

                    return (
                        <li key={id}>
                            <Link to={path} getProps={isActive}>
                                <Icon className={classes.icon} size={20} />
                                {title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </li>
    );
};

export default Dropdown;
