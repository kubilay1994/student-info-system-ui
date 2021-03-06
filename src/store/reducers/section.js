const initialState = {
    sections: []
};

export const SET_SECTIONS = 'SET_SECTIONS';
export const DELETE_SECTION = 'DELETE_SECTION';
export const UPDATE_SECTION = 'UPDATE_SECTION';
export const ADD_SECTION = 'ADD_SECTION';
export const ON_COURSE_UPDATE = 'ON_COURSE_UPDATE';

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SECTIONS:
            return { ...state, sections: action.sections };
        case ADD_SECTION:
            return { ...state, sections: [...state.sections, action.section] };
        case DELETE_SECTION:
            return {
                ...state,
                sections: state.sections.filter(s => s.id !== action.id)
            };
        case UPDATE_SECTION:
            return {
                ...state,
                sections: state.sections.map(s =>
                    s.id === action.section.id ? { ...s, ...action.section } : s
                )
            };
        case ON_COURSE_UPDATE:
            return {
                ...state,
                sections: state.sections.map(s =>
                    s.course.id === action.course.id
                        ? { ...s, course: action.course }
                        : s
                )
            };
        default:
            return state;
    }
};
