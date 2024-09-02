/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import Button from '../../../../../components/Button/Button';
import { ICategory, ICountry } from '../../../../../models/home.interfaces';
import './SearchBar.css';

interface Props {
  onSearch: (
    jobCategory: ICategory['name'],
    country: ICountry['countryName'],
    searchTerm: string
  ) => void;
  jobCategories: ICategory[] | null;
  countries: ICountry[] | null;
}

const SearchBar: React.FC<Props> = ({ onSearch, jobCategories, countries }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobCategory, setSelectedJobCategory] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchTerm(event.target.value);
  };
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedJobCategory(event.target.value);
  };
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  const handleSearch = () => {
    onSearch(selectedJobCategory, selectedCountry, searchTerm);
  };

  return (
    <div className="flex justify-center mt-4 bg-slate-300 rounded-xl  w-full">
      <div className="flex items-center content-between w-full ">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearchTermChange}
          className="search-input"
        />
        <select
          value={selectedJobCategory}
          onChange={handleCategoryChange}
          className="custom-select"
        > <option value="">Select job category</option>
          {jobCategories?.map((option) => (
            <option key={option._id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
        <select
          value={selectedCountry}
          onChange={handleCountryChange}
          className="custom-select"
        >
          <option value="">Select country</option>
          {countries?.map((option) => (
            <option key={option._id}>{option.countryName}</option>
          ))}
        </select>

        <Button customClassName="text-white-standard text-sm font-medium w-1/5 h-full
        bg-red-10 hover:bg-red-900" onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
