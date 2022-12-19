import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
// import { setCategoriesMap } from '../../store/category/category-action';
import { setCategoriesArray } from '../../store/category/category-action';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import './shop.styles.scss';

const Shop = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {

      // const categoryMap = await getCategoriesAndDocuments('categories');
      // dispatch(setCategoriesMap(categoryMap));

      const categoriesArray = await getCategoriesAndDocuments('categories');
      dispatch(setCategoriesArray(categoriesArray));
    };

    getCategoriesMap();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;
