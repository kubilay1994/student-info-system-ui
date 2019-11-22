import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import CourseTable from '../../components/CourseTable';

import InfoForm from '../../components/InfoForm';

import { Router } from '@reach/router';

import { SectionPage, DepartmentPage, CoursePage } from '../';

const MainPage = () => {
    return (
        <>
            <MainLayout />
            <Router primary={false}>
                <CourseTable path="courseSchedule" />
                <InfoForm path="updateContactInfo" />
                <SectionPage path="admin/createSection" />
                <DepartmentPage path="admin/departments" />
                <CoursePage path="/admin/courses" />
                {/* <Redirect from="/*" to="/" noThrow /> */}
            </Router>
        </>
    );
};

export default MainPage;
