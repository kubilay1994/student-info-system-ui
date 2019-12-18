import restAPI from '../../axios-instances';
import { SET_DEPCLASSROOMS, SET_INSTRUCTORS } from '../reducers/classroom';

export const fetchDepClassrooms = () => async dispatch => {
    try {
        const res = await restAPI.get(`/api/rest/admin/classrooms`);
        dispatch({
            type: SET_DEPCLASSROOMS,
            classrooms: res.data
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const fetchDepInstructors = () => async dispatch => {
    try {
        const res = await restAPI.get('/api/rest/common/instructors');
        dispatch({ type: SET_INSTRUCTORS, instructors: res.data });
    } catch (error) {
        console.log(error.response);
    }
};
