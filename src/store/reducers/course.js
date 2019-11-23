const initialState = {
    courses: []
};

export const SET_COURSES = 'SET_COURSES';
export const ADD_COURSE = 'ADD_COURSE';

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_COURSES:
            return { ...state, courses: action.courses };
        case ADD_COURSE:
            return { ...state, courses: [...state.courses, action.course] };
        default:
            return state;
    }
};
