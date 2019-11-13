import React from 'react';
import { Link } from '@reach/router';
import { FaCaretLeft, FaBook, FaApple } from 'react-icons/fa';

import classes from './Dropdown.module.css';

const Dropdown = ({ isActive, headerData, itemData }) => {
    return (
        <li className={classes.dropDownHeader}>
            <Link to={headerData.path} getProps={isActive}>
                <FaApple className={classes.icon} size={20} />
                {headerData.title}
                <FaCaretLeft className={classes.caretIcon} />
            </Link>
            <ul className={classes.dropdownMenu}>
                {itemData.map(item => {
                    if (item.dropdown) {
                        return (
                            <Dropdown
                                isActive={isActive}
                                headerData={item.dropdown.headerData}
                                itemData={item.dropdown.itemData}
                                key={item.id}
                            />
                        );
                    }

                    return (
                        <li key={item.id} className={classes.item}>
                            <Link to={item.path} getProps={isActive}>
                                <FaBook className={classes.icon} size={20} />
                                {item.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </li>
    );
};

export default Dropdown;
