import {
    ADD_SECTION,
    DELETE_SECTION,
    UPDATE_SECTION,
    SET_SECTIONS
} from '../reducers/section';
import restAPI from '../../axios-instances';

const adminSectionPath = '/api/rest/admin/sections';

export const fetchAllSections = () => async dispatch => {
    try {
        const res = await restAPI.get(adminSectionPath);
        dispatch({ type: SET_SECTIONS, sections: res.data });
    } catch (error) {
        console.log(error.message);
    }
};

export const addSection = section => async dispatch => {
    const res = await restAPI.post(adminSectionPath, section);
    dispatch({ type: ADD_SECTION, section });
};

export const updateSection = section => async dispatch => {
    try {
        const res = await restAPI.put(
            `${adminSectionPath}/${section.id}`,
            section
        );
        dispatch({ type: UPDATE_SECTION, section });
    } catch (error) {
        console.log(error);
    }
};

export const deleteSection = id => async dispatch => {
    try {
        await restAPI.delete(`${adminSectionPath}/${id}`);
        dispatch({ type: DELETE_SECTION, id });
    } catch (error) {
        console.log(error.message);
        console.log(error.request);
        console.log(error.response);
    }
};
