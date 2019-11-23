import { SET_COURSES, ADD_COURSE } from '../reducers/course';
import restAPI from '../../axios-instances';

export const fetchCourses = () => async dispatch => {
    try {
        const res = await restAPI.get('/api/rest/admin/courses');
        dispatch({ type: SET_COURSES, courses: res.data });
    } catch (error) {
        console.log(error.message);
    }
};

export const addCourse = course => async dispatch => {
    // res data should return new added course
    const res = await restAPI.post('/api/rest/admin/courses', course);
    dispatch({ type: ADD_COURSE, course });
};
