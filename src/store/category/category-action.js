import { CATEGORIES_ACTION_TYPES } from './category-types';

export const setCategoriesMap = (categoriesMap) => (
    { 
        type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, 
        payload: categoriesMap
    }
);

export const setCategoriesArray = (categoriesArray) => (
    { 
        type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES_ARRAY, 
        payload: categoriesArray
    }
);
