import {
    SET_COURSES,
    ADD_COURSE,
    DELETE_COURSE,
    UPDATE_COURSE
} from '../reducers/course';

import { ON_COURSE_UPDATE } from '../reducers/section';
import restAPI from '../../axios-instances';

const adminCoursePath = '/api/rest/admin/courses';

export const fetchCourses = () => async dispatch => {
    try {
        const res = await restAPI.get(adminCoursePath);
        dispatch({ type: SET_COURSES, courses: res.data });
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteCourse = id => async dispatch => {
    try {
        await restAPI.delete(`${adminCoursePath}/${id}`);
        dispatch({ type: DELETE_COURSE, id });
    } catch (error) {
        console.log(error.response);
    }
};

export const updateCourse = course => async dispatch => {
    const res = await restAPI.put(`${adminCoursePath}/${course.id}`, course);
    console.log(res.data);
    dispatch({ type: UPDATE_COURSE, course: res.data });
    dispatch({ type: ON_COURSE_UPDATE, course: res.data });
};
export const addCourse = course => async dispatch => {
    const res = await restAPI.post(adminCoursePath, course);
    dispatch({ type: ADD_COURSE, course: res.data });
};
