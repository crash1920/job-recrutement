/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Stepper from 'react-stepper-horizontal';
import JobCharacteristic from './JobCharacteristic';
import RequiredSkills from './RequiredSkills';
import JobInformation from './JobInformation';
import JobDescription from './JobDescription';
import RecapPage from './RecapPage';

const JobPostStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const steps = [
    { title: 'Job characteristic' },
    { title: ' job Skills' },
    { title: 'Job information ' },
    { title: 'job description' },
    { title: 'Recap' },

  ];

  const handleNext = (data) => {
    const updatedData = {
      ...data,
    };
    setFormData((prevData) => ({ ...prevData, ...updatedData }));
    setActiveStep((prevStep) => prevStep + 1);
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
        return <JobCharacteristic onNext={handleNext} formData={formData} />;
      case 1:
        return (
          <RequiredSkills
            onNext={handleNext}
            onPrevious={handlePrevious}
            formData={formData}
          />
        );
      case 2: return (
        <JobInformation
          onNext={handleNext}
          onPrevious={handlePrevious}
          formData={formData}
        />
      );
      case 3: return (
        <JobDescription
          onNext={handleNext}
          onPrevious={handlePrevious}
          formData={formData}
        />
      );
      case 4: return (
        <RecapPage
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
        <div className='flex flex-col items-center bg-dirtyWhite w-full mt-8'>
          {getSectionComponent()}
        </div>
      </div>
    </div>
  );
};

export default JobPostStepper;
