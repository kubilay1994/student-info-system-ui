import { SET_USER } from '../reducers/user';

export const setUser = user => ({
    type: SET_USER,
    user
});
