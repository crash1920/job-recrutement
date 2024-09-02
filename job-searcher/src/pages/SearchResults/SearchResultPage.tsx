/* eslint-disable @typescript-eslint/no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faLocationPinLock, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../store/store';
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumb';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';

function SearchResultPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchedData = location.state?.data;
  const searchResultCount = searchedData ? searchedData.length : 0;
  const { featuredJobs, isLoading } = useSelector((state: RootState) => state.featuredJobs);

  return (
    <div className="bg-gray-100 ">
      <Breadcrumbs />
      <div className="bg-dirtyWhite py-20 w-full">
        <div className="mx-auto w-4/5  ">
          <div className="  flex items-center flex-col">
            {/* featured jobs list  */}
            <div className="w-full">
              <h5 className="featured-title"> {searchedData && ` ${searchResultCount}`} Job offer  found</h5>
              <div className="text-center">
                {isLoading ? (
                  <Loader />
                ) : (
                  searchedData?.map((job) => (
                    <div key={job._id} className="box-container box-container-featurepage">
                      <div className="flex justify-start ml-3 w-1/2">
                        <div className="mr-4">
                          <img src={`${process.env.PUBLIC_URL}/assets/logo/${job.logo}`} className="w-11 max-w-full" />
                        </div>
                        <div className="flex flex-col items-start">
                          <h6 className="text-darkBlue">{job.jobTitle}</h6>
                          <ul className="flex flex-row mt-2">
                            <li className="location">
                              <FontAwesomeIcon className="mr-2" icon={faLocationPinLock} />
                              {job.city}
                            </li>
                            <li className="location">
                              <FontAwesomeIcon className="mr-2" icon={faDesktop} />
                              {job.jobCategory}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center text-left  w-1/4">
                        <p className="mb-2">
                          <span className="font-bold">Type:</span>
                          {job.type}
                        </p>
                        <p className="mb-2">
                          <span className="font-bold">Time :</span>
                          {job.time}
                        </p>
                      </div>
                      <div className="flex items-end justify-end  w-1/4">
                        <a href={`/featuredJobs/${job._id}`}>
                          <Button customClassName="apply-now-button">View job details</Button>
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResultPage;
