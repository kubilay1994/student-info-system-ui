import restAPI from '../../axios-instances';

import {
    ADD_DEP,
    DELETE_DEP,
    UPDATE_DEP,
    SET_DEPS
} from '../reducers/department';

export const addDepartment = (title, departmentCode) => async dispatch => {
    const res = await restAPI.post('/api/rest/admin/departments', {
        title,
        departmentCode
    });
    dispatch({ type: ADD_DEP, dep: res.data });
};

export const updateDep = dep => async dispatch => {
    const { id, title, departmentCode } = dep;
    const res = await restAPI.put(`/api/rest/admin/departments/${id}`, {
        title,
        departmentCode
    });
    dispatch({ type: UPDATE_DEP, dep: res.data });
};

export const deleteDep = id => async dispatch => {
    try {
        await restAPI.delete(`/api/rest/admin/departments/${id}`);
        dispatch({ type: DELETE_DEP, id });
    } catch (error) {
        console.log(error.message);
    }
};

export const fetchDeps = () => async dispatch => {
    try {
        const res = await restAPI.get('/api/rest/admin/departments');
        dispatch({ type: SET_DEPS, deps: res.data });
    } catch (error) {
        console.log(error.message);
    }
};
