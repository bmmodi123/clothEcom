import { USER_ACTION_TYPES } from './user-types';

const InitialState = {
    currentUser: null,
}

export const userReducer = (state = InitialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
        return {
            ...state, // keep the existing state and then override the currentUser
            currentUser: payload,
        };
        default:
        return state;
    }
}
  
