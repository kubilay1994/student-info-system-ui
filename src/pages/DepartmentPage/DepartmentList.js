import React from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import classes from './DepartmentList.module.css';

const DepartmentList = ({
    departments,
    onDepDelete,
    onDepSelect,
    onDepUnselect
}) => {
    return (
        <ul className={classes.departmentList}>
            <FaPlus
                size={20}
                className={`${classes.icon} ${classes.add}`}
                onClick={onDepUnselect}
            />
            {departments &&
                departments.map(department => (
                    <li key={department.id}>
                        {department.title}
                        <div className={classes.icons}>
                            <FaEdit
                                size={20}
                                className={classes.icon}
                                onClick={() => onDepSelect(department)}
                            />
                            <FaTrash
                                color="crimson"
                                size={20}
                                className={classes.icon}
                                onClick={() => onDepDelete(department.id)}
                            />
                        </div>
                    </li>
                ))}
        </ul>
    );
};

export default DepartmentList;
