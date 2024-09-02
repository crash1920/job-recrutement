/* eslint-disable @typescript-eslint/no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import './CandidatesList.css';
import { faFacebookSquare, faGithubSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Button from '../../../components/Button/Button';
import { fetchCandidates } from '../store/CandidatesSlice';
import { ICandidates } from '../../../models/candidates.interfaces';
import Loader from '../../../components/Loader/Loader';
import { RootState } from '../../../store/store';
import Breadcrumbs from '../../../components/Breadcrumb/Breadcrumb';

function CandidatesList() {
  const { candidates, isLoading } = useSelector((state: RootState) => state.candidates);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCandidates());
  }, []);
  console.log(candidates);

  return (
    <div className="bg-gray-100 ">
      <Breadcrumbs />
      <div className="bg-white-standard py-20 w-full">
        <div className="mx-auto w-3/4 ">
          <h3 className="title-categories">Our Candidates</h3>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-4 gap-5 text-center" >
              {candidates?.map((candidate: ICandidates) => (
                <div className="candidate-card w-full" key={candidate._id}>
                  <div className="flex items-center flex-col w-full">
                    <div className="flex items-center">
                      <img src={`${process.env.PUBLIC_URL}/assets/candidates/${candidate.photoCandidate}`} className="rounded-full" />
                    </div>
                    <div className="mt-5 text-center items-center w-full">
                      <h5 className="leading-6 text-lg text-black-standard font-semibold w-full" >
                        {candidate.firstName} {candidate.lastName}
                      </h5>
                      <p className="text-base leading-6 text-gray-dark mt-1 w-full">
                        {candidate.jobTitle}
                      </p>
                      <p className="location flex items-center mt-5 mb-4 w-full ">
                        <FontAwesomeIcon className="mr-2" icon={faLocationDot} />
                        {candidate.customFields[0].birthCity[0].value} </p>
                      <a href={`/Candidates/${candidate._id}`} >
                        <Button customClassName="view-profile-button" >
                          View profile
                        </Button>
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 w-full">
                    <a href={candidate.facebookLink} className="social-grid-column text-blue-facebook">
                      <FontAwesomeIcon icon={faFacebookSquare} />
                    </a>
                    <a href={candidate.twitterLink} className="social-grid-column text-blue-twitter">
                      <FontAwesomeIcon icon={faTwitterSquare} />
                    </a>
                    <a href={candidate.githubLink} className="social-grid-column">
                      <FontAwesomeIcon icon={faGithubSquare} />
                    </a>
                  </div>
                </div>
              ))}

            </div>
          )}
        </div>
      </div>
    </div >
  );
}

export default CandidatesList;
