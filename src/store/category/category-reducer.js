import { CATEGORIES_ACTION_TYPES } from './category-types';

const InitialState = {
    categoriesMap: {}, 
    categoriesArray: [],
}

export const categoriesReducer = (state = InitialState, action={}) => {
    const { type, payload } = action;

    switch (type) {
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
            return {
                ...state, // keep the existing state and then override the currentUser
                categoriesMap: payload,
            };

        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_ARRAY:
            return {
                ...state, // keep the existing state and then override the currentUser
                categoriesArray: payload,
            };
        default:
        return state;
    }
}