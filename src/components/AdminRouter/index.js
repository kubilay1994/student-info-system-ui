import React, { useEffect, useCallback } from 'react';

import { Router } from '@reach/router';

import { useDispatch, useSelector } from '../../store';
import { fetchCourses } from '../../store/actions/course';
import { fetchAllSections } from '../../store/actions/section';

import CourseForm from '../CourseForm';
import CourseList from '../List/CourseList';
import SectionList from '../List/SectionList';
import SectionForm from '../SectionForm';

const coursesSelector = state => state.course.courses;
const sectionsSelector = state => state.section.sections;

const AdminRouter = () => {
    const courses = useSelector(coursesSelector);
    const sections = useSelector(sectionsSelector);

    const dispatch = useCallback(useDispatch(), []);
    useEffect(() => {
        dispatch(fetchCourses());
        dispatch(fetchAllSections());
    }, [dispatch]);

    return (
        <Router primary={false}>
            <SectionList path="sections" sections={sections} />
            <SectionForm path="sections/add" sections={sections} />
            <SectionForm path="sections/edit/:id" sections={sections} />

            <CourseList path="courses" courses={courses} />
            <CourseForm path="courses/add" courses={courses} />
            <CourseForm path="courses/edit/:id" courses={courses} />
        </Router>
    );
};

export default AdminRouter;
