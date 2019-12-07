// import React, { useState } from 'react';
import React from 'react';
import { Link } from '@reach/router';
import { FaCaretLeft } from 'react-icons/fa';

import classes from './Dropdown.module.css';
// import { combineCLasses } from '../../utils/classnames';

const Dropdown = ({ isActive, headerData, itemData, onLinkClicked }) => {
    const { HeaderIcon } = headerData;

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
                                onLinkClicked={onLinkClicked}
                            />
                        );
                    }

                    return (
                        <li key={id}>
                            <Link
                                to={path}
                                getProps={isActive}
                                onClick={onLinkClicked}
                            >
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
