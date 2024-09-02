/* eslint-disable @typescript-eslint/no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faLocationPinLock } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Button from '../../../../components/Button/Button';
import './FeaturedJobs.css';
import { fetchFeaturedJobs } from '../../store/featuredJobsSlice';
import { RootState } from '../../../../store/store';
import Loader from '../../../../components/Loader/Loader';
import { IFeaturedJobs } from '../../../../models/home.interfaces';

function FeaturedJobs() {
  const dispatch = useDispatch();

  const { featuredJobs, isLoading } = useSelector((state: RootState) => state.featuredJobs);
  useEffect(() => {
    dispatch(fetchFeaturedJobs());
  }, []);
  return (
    <section>
      <div className="py-20 bg-dirtyWhite" >
        <h3 className="featured-jobs-title text-darkBlue">
          Featured Jobs
        </h3>
        <div className="flex justify-center  min-w-full">
          <div className="text-center">
            <Button onClick={() => alert('clicked')} customClassName="recent-jobs-button" >recent jobs</Button>
            <Button onClick={() => alert('clicked')} customClassName="updated-jobs-button" >updated jobs</Button>
            {isLoading ? (
              <Loader />
            ) : (
              featuredJobs?.map((job: IFeaturedJobs) => (
                <div key={job._id} className="box-container ">
                  <div className=" flex justify-start ml-3 w-1/2 ">
                    <div className="mr-4">
                      <img src={`${process.env.PUBLIC_URL}/assets/logo/${job.logo}`} className="w-11 max-w-full" />
                    </div>
                    <div className="flex flex-col items-start ">
                      <h6 className="text-darkBlue">{job.jobTitle} </h6>
                      <ul className="flex flex-row mt-2">
                        <li className="location"><FontAwesomeIcon className="mr-2" icon={faLocationPinLock} />{job.city}</li>
                        <li className="location"><FontAwesomeIcon className="mr-2" icon={faDesktop} />{job?.jobCategory}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center text-left  w-1/4  ">
                    <p className="mb-2"><span className=" font-bold">Type:</span>{job.type}</p>
                    <p className="mb-2"><span className=" font-bold">Time :</span>{job.time}</p>
                  </div>
                  <div className="flex items-end justify-end  w-1/4 ">
                    <a href={`/featuredJobs/${job._id}`} >
                      <Button customClassName="apply-now-button" >View job details</Button>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedJobs;
