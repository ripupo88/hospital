import { types } from '../types/types';

export const myLogout = (dispatch, history) => {
    localStorage.removeItem('user');
    dispatch({ type: types.logout });
    history.push('/login');
};
