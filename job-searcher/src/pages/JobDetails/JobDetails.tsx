import { faFacebookSquare, faLinkedin, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowRight,
  faCheckSquare,
  faClock, faClockFour, faDollarSign, faHandPointRight,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Button from '../../components/Button/Button';
import { IField } from '../../models/home.interfaces';

import { RootState } from '../../store/store';
import './JobDetails.css';
import { fetchJobById } from './store/jobDetailsSlice';

function JobDetails() {
  const { id } = useParams();
  const { job } = useSelector((state: RootState) => state.jobDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const connected = localStorage.getItem('token');
  const userIsConnected = !!connected;
  const loggedInUser = connected ? JSON.parse(connected).user : null;
  const loggedInUserRole = loggedInUser ? loggedInUser.role : null;

  const handleApplyNow = () => {
    if (userIsConnected) {
      if (job && job._id) {
        navigate('/ApplyJobForm', { state: { jobId: job._id, jobTitle: job.jobTitle } });
      } else {
        console.log('Job ID not available.');
      }
    } else {
      navigate('/Login', { state: { pathname: '/ApplyJobForm', jobId: job?._id, jobTitle: job?.jobTitle } });
    }
  };

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      localStorage.setItem('token', JSON.stringify({ user: decoded, token }));
    }

    dispatch(fetchJobById(id));
  }, [token, dispatch]);

  return (
    <div >
      <section className="backgroundimage-container candidate-banner  bg-jobDetailBanner ">
        <div className="wrapper w-3/4 mx-auto flex flex-row gap-5 pt-52 pb-5 items-center justify-between  ">
          <div className="job-title flex flex-row gap-5 items-center  ">
            <div className="">
              <div className="mb-3">
                <label>job opening</label>
              </div>
              <div className="flex flex-col ">
                <h3 className="text-white-standard text-2xl leading-9 font-bold  mb-4">{job?.jobTitle},SQLI
                </h3>
                <ul className="ul-container flex flex-row gap-4">
                  <li><FontAwesomeIcon icon={faLocationDot} />London</li>
                  <li>
                    <FontAwesomeIcon icon={faHandPointRight} />
                    {job?.jobInformation[0]?.workShift[0]?.value}
                  </li>

                  <li ><FontAwesomeIcon icon={faClock} />added
                    <FontAwesomeIcon icon={faArrowRight} className='ml-2' /> {job?.time}</li>
                  <li ><FontAwesomeIcon icon={faDollarSign} />{job?.salaryRange}$/ monthly</li>
                </ul>
              </div>
            </div>

          </div>
          <div className=" flex pt-9 gap-5 items-center ">
            {loggedInUserRole !== 'RH' ? (
              <div className="flex flex-col items-center   ">

                <Button onClick={handleApplyNow} customClassName="apply-job-button w-full mb-3 " >
                  Apply now</Button>
                <Button customClassName="apply-linkedin-button  w-full" >  <FontAwesomeIcon icon={faLinkedin} className="mr-2" />Apply with linkedin</Button>

              </div>
            ) : (<div></div>)}
          </div>
        </div>

      </section>
      <div className="body-page  py-28 bg-dirtyWhite ">
        <div className="body-wrapper  mx-auto w-3/4">
          {/*         left boxes  */}
          <div className="boxes-container flex items-start gap-5">
            <div className="left-boxes-container flex flex-col w-[70%]">
              <div className="box mb-5  bg-white-standard p-8  shadow-2xl">

                <h5 className="featured-title">
                  Job information
                </h5>
                <div className="box-list grid grid-cols-3 gap-5">
                  {job?.jobInformation.map((field, index) => (
                    Object.entries(field).map(([key, values]) => (
                      values.map((value: IField, idx: number) => (
                        <div className="flex items-center gap-5" key={`${index}_${key}_${idx}`}>
                          <div className="flex mb-6 text-red-600">
                            <FontAwesomeIcon icon={faCheckSquare} />
                          </div>
                          <div className="flex flex-col items-start">
                            <h4 className="font-medium text-base">{value.label}</h4>
                            <span className="location">{value.value}</span>
                          </div>
                        </div>
                      ))
                    ))
                  ))}
                </div>

              </div>
              <div className="box mb-5 bg-white-standard p-8 shadow-2xl">
                <h5 className="featured-title">Job Description</h5>
                <div className="mt-3">
                  <p>
                    {job?.jobDescription}
                  </p>
                  <div className="my-5">
                    <h5 className="featured-title">Responsibilities:</h5>
                    <ul className="responsibilities-list list-disc ml-8">
                      {job?.responsibilities.map((item, index) => (
                        <li key={index}>
                          <p>{item.value}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="my-5">
                    <h5 className="featured-title">What We Are Looking For:</h5>
                    <ul className="responsibilities-list list-disc ml-8">
                      {job?.criteria.map((item, index) => (
                        <li key={index}>
                          <p>{item.value}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="my-8">
                    <h5 className="featured-title">Share This Job</h5>
                    <div className="flex flex-row gap-1">
                      <a className="  relative  text-3xl  text-blue-facebook">
                        <FontAwesomeIcon icon={faFacebookSquare} />
                      </a>
                      <a className="text-3xl relative  text-blue-twitter">
                        <FontAwesomeIcon icon={faTwitterSquare} />
                      </a>
                      <a className=" social-candidate-icon relative text-3xl  text-blue-linkedin">
                        <FontAwesomeIcon icon={faLinkedin} />
                      </a>
                    </div>
                  </div>
                </div>

              </div>

              <div className="box mb-5 bg-white-standard p-8 shadow-2xl">
                <h5 className="featured-title">Job Skills</h5>
                <div className=" flex flex-row gap-3">
                  {job?.jobSkills.map((skill) => (
                    <div className=" flex items-center" key={skill._id}>
                      <div className="skill-requirement">{skill.title}</div>

                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/*         right  boxes  */}
            <div className="right-boxes-container flex flex-col w-[30%] ">
              <div className="box mb-5  p-5 rounded bg-blue-lightBlue ">
                <div className="flex items-center row gap-2 ">
                  <div className='text-4xl'>
                    <FontAwesomeIcon icon={faClockFour} className="w-full text-white-standard"></FontAwesomeIcon>
                  </div>
                  <div className="flex flex-col text-white-standard p-1 ">
                    <span>Deadline</span>
                    <span className="font-bold text-lg">December 31, 2019</span>
                  </div>

                </div>
              </div>
              <div className="">
                <Button customClassName="apply-job-button w-full mb-3 " >Save  this job</Button>
                <Button customClassName="recent-jobs-button w-full mb-3 " >Email this job</Button>

              </div>
              <div className="box mb-5  bg-white-standard p-8  shadow-2xl">
                <h5 className="featured-title">
                  advertisement
                </h5>

              </div>
              <div className="box mb-5  bg-white-standard p-8  shadow-2xl">
                <h5 className="featured-title">
                  Job Tags
                </h5>
                <div className=" grid   w-full">
                  {job?.jobSkills.map((skill) => (
                    <div className=" flex items-center" key={skill._id}>
                      <div className="skill-requirement">#{skill.title}</div>

                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
