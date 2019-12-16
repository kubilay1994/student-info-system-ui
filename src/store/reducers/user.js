const initialState = {
    role: localStorage.getItem('role'),
    user: null
};

export const SET_USER = 'SET_USER';
export const ADD_STUDENT_SECTIONS = 'ADD_STUDENT_SECTIONS';
export const SET_LAST_USER_ROLE = 'SET_LAST_USER_ROLE';

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LAST_USER_ROLE:
            return {
                ...state,
                role: action.role
            };
        case SET_USER:
            return {
                ...state,
                user: action.user
            };
        case ADD_STUDENT_SECTIONS:
            return {
                ...state,
                user: {
                    ...state.user,
                    studentSections: [
                        ...state.user.studentSections,
                        action.section
                    ]
                }
            };
        default:
            return state;
    }
};
