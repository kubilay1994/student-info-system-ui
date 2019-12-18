import React, { useEffect, useCallback } from 'react';

import { Router } from '@reach/router';

import { useDispatch, useSelector } from '../../store';
import { fetchCourses } from '../../store/actions/course';
import { fetchAllSections } from '../../store/actions/section';
import { fetchDepInstructors } from '../../store/actions/classroom';

import CourseForm from '../CourseForm';
import CourseList from '../List/CourseList';
import SectionList from '../List/SectionList';
import SectionForm from '../SectionForm';

const coursesSelector = state => state.course.courses;
const sectionsSelector = state => state.section.sections;
const instructorSelector = state => state.classroom.instructors;

const AdminRouter = () => {
    const courses = useSelector(coursesSelector);
    const sections = useSelector(sectionsSelector);
    const instructors = useSelector(instructorSelector);

    const dispatch = useCallback(useDispatch(), []);
    useEffect(() => {
        dispatch(fetchCourses());
        dispatch(fetchAllSections());
        dispatch(fetchDepInstructors());
    }, [dispatch]);

    return (
        <Router primary={false}>
            <SectionList path="sections" sections={sections} />
            <SectionForm path="sections/add" instructors={instructors} />
            <SectionForm path="sections/edit/:id" instructors={instructors} />

            <CourseList path="courses" courses={courses} />
            <CourseForm path="courses/add" courses={courses} />
            <CourseForm path="courses/edit/:id" courses={courses} />
        </Router>
    );
};

export default AdminRouter;
