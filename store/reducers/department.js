const initialState = {
    departments : [],
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case 'asd':
        return { ...state, ...payload }

    default:
        return state
    }
}
