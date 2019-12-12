import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import CourseSchedule from '../../components/CourseSchedule';
import OpenedSections from '../../components/OpenedSections';

import InfoForm from '../../components/InfoForm';

import { Router } from '@reach/router';

import AdminRouter from '../../components/AdminRouter';
import StudentRouter from '../../components/StudentRouter';
import restAPI from '../../axios-instances';

import { useSelector } from '../../store';
import { term, year } from '../../utils/constants';

const commonSectionPath = '/api/rest/common/sections';
const roleSelector = state => state.user.user.role;

const MainPage = () => {
    const [termSections, setTermSections] = useState([]);
    const role = useSelector(roleSelector);

    useEffect(() => {
        const fetchSectionByYearAndTerm = async () => {
            try {
                const res = await restAPI.get(
                    `${commonSectionPath}/${year}/${term}`
                );
                setTermSections(res.data);
            } catch (error) {
                // console.log(error.message);
                // console.log(error.response);
                // console.log(error.request);
            }
        };

        fetchSectionByYearAndTerm();
    }, []);

    return (
        <>
            <MainLayout />
            <Router primary={false}>
                <CourseSchedule path="courseSchedule" />
                <InfoForm path="updateContactInfo" />
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
            </Router>
        </>
    );
};

export default MainPage;
