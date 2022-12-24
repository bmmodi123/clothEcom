import { createContext, useState, useEffect } from 'react';

import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils';
import SHOP_DATA from '../shop-data.js'
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  // code to add shop data in firebase store.
  useEffect(() => {
    addCollectionAndDocuments('categories', SHOP_DATA);
  }, []);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log(categoryMap);
      setCategoriesMap(categoryMap);
    };

    getCategoriesMap();
  }, []);

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
