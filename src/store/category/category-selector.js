// here we can create various selectors for different purposes from category array data manipulation.
import { createSelector } from 'reselect';

// using memorization to cache the data using reselect
const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector( 
    [selectCategoryReducer], 
    (categoriesReducer) => categoriesReducer.categoriesArray
);

export const selectCategoriesIsLoading = createSelector( 
    [selectCategoryReducer], 
    (categoriesReducer) => categoriesReducer.isLoading
); 

//generating category map from categoryArray Data using createSelector for caching
export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categoriesArray) => categoriesArray.reduce((acc, Category) => 
    {
        const { title, items } = Category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})
);

//generating category map from data direct from firebase function
// export const selectCategoriesMap = (state) => state.categories.categoriesMap;

//generating category map from categoryArray Data without caching

// export const selectCategoriesMap = (state) => 
//     state.categories.categoriesArray.reduce((acc, Category) => 
//     {
//         const { title, items } = Category;
//         acc[title.toLowerCase()] = items;
//         return acc;
//     }, {});



