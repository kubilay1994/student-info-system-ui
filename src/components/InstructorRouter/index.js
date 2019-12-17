import React, { useState, useEffect } from 'react';

import { Router } from '@reach/router';

import InsCourseList from '../InsCourseList';
import CourseSchedule from '../CourseSchedule';
import InsCourseOps from '../InsCourseOps';

import restAPI from '../../axios-instances';
import { year, term } from '../../utils/constants';

const InstructorRouter = () => {
    const [givenSections, setGivenSections] = useState([]);
    

    useEffect(() => {
        const fetchGivenCourses = async () => {
            const baseUrl = '/api/rest/instructor/sections';
            try {
                const res = await restAPI.get(`${baseUrl}/${year}/${term}`);
                setGivenSections(res.data);
            } catch (error) {
                console.log(error.response);
            }
        };

        fetchGivenCourses();
    }, []);

    return (
        <Router primary={false}>
            <InsCourseList
                path="/courseList"
                sections={givenSections}
            />
            <InsCourseOps
                path="/course/:id"
            />
            <CourseSchedule path="/courseSchedule" sections={givenSections} />
        </Router>
    );
};

export default InstructorRouter;
