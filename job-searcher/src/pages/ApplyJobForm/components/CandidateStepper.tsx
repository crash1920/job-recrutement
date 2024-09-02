/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Stepper from 'react-stepper-horizontal';
import UserDetails from './UserDetails';
import Confirmation from './Confirmation';
import Skills from './Skills';
import Education from './Education';
import JobExperience from './JobExperience';
import CertifAndLanguages from './CertifAndLanguages';

const CandidateStepper = ({ jobId, jobTitle }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({ jobId, jobTitle });

  const steps = [
    { title: 'User details' },
    { title: 'Skills' },
    { title: 'Education' },
    { title: 'Job experience' },
    { title: 'Languages and certifications' },
    { title: 'Confirmation' },
  ];

  const handleNext = (data) => {
    const updatedData = {
      ...data,
      jobId,
      jobTitle,
    };
    setFormData((prevData) => ({ ...prevData, ...updatedData }));
    setActiveStep((prevStep) => prevStep + 1);
    console.log('Form Data:', updatedData);
  };

  const handlePrevious = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleCircleClick = (index) => {
    setActiveStep(index);
  };

  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return <UserDetails onNext={handleNext} formData={formData} />;
      case 1:
        return (
          <Skills
            onNext={handleNext}
            onPrevious={handlePrevious}
            formData={formData}
          />
        );
      case 2:
        return (
          <Education
            onNext={handleNext}
            onPrevious={handlePrevious}
            formData={formData}
          />
        );
      case 3:
        return (
          <JobExperience
            onNext={handleNext}
            onPrevious={handlePrevious}
            formData={formData}
          />
        );
      case 4:
        return (
          <CertifAndLanguages
            onNext={handleNext}
            onPrevious={handlePrevious}
            formData={formData}
          />
        );
      case 5:
        return (
          <Confirmation
            onPrevious={handlePrevious}
            formData={formData}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className='my-20'>
      <div className='mx-40 items-center flex flex-col'>
        <Stepper steps={steps} activeStep={activeStep}
          activeColor="red"
          circleFontSize={18}
          completeColor="red"
          onClick={handleCircleClick}
        />
        <div className='flex flex-col items-center bg-dirtyWhite w-full mx-auto mt-8 p-4'>
          {getSectionComponent()}
        </div>
      </div>
    </div>
  );
};

export default CandidateStepper;
