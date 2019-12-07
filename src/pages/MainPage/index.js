import React, { useEffect, useCallback } from 'react';
import MainLayout from '../../layouts/MainLayout';
import CourseSchedule from '../../components/CourseSchedule';
import CourseForm from '../../components/CourseForm';
import CourseList from '../../components/List/CourseList';
import SectionList from '../../components/List/SectionList';
import SectionForm from '../../components/SectionForm';

import CourseEnroll from '../../components/CourseEnroll';

import InfoForm from '../../components/InfoForm';

import { Router } from '@reach/router';

import { useDispatch, useSelector } from '../../store';
import { fetchCourses } from '../../store/actions/course';
import { fetchAllSections } from '../../store/actions/section';

const coursesSelector = state => state.course.courses;
const sectionsSelector = state => state.section.sections;

const MainPage = () => {
    const courses = useSelector(coursesSelector);
    const sections = useSelector(sectionsSelector);

    const dispatch = useCallback(useDispatch(), []);
    useEffect(() => {
        dispatch(fetchCourses());
        dispatch(fetchAllSections());
    }, [dispatch]);

    return (
        <>
            <MainLayout />
            <Router primary={false}>
                <CourseSchedule path="courseSchedule" />
                <InfoForm path="updateContactInfo" />

                <SectionList path="admin/sections" sections={sections} />
                <SectionForm path="admin/sections/add" sections={sections} />
                <SectionForm
                    path="admin/sections/edit/:id"
                    sections={sections}
                />

                <CourseList path="admin/courses" courses={courses} />
                <CourseForm path="admin/courses/add" courses={courses} />
                <CourseForm path="admin/courses/edit/:id" courses={courses} />

                <CourseEnroll path="student/enrollCourse" sections={sections} />
            </Router>
        </>
    );
};

export default MainPage;
