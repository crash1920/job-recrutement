/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './CandidateStepper.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../components/Button/Button';
import validationRules from '../../../validationRules';

function JobExperience({ onNext, onPrevious, formData }) {
  const {
    register, handleSubmit, watch, formState: { errors }, trigger, setValue, clearErrors,
  } = useForm({
    defaultValues: formData,
  });

  const [jobExperience, setJobExperience] = useState(formData?.jobExperience || []);

  const handleAddJobExperience = () => {
    clearErrors();
    setJobExperience((prevJobExperience) => [
      ...prevJobExperience,
      {
        startDate: '',
        endDate: '',
        contractType: '',
        description: '',
        country: '',
        titleJobExperience: '',
        company: '',
      },
    ]);
    const newIndex = jobExperience.length;
    setValue(`jobExperience[${newIndex}].titleJobExperience`, '');
    setValue(`jobExperience[${newIndex}].contractType`, '');
    setValue(`jobExperience[${newIndex}].startDate`, '');
    setValue(`jobExperience[${newIndex}].endDate`, '');
    setValue(`jobExperience[${newIndex}].description`, '');
    setValue(`jobExperience[${newIndex}].country`, '');
    setValue(`jobExperience[${newIndex}].company`, '');
  };

  const handleDeleteJobExperience = (index) => {
    setJobExperience((prevJobExperience) => {
      const updatedJobExperience = [...prevJobExperience];
      updatedJobExperience.splice(index, 1);
      return updatedJobExperience;
    });
  };

  const handleJobExperienceChange = (index, field, value) => {
    setJobExperience((prevJobExperience) => {
      const updatedJobExperience = [...prevJobExperience];
      updatedJobExperience[index][field] = value;
      return updatedJobExperience;
    });
    setValue(`jobExperience[${index}].${field}`, value);
    trigger(`jobExperience[${index}].${field}`);
  };

  const onSubmit = (data) => {
    const updatedJobExperience = jobExperience.map((item) => ({
      ...item,
    }));
    onNext({
      ...data,
      jobExperience: updatedJobExperience,
    });
  };

  const watchedjobExperience = watch('jobExperience', jobExperience);

  return (
    <>
      <h2 className="mb-5 items-center">User details</h2>
      <form className='w-3/4' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex w-full'>
          <div className="job-experience w-full flex flex-col justify-center">
            <div className='label-and-plus flex flex-row w-full justify-center' >
              <label htmlFor="JobExperience">jobExperience   <button type="button" onClick={handleAddJobExperience}>
                <FontAwesomeIcon color='green' icon={faPlus} />
              </button></label>
            </div>
            <div className="flex flex-col justify-center">
              {jobExperience.map((item, index) => (
                <div key={index} className="education-job-experience-input ml-2 w-full mb-5">
                  <div className="flex justify-end">
                    <button type="button" onClick={() => handleDeleteJobExperience(index)}>
                      <FontAwesomeIcon color='red' icon={faTrashCan} />
                    </button>
                  </div>
                  <div className='experience-form'>
                    <label>Title</label>
                    <div className="input-and-error">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter title"
                        id={`titleJobExperience_${index}`}
                        {...register(`jobExperience[${index}].titleJobExperience`, validationRules.titleJobExperience)}
                        value={item.titleJobExperience}
                        onChange={(e) => {
                          setValue(`jobExperience[${index}].titleJobExperience`, e.target.value);
                          trigger(`jobExperience[${index}].titleJobExperience`);
                          handleJobExperienceChange(index, 'titleJobExperience', e.target.value);
                        }}
                      />
                      {errors.jobExperience?.[index]?.titleJobExperience && (
                        <span className="text-danger">title is required</span>
                      )}</div>
                  </div>
                  <div className='experience-form'>
                    <label>Company</label>
                    <div className="input-and-error">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter the company name"
                        id={`company_${index}`}
                        {...register(`jobExperience[${index}].company`, validationRules.titleJobExperience)}
                        value={item.company}
                        onChange={(e) => {
                          setValue(`jobExperience[${index}].company`, e.target.value);
                          trigger(`jobExperience[${index}].company`);
                          handleJobExperienceChange(index, 'company', e.target.value);
                        }}
                      />
                      {errors.jobExperience?.[index]?.company && (
                        <span className="text-danger">company name  is required</span>
                      )}</div>
                  </div>
                  <div className='experience-form'>
                    <label>contractType</label>
                    <div className="input-and-error">
                      <select
                        className="form-control"
                        {...register(`jobExperience[${index}].contractType`, validationRules.contractType)}
                        value={item.contractType}
                        onChange={(e) => {
                          setValue(`jobExperience[${index}].contractType`, e.target.value);
                          trigger(`jobExperience[${index}].contractType`);
                          handleJobExperienceChange(index, 'contractType', e.target.value);
                        }}
                      >
                        <option value="">select a type of contract </option>
                        <option value="CDI">CDI</option>
                        <option value="CDD">CDD</option>
                        <option value="internship">internship</option>
                        <option value="apprenticeship">apprenticeship</option>

                      </select>
                      {errors.jobExperience?.[index]?.contractType && (
                        <span className="text-danger">contractType is required</span>
                      )}
                    </div>
                  </div>
                  <div className='experience-form'>
                    <label>Date</label>
                    <div className='flex flex-row gap-3 w-full'>
                      <label>From:</label>
                      <div className='input-and-error '>
                        <input
                          type="date"
                          className="form-control"
                          id='startDate'
                          placeholder="Enter start date"
                          value={item.startDate}
                          {...register(`jobExperience[${index}].startDate`, validationRules.startDate)}
                          onChange={(e) => {
                            setValue(`jobExperience[${index}].startDate`, e.target.value);
                            trigger(`jobExperience[${index}].startDate`);
                            handleJobExperienceChange(index, 'startDate', e.target.value);
                          }}
                        />
                        {errors.jobExperience?.[index]?.startDate && (
                          <span className="text-danger">start Date is required</span>
                        )}
                      </div>
                      <label>To:</label>
                      <div className='input-and-error '>
                        <input
                          type="date"
                          className="form-control"
                          id='endDate'
                          placeholder="Enter end date"
                          {...register(`jobExperience[${index}].endDate`, validationRules.endDate)}
                          value={item.endDate}
                          onChange={(e) => {
                            setValue(`jobExperience[${index}].endDate`, e.target.value);
                            trigger(`jobExperience[${index}].endDate`);
                            handleJobExperienceChange(index, 'endDate', e.target.value);
                          }}
                        />
                        {errors.jobExperience?.[index]?.endDate && (
                          <span className="text-danger">end Date is required</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='experience-form'>
                    <label>Description</label>
                    <div className='input-and-error '>

                      <textarea
                        className="form-control"
                        placeholder="Enter description"
                        id='description'
                        {...register(`jobExperience[${index}].description`, validationRules.description)}
                        value={item.description}
                        onChange={(e) => {
                          setValue(`jobExperience[${index}].description`, e.target.value);
                          trigger(`jobExperience[${index}].description`);
                          handleJobExperienceChange(index, 'description', e.target.value);
                        }}
                      ></textarea>
                      {errors.jobExperience?.[index]?.description && (
                        <span className="text-danger">description is required</span>
                      )}
                    </div>
                  </div>
                  <div className='experience-form'>
                    <label>Country</label>
                    <div className='input-and-error '>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter country"
                        value={item.country}
                        id='country'
                        {...register(`jobExperience[${index}].country`, validationRules.country)}
                        onChange={(e) => {
                          setValue(`jobExperience[${index}].country`, e.target.value);
                          trigger(`jobExperience[${index}].country`);
                          handleJobExperienceChange(index, 'country', e.target.value);
                        }}
                      />
                      {errors.jobExperience?.[index]?.country && (
                        <span className="text-danger">country is required</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-3">
          <Button onClick={onPrevious}>Previous</Button>
          <Button disabled={jobExperience.length === 0}>Next</Button>
        </div>
      </form>
    </>
  );
}

export default JobExperience;
