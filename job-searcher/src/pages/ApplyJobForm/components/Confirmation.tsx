/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Collapse } from 'react-collapse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import { applyJob } from '../store/ApplyJobSlice';

function Confirmation({ formData, onPrevious }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleConfirmation = async () => {
    try {
      const response = await dispatch(applyJob(formData));

      if (response.payload) {
        alert('Successfully submitted!');
        navigate('/Success', { state: { message: 'You successfully applied to the job offer' } });
        window.scrollTo(0, 0);
      } else {
        alert('Failed to submit the application. Please try again.');
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };
  const [isPersonalInfoOpen, setPersonalInfoOpen] = useState(false);
  const [isSkillsOpen, setSkillsOpen] = useState(false);
  const [isEducationOpen, setEducationOpen] = useState(false);
  const [isJobExpOpen, setJobExpOpen] = useState(false);
  const [isCertifOpen, setCertifOpen] = useState(false);
  const [isLanguagesOpen, setLanguagesOpen] = useState(false);
  console.log(formData);

  return (
    <div className='w-3/4 flex items-center flex-col bg-dirtyWhite'>
      <h2 className="text-2xl font-bold mb-4 text-red-700">Confirm Your Application</h2>
      {formData.photoPreview && <img className="rounded-full max-w-[120px] max-h-[120px]" src={formData.photoPreview} alt="Selected" />}
      <div className="grid grid-cols-2  gap-6 w-[100%]">
        <div className="border p-4 bg-white rounded-lg shadow">
          <div className='flex items-center justify-between'>
            <h3
              className="text-lg font-bold mb-2 text-red-700 cursor-pointer "
              onClick={() => setPersonalInfoOpen(!isPersonalInfoOpen)}
            >
              Personal Information
            </h3>
            <div className='flex justify-end cursor-pointer'>
              <FontAwesomeIcon icon={!isPersonalInfoOpen ? faChevronDown : faChevronUp}
                onClick={() => setPersonalInfoOpen(!isPersonalInfoOpen)}></FontAwesomeIcon>
            </div>
          </div>
          <Collapse isOpened={isPersonalInfoOpen}>
            <p className="mb-2">
              <span className="font-bold">Username:</span> {formData.username}
            </p>
            <p className="mb-2">
              <span className="font-bold">First Name:</span> {formData.firstName}
            </p>
            <p className="mb-2">
              <span className="font-bold">Last Name:</span> {formData.lastName}
            </p>
            <p className="mb-2">
              <span className="font-bold">Birthday:</span> {formData.birthday}
            </p>
            <p className="mb-2">
              <span className="font-bold">Email:</span> {formData.email}
            </p>
            <p className="mb-2">
              <span className="font-bold">Mobile Number:</span> {formData.mobileNumber}
            </p>
            <p className="mb-2">
              <span className="font-bold">Job experience:</span> {formData.jobXp} years
            </p>
            <p className="mb-2">
              <span className="font-bold">Twitter link :</span> {formData.twitterLink}
            </p>
            <p className="mb-2">
              <span className="font-bold">Facebook link :</span> {formData.facebookLink}
            </p>
            <p className="mb-2">
              <span className="font-bold">Github link :</span> {formData.githubLink}
            </p>
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
                <h4 className="text-md font-bold mb-2 text-red-700">{skill.titleSkill}</h4>
                <p className="mb-2">
                  <span className="font-bold">Skill Level:</span>{' '}
                  <span className="text-green-700">{skill.percentageSkill}</span>
                </p>
              </div>
            ))}
          </Collapse>
        </div>
        <div className="border p-4 col-span-2 bg-white rounded-lg shadow">
          <div className='flex items-center justify-between'>

            <h3
              className="text-lg font-bold mb-2 text-red-700 cursor-pointer"
              onClick={() => setEducationOpen(!isEducationOpen)}
            >
              Education
            </h3>
            <div className='flex justify-end cursor-pointer'>
              <FontAwesomeIcon icon={!isEducationOpen ? faChevronDown : faChevronUp}
                onClick={() => setEducationOpen(!isEducationOpen)}></FontAwesomeIcon>
            </div>
          </div>
          <Collapse isOpened={isEducationOpen}>
            {formData.education?.map((education, index) => (
              <div key={index} className="mb-4">
                <h4 className="text-md font-bold mb-2 text-red-700">{education.titleEducation}</h4>
                <p className="mb-2">
                  <span className="font-bold">University:</span> {education.university}
                </p>
                <p className="mb-2 whitespace-normal break-words">
                  <span className="font-bold">Description:</span> {education.description}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Country:</span> {education.country}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Start Date:</span> {education.startDate}
                </p>
                <p className="mb-2">
                  <span className="font-bold">End Date:</span> {education.endDate}
                </p>
              </div>
            ))}
          </Collapse>
        </div>
        <div className="border p-4 col-span-2 bg-white rounded-lg shadow">
          <div className='flex items-center justify-between'>

            <h3
              className="text-lg font-bold mb-2 text-red-700 cursor-pointer"
              onClick={() => setJobExpOpen(!isJobExpOpen)}
            >
              Job Experience
            </h3>
            <div className='flex justify-end cursor-pointer'>
              <FontAwesomeIcon icon={!isJobExpOpen ? faChevronDown : faChevronUp}
                onClick={() => setJobExpOpen(!isJobExpOpen)}></FontAwesomeIcon>
            </div>
          </div>
          <Collapse isOpened={isJobExpOpen}>
            {formData.jobExperience?.map((experience, index) => (
              <div key={index} className="mb-4">
                <h4 className="text-md font-bold mb-2 text-red-700">{experience.titleJobExperience}</h4>
                <p className="mb-2">
                  <span className="font-bold">Company:</span> {experience.company}
                </p>
                <p className="mb-2 whitespace-normal break-words">
                  <span className="font-bold">Description:</span> {experience.description}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Country:</span> {experience.country}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Start Date:</span> {experience.startDate}
                </p>
                <p className="mb-2">
                  <span className="font-bold">End Date:</span> {experience.endDate}
                </p>
              </div>
            ))}
          </Collapse>
        </div>
        <div className="border p-4 bg-white rounded-lg shadow">
          <div className='flex items-center justify-between'>
            <h3
              className="text-lg font-bold mb-2 text-red-700 cursor-pointer"
              onClick={() => setCertifOpen(!isCertifOpen)}
            >
              Certifications
            </h3>
            <div className='flex justify-end cursor-pointer'>
              <FontAwesomeIcon icon={!isCertifOpen ? faChevronDown : faChevronUp}
                onClick={() => setCertifOpen(!isCertifOpen)}></FontAwesomeIcon>
            </div>
          </div>
          <Collapse isOpened={isCertifOpen}>
            {formData.Certif?.map((certification, index) => (
              <div key={index} className="mb-4">
                <h4 className="text-md font-bold mb-2 text-red-700">{certification.CertifTitle}</h4>
                <p className="mb-2">
                  <span className="font-bold">Description:</span> {certification.description}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Start Date:</span> {certification.startDate}
                </p>
                <p className="mb-2">
                  <span className="font-bold">End Date:</span> {certification.endDate}
                </p>
              </div>
            ))}
          </Collapse>
        </div>
        <div className="border p-4 bg-white rounded-lg shadow">
          <div className='flex items-center justify-between'>
            <h3
              className="text-lg font-bold mb-2 text-red-700 cursor-pointer"
              onClick={() => setLanguagesOpen(!isLanguagesOpen)}
            >
              Languages
            </h3>
            <div className='flex justify-end cursor-pointer'>
              <FontAwesomeIcon icon={!isLanguagesOpen ? faChevronDown : faChevronUp}
                onClick={() => setLanguagesOpen(!isLanguagesOpen)}></FontAwesomeIcon>
            </div>
          </div>
          <Collapse isOpened={isLanguagesOpen}>
            {formData.Languages?.map((language, index) => (
              <div key={index} className="mb-4">
                <h4 className="text-md font-bold mb-2 text-red-700">{language.titleLanguage}</h4>
                <p className="mb-2">
                  <span className="font-bold">Proficiency:</span> {language.percentageLanguage}
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

export default Confirmation;
