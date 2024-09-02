/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import { postJob } from '../store/jobPostSlice';

function RecapPage({ formData, onPrevious }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleConfirmation = async () => {
    try {
      const response = await dispatch(postJob(formData));

      if (response.payload) {
        alert('Successfully submitted!');
        navigate('/Success', { state: { message: 'You successfully created a job offer' } });
        window.scrollTo(0, 0);
      } else {
        alert('Failed to submit the job offer. Please try again.');
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };
  const [isContentOpen, setContentOpen] = useState(false);
  const [isJobInfoOpen, setJobInfoOpen] = useState(false);
  const [isJobCharacteristicOpen, setJobCharacteristicOpen] = useState(false);
  const [isSkillsOpen, setSkillsOpen] = useState(false);
  console.log({ formData });

  return (
    <div className='w-3/4 flex items-center flex-col bg-dirtyWhite'>
      <h2 className="text-2xl font-bold mb-4 text-red-700">Confirm Your Application</h2>
      {formData.photoPreview && <img className=" max-w-[60px] max-h-[60px]" src={formData.photoPreview} alt="Selected" />}
      <div className="grid grid-cols-2  gap-6 w-[100%]">
        <div className="border p-4 bg-white rounded-lg shadow">
          <div className='flex items-center justify-between'>
            <h3
              className="text-lg font-bold mb-2 text-red-700 cursor-pointer "
              onClick={() => setJobCharacteristicOpen(!isJobCharacteristicOpen)}
            >
              Job Characteristic
            </h3>
            <div className='flex justify-end cursor-pointer'>
              <FontAwesomeIcon icon={!isJobCharacteristicOpen
                ? faChevronDown : faChevronUp}
                onClick={() => setJobCharacteristicOpen(!isJobCharacteristicOpen)} />
            </div>
          </div>
          <Collapse isOpened={isJobCharacteristicOpen}>
            <div className="mb-4">
              <h4 className="text-lg font-bold mb-2">Job Title</h4>
              <p>{formData.jobTitle}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-bold mb-2">City</h4>
              <p>{formData.city}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-bold mb-2">Job Category</h4>
              <p>{formData.jobCategory}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-bold mb-2">Type</h4>
              <p>{formData.type}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-bold mb-2">Date of Publication</h4>
              <p>{formData.time}</p>
            </div>
          </Collapse>
        </div>
        <div className="border p-4 bg-white rounded-lg shadow">
          <div className='flex items-center justify-between'>
            <h3
              className="text-lg font-bold mb-2 text-red-700 cursor-pointer "
              onClick={() => setContentOpen(!isContentOpen)}
            >
              Job Description
            </h3>
            <div className='flex justify-end cursor-pointer'>
              <FontAwesomeIcon icon={!isContentOpen
                ? faChevronDown : faChevronUp} onClick={() => setContentOpen(!isContentOpen)} />
            </div>
          </div>
          <Collapse isOpened={isContentOpen}>
            <div className="mb-4">
              <h4 className="text-lg font-bold mb-2">Criteria</h4>
              <ol>
                {formData.Criteria?.map((criteria, index) => (
                  <li key={index}>
                    <span>&#8226; </span>
                    {criteria.value}
                  </li>
                ))}
              </ol>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-bold mb-2">Responsibilities</h4>
              <ol>
                {formData.Responsibilities?.map((responsibility, index) => (
                  <li key={index}>
                    <span>&#8226; </span>
                    {responsibility.value}
                  </li>
                ))}
              </ol>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-bold mb-2">Job Description</h4>
              <p>{formData.jobDescription}</p>
            </div>
          </Collapse>
        </div>
        <div className="border p-4 bg-white rounded-lg shadow">
          <div className='flex items-center justify-between'>
            <h3
              className="text-lg font-bold mb-2 text-red-700 cursor-pointer "
              onClick={() => setJobInfoOpen(!isJobInfoOpen)}
            >
              Job Information
            </h3>
            <div className='flex justify-end cursor-pointer'>
              <FontAwesomeIcon icon={!isJobInfoOpen
                ? faChevronDown : faChevronUp} onClick={() => setJobInfoOpen(!isJobInfoOpen)} />
            </div>
          </div>
          <Collapse isOpened={isJobInfoOpen}>
            <div className="mb-4">
              <h4 className="text-lg font-bold mb-2">No. of Openings</h4>
              <p>{formData.openings}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-bold mb-2">Job Level</h4>
              <p>{formData.jobLevel}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-bold mb-2">Job Experience</h4>
              <p>{formData.jobXp}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-bold mb-2">Work Shift</h4>
              <p>{formData.workShift}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-bold mb-2">Remote Work</h4>
              <p>{formData.remote}</p>
            </div>
          </Collapse>
        </div>
        <div className="border p-4 bg-white rounded-lg shadow">
          <div className='flex items-center justify-between'>
            <h3
              className="text-lg font-bold mb-2 text-red-700 cursor-pointer"
              onClick={() => setSkillsOpen(!isSkillsOpen)}
            >
              Skills
            </h3>
            <div className='flex justify-end cursor-pointer'>
              <FontAwesomeIcon icon={!isSkillsOpen ? faChevronDown : faChevronUp}
                onClick={() => setSkillsOpen(!isSkillsOpen)}></FontAwesomeIcon>
            </div>
          </div>
          <Collapse isOpened={isSkillsOpen}>
            {formData.skills?.map((skill, index) => (
              <div key={index} className="mb-4">
                <p className="mb-2">
                  <span className="font-bold">Skill name:</span>{' '}
                  <span className="text-green-700">{skill.title}</span>
                </p>
              </div>
            ))}
          </Collapse>
        </div>
      </div>
      <div className='w-full flex justify-between mt-8'>
        <Button onClick={onPrevious}>Previous</Button>
        <Button onClick={handleConfirmation}>Confirm</Button>
      </div>
    </div>
  );
}

export default RecapPage;
