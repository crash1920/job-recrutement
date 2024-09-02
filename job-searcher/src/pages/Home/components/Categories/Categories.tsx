/* eslint-disable no-nested-ternary */
import './Categories.css';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { ICategory } from '../../../../models/home.interfaces';

import {
  fetchJobCategories,
} from '../../store/jobCategoriesSlice';
import { RootState } from '../../../../store/store';
import Loader from '../../../../components/Loader/Loader';

function Categories() {
  const dispatch = useDispatch();
  const { categories, isLoading } = useSelector((state: RootState) => state.jobCategories);

  useEffect(() => {
    dispatch(fetchJobCategories());
  }, []);

  return (
    <section>
      <div className="py-16 px-16">
        <h3 className="title-categories">Explore Categories</h3>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="block mx-auto w-3/4">
            <div className="grid grid-cols-5 gap-5 ">
              {(categories?.map((item: ICategory) => (
                <div className="category" key={item._id}>
                  <a>{item.name} </a>
                  <p>{item.openings} openings</p>
                  <span className="icon-position">
                    <FontAwesomeIcon className="icon" icon={faLaptop} />
                  </span>
                </div>
              ))
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Categories;
