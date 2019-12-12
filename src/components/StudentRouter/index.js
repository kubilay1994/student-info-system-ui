import React, { useState, useEffect } from 'react';

import { Router } from '@reach/router';


import CourseEnroll from '../CourseEnroll';
import StdEnrollList from '../StdEnrollList';

import { term, year } from '../../utils/constants';

import restAPI from '../../axios-instances';

const baseUrl = '/api/rest/student/sections';

const StudentRouter = ({ termSections }) => {
    const [enrolledSections, setEnrolledSections] = useState([]);
    const [studentSections, setStudentSections] = useState([]);

    useEffect(() => {
        const fetchEnrollledSections = async () => {
            const url = `${baseUrl}/${year}/${term}`;
            try {
                const res = await restAPI.get(url);
                setEnrolledSections(res.data);
            } catch (error) {
                // console.log(error.message);
                // console.log(error.request);
                // console.log(error.response);
            }
        };

        const fetchStudentSections = async () => {
            try {
                const res = await restAPI.get(baseUrl);
                console.log(res);
                setStudentSections(res.data);

            } catch (error) {
                console.log(error.response)
            }
        }

        fetchEnrollledSections();
        fetchStudentSections();
    }, []);

    const handleEnrollSection = async id => {
        const res = await restAPI.post(`${baseUrl}/${id}`);
        setEnrolledSections(enrolledSections => [
            ...enrolledSections,
            res.data
        ]);
    };

    const handleUnenrollSection = async id => {
        await restAPI.delete(`${baseUrl}/${id}`);
        setEnrolledSections(enrolledSections =>
            enrolledSections.filter(s => s.id !== id)
        );
    };

    return (
        <Router primary={false}>
            <CourseEnroll
                path="enrollCourse"
                sections={termSections}
                enrolledSections={enrolledSections}
                onEnroll={handleEnrollSection}
                onUnenroll={handleUnenrollSection}
            />
            <StdEnrollList
                path="stdCourseList"
                studentSections={studentSections}
            />
        </Router>
    );
};

export default StudentRouter;
