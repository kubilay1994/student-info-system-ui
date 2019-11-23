export const combineReducers = reducers => {
    return (state, action) => {
        for (const key in reducers) {
            state[key] = reducers[key](state[key], action);
        }
        return { ...state };
    };
};

export const shallowEqual = (oA, oB) => {
    if (oA === oB) {
        return true;
    }
    if (!oA || !oB) {
        return false;
    }

    for (const key in oA) {
        if (oA[key] !== oB[key]) {
            return false;
        }
    }
    return true;
};

