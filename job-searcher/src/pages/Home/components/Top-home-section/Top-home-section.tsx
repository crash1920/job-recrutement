/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ICategory, ICountry } from '../../../../models/home.interfaces';
import { RootState } from '../../../../store/store';
import Categories from '../Categories/Categories';
import SearchBar from './SearchBar/SearchBar';
import './Top-home-section.css';
import { fetchCountries } from '../../store/countriesSlice';
import Loader from '../../../../components/Loader/Loader';
import { fetchFilteredJobs } from './SearchBar/store/searchSlice';

function TopHomeSection() {
  const { categories, isLoading } = useSelector(
    (state: RootState) => state.jobCategories,
  );
  const { countries } = useSelector((state: RootState) => state.countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  const handleSearch = async (
    jobCategory: ICategory['name'],
    country: ICountry['countryName'],
    searchTerm: string,
  ) => {
    const result = await dispatch(
      fetchFilteredJobs({
        jobCategoryFilter: jobCategory,
        countryFilter: country,
        searchTerm,
      }),
    );
    navigate('/SearchResult', { state: { data: result.payload } });
  };

  return (
    <div>
      <div className="backgroundimage-container bg-banner">
        <div className="flex flex-col">
          <h2 className="text-5xl font-light text-white-standard">
            Starting from your Dream Jobs
          </h2>
          <span className="subtitle">
            High Performance Job board Html Responsive Theme
          </span>
          {isLoading ? (
            <Loader />
          ) : categories ? (
            <SearchBar
              jobCategories={categories}
              countries={countries}
              onSearch={handleSearch}
            />
          ) : (
            <p>No categories found.</p>
          )}
        </div>
      </div>
      <Categories />
    </div>
  );
}

export default TopHomeSection;
