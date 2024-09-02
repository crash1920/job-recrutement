/* eslint-disable @typescript-eslint/no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDesktop, faLocationPinLock, faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../../store/store';
import Loader from '../../../components/Loader/Loader';
import Button from '../../../components/Button/Button';
import { IFeaturedJobs } from '../../../models/home.interfaces';
import { fetchFeaturedJobs } from '../../Home/store/featuredJobsSlice';
import './MainPage.css';
import RightBox from './RightBox';
import Breadcrumbs from '../../../components/Breadcrumb/Breadcrumb';

function MainPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchedData = location.state?.data;
  console.log(searchedData);
  const { featuredJobs, isLoading } = useSelector((state: RootState) => state.featuredJobs);
  useEffect(() => {
    dispatch(fetchFeaturedJobs());
  }, []);

  const [jobQualifications, setJobQualifications] = useState([
    { name: 'Bachelor of Science', selected: false },
    { name: 'Master of Science', selected: false },
    { name: 'PHD', selected: false },
  ]);
  const [jobLevel, setJobLevel] = useState([
    { name: ' Project Manager', selected: false },
    { name: 'Jr. Officer / Sr. officer', selected: false },
    { name: 'Team leader', selected: false },
  ]);
  const [jobSkills, setJobSkills] = useState([
    { name: ' Html5, CSS3, Bootstrap', selected: false },
    { name: 'Javascript', selected: false },
  ]);
  const [jobShift, setJobShift] = useState([
    { name: ' Morning / Afternoon shift', selected: false },
    { name: 'Evening / Night shift', selected: false },
  ]);

  // seperate if else into functions
  function handleCheckboxChangeJobQualif(index: number) {
    const updatedJobQualifications = [...jobQualifications];
    updatedJobQualifications[index].selected = !updatedJobQualifications[index].selected;
    setJobQualifications(updatedJobQualifications);
  }
  function handleCheckboxChangeJobLevel(index: number) {
    const updatedJobLevel = [...jobLevel];
    updatedJobLevel[index].selected = !updatedJobLevel[index].selected;
    setJobLevel(updatedJobLevel);
  }
  function handleCheckboxChangeJobShift(index: number) {
    const updatedJobShift = [...jobShift];
    updatedJobShift[index].selected = !updatedJobShift[index].selected;
    setJobShift(updatedJobShift);
  }
  function handleCheckboxChangeJobSkills(index: number) {
    const updatedJobSkills = [...jobSkills];
    updatedJobSkills[index].selected = !updatedJobSkills[index].selected;
    setJobSkills(updatedJobSkills);
  }

  return (
    <div className="bg-gray-100 ">
      <Breadcrumbs />
      <div className="bg-dirtyWhite py-20 w-full">
        <div className="mx-auto w-4/5 ">
          <div className="grid-container" >
            {/* featured jobs list  */}
            <div className="  w-1/3 ">
              <h5 className="featured-title">Featured Jobs</h5>
              <div className="text-center">
                {isLoading ? (
                  <Loader />
                ) : (
                  featuredJobs?.slice(0, 6).map((job: IFeaturedJobs) => (
                    <div key={job._id} className="box-container box-container-featurepage">
                      <div className=" flex justify-start ml-3 w-1/2 ">
                        <div className="mr-4">
                          <img src={`${process.env.PUBLIC_URL}/assets/logo/${job.logo}`} className="w-11 max-w-full" />
                        </div>
                        <div className="flex flex-col items-start ">
                          <h6 className="text-darkBlue">{job.jobTitle} </h6>
                          <ul className="flex flex-row mt-2">
                            <li className="location"><FontAwesomeIcon className="mr-2" icon={faLocationPinLock} />{job.city}</li>
                            <li className="location"><FontAwesomeIcon className="mr-2" icon={faDesktop} />{job.jobCategory}</li>
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
            <div className="max-w-full">
              {/* search bar */}
              <div className="right-box-container">
                <h5 className="featured-title" > Search by keywords</h5>
                <form className="relative">
                  <input type="search" placeholder="search here " aria-label="email" />
                  <Button customClassName="search-by-keyword-button" onClick={() => alert('click')} ><FontAwesomeIcon icon={faSearch} /></Button>
                </form>
              </div>
              {/* Job qualifications */}
              <RightBox jobQualifications={jobQualifications}
                handleCheckboxChange={handleCheckboxChangeJobQualif}
                title="Job Qualifications"></RightBox>
              {/* Job level */}
              <RightBox jobQualifications={jobLevel}
                handleCheckboxChange={handleCheckboxChangeJobLevel}
                title="Job Level"></RightBox>
              {/* Job shift */}
              <RightBox jobQualifications={jobShift}
                handleCheckboxChange={handleCheckboxChangeJobShift}
                title="Job Shift"></RightBox>
              {/* Job skills */}
              <RightBox jobQualifications={jobSkills}
                handleCheckboxChange={handleCheckboxChangeJobSkills}
                title="Job Skills"></RightBox>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default MainPage;
