import { unstable_batchedUpdates } from 'react-dom';

export const createStore = (reducer, initialState = {}) => {
    const store = {
        reducer: null,
        listeners: [],
        state: {},
        dispatch(action) {
            this.state = this.reducer(this.state, action);
            unstable_batchedUpdates(() => {
                for (const listener of this.listeners) {
                    listener();
                }
            });
        }
    };

    // eslint-disable-next-line no-unused-vars
    let { state } = store;
    state = reducer(state, {});
    state = { ...state, ...initialState };
    store.reducer = reducer;

    return store;
};
