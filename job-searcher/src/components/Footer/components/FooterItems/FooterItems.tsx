/* eslint-disable no-nested-ternary */

import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import Loader from '../../../Loader/Loader';

const FooterItems = () => {
  const { categories, isLoading } = useSelector((state: RootState) => state.jobCategories);

  return (
    <div>
      <h6 className="footer-title">Categories list </h6>
      {isLoading ? (
        <Loader />
      ) : categories ? (
        <ul>
          {categories.slice(0, 4).map((category) => (
            <li className="footer-items" key={category._id}>{category.name}</li>
          ))}
        </ul>
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
};

export default FooterItems;
