import restAPI from '../../axios-instances';
import { SET_DEPCLASSROOMS } from '../reducers/classroom';

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
