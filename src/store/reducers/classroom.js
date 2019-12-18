const initialState = {
    classrooms: [],
    instructors: []
};

export const SET_DEPCLASSROOMS = 'SET_DEPCLASSROOMS';
export const SET_INSTRUCTORS = 'SET_INSTRUCTORS';
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_DEPCLASSROOMS:
            return {
                ...state,
                classrooms: action.classrooms
            };
        case SET_INSTRUCTORS:
            return {
                ...state,
                instructors: action.instructors
            };
        default:
            return state;
    }
};
