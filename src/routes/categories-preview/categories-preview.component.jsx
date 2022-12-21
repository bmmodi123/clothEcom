import { Fragment } from 'react';
// import { useContext } from 'react';

import { useSelector } from 'react-redux';
import {selectCategoriesMap , selectCategoriesIsLoading} from '../../store/category/category-selector';
import spinner from '../../components/spinner/spinner.component';


// import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
  // const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <Fragment>
    {
      isLoading? spinner() : 
      (Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
            return (
              <CategoryPreview key={title} title={title} products={products} />
            );
          })
      )
    };

    </Fragment>
  );
};

export default CategoriesPreview;
