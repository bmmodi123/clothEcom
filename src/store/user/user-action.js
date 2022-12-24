import { USER_ACTION_TYPES } from './user-types';
// import { createAction } from '../../utils/reducer/reducer.utils';

export const setCurrentUser = (user) => (
    { 
        type: USER_ACTION_TYPES.SET_CURRENT_USER, 
        payload: user
    }
);

// export const setCurrentUser = (user) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
