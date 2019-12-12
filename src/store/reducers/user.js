const initialState = {
    user: JSON.parse(localStorage.getItem('user'))
};

export const SET_USER = 'SET_USER';
export const UPDATE_STUDENT_SECTIONS = 'UPDATE_STUDENT_SECTIONS'

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user
            };
        case UPDATE_STUDENT_SECTIONS:
            return {
                ...state,
            }
        default:
            return state;
    }
};
