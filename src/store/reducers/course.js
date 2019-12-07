const initialState = {
    courses: []
};

export const SET_COURSES = 'SET_COURSES';
export const ADD_COURSE = 'ADD_COURSE';
export const DELETE_COURSE = 'DELETE_COURSE';
export const UPDATE_COURSE = 'UPDATE_COURSE';
export const SET_COURSE_SECTIONS = 'SET_COURSE_SECTIONS';

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_COURSES:
            return { ...state, courses: action.courses };
        case ADD_COURSE:
            return { ...state, courses: [...state.courses, action.course] };
        case DELETE_COURSE:
            return {
                ...state,
                courses: state.courses.filter(course => course.id !== action.id)
            };
        case UPDATE_COURSE:
            return {
                ...state,
                courses: state.courses.map(c =>
                    c.id === action.course.id ? { ...c, ...action.course } : c
                )
            };
        case SET_COURSE_SECTIONS:
            return {
                ...state,
                courses: state.courses.map(c =>
                    c.id === action.courseId
                        ? { ...c, sections: action.sections }
                        : c
                )
            };
        default:
            return state;
    }
};
