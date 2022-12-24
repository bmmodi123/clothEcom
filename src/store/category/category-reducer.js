import { CATEGORIES_ACTION_TYPES } from './category-types';

const InitialState = {
    categoriesArray: [],
    isLoading : false,
    error: null
}

export const categoriesReducer = (state = InitialState, action={}) => {
    const { type, payload } = action;

    switch (type) {

        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
            return {
                ...state, // keep the existing state and then override the currentUser
                isLoading: true,
            };

        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state, // keep the existing state and then override the currentUser
                categoriesArray: payload,
                isLoading: false,
            };

        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
            return {
                ...state, // keep the existing state and then override the currentUser
                error: payload,
            };
        default:
        return state;
    }
}