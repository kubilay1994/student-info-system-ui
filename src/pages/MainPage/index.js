import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import CourseTable from '../../components/CourseTable';

import InfoForm from '../../components/InfoForm'

import { Router } from '@reach/router';

const MainPage = () => {
    return (
        <>
            <MainLayout />
            <Router>
                <CourseTable path="courseSchedule" />
                <InfoForm path="/updateContactInfo"/>
            </Router>
        </>
    );
};

export default MainPage;
