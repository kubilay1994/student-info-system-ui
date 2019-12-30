import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import OpenedSections from '../../components/OpenedSections';

import InfoForm from '../../components/InfoForm';

import { Router } from '@reach/router';

import AdminRouter from '../../components/AdminRouter';
import StudentRouter from '../../components/StudentRouter';
import InstructorRouter from '../../components/InstructorRouter';

import restAPI from '../../axios-instances';

import { useSelector } from '../../store';
import { term, year } from '../../utils/constants';

const instructorCommonSectionPath = '/api/rest/instructor/sections/common';
const studentCommonSectionPath = '/api/rest/student/sections/common';
const adminCommonSectionPath = '/api/rest/admin/sections/common';

// const s

const roleSelector = state => state.user.role;

const MainPage = () => {
    const [termSections, setTermSections] = useState([]);

    const role = useSelector(roleSelector);

    useEffect(() => {
        const fetchSectionByYearAndTerm = async () => {
            let url;
            if (role === 'Admin') {
                url = adminCommonSectionPath;
            } else if (role === 'Student') {
                url = studentCommonSectionPath;
            } else if (role === 'Instructor') {
                url = instructorCommonSectionPath;
            } else {
                return;
            }

            try {
                const res = await restAPI.get(
                    `${url}/${year}/${term}${role === 'Student' && '?query='}`
                );
                setTermSections(res.data);
            } catch (error) {
                console.log(error.message);
                console.log(error.response);
                console.log(error.request);
            }
        };

        fetchSectionByYearAndTerm();
    }, [role]);

    return (
        <>
            <MainLayout />
            <Router primary={false}>
                {role !== 'Admin' && <InfoForm path="updateContactInfo" />}
                <OpenedSections
                    path="offeredCourses"
                    termSections={termSections}
                />
                {role === 'Admin' && <AdminRouter path="admin/*" />}
                {role === 'Student' && (
                    <StudentRouter
                        path="/student/*"
                        termSections={termSections}
                    />
                )}

                {role === 'Instructor' && (
                    <InstructorRouter path="instructor/*" />
                )}
            </Router>
        </>
    );
};

export default MainPage;
