const initialState = {
    classrooms: []
};

export const SET_DEPCLASSROOMS = 'SET_DEPCLASSROOMS';
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_DEPCLASSROOMS:
            return {
                ...state,
                classrooms: action.classrooms
            };

        default:
            return state;
    }
};
