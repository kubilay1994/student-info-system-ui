import {
    SET_LAST_USER_ROLE,
    SET_USER,
    ADD_STUDENT_SECTIONS
} from '../reducers/user';

import restAPI from '../../axios-instances';

export const setRole = role => ({
    type: SET_LAST_USER_ROLE,
    role
});

export const setUser = user => ({
    type: SET_USER,
    user
});

export const addStudentSections = section => ({
    type: ADD_STUDENT_SECTIONS,
    section
});

export const fetchUserInfoAndSet = role => async dispatch => {
    let url = '';
    if (role === 'Student') {
        url = '/api/rest/student/credentials';
    } else if (role === 'Instructor') {
        url = '/api/rest/student/credentials';
    } else if (role === 'Admin') {
        return dispatch(setUser({}));
    }

    const res = await restAPI.get(url);
    dispatch(setUser(res.data));
};
