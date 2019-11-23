const initialState = {
    deps: null
};

export const ADD_DEP = 'ADD_DEP';
export const DELETE_DEP = 'DELETE_DEP';
export const UPDATE_DEP = 'UPDATE_DEP';
export const SET_DEPS = 'SET_DEPS';

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_DEPS:
            return { ...state, deps: action.deps };
        case ADD_DEP:
            return {
                ...state,
                deps: [...state.deps, action.dep]
            };
        case DELETE_DEP:
            return {
                ...state,
                deps: state.deps.filter(dep => dep.id !== action.id)
            };
        case UPDATE_DEP:
            return {
                ...state,
                deps: state.deps.map(dep =>
                    dep.id === action.dep.id ? { ...dep, ...action.dep } : dep
                )
            };
        default:
            return state;
    }
};
