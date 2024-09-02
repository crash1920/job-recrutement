/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './CandidateStepper.css';
import './userDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../components/Button/Button';
import validationRules from '../../../validationRules';

function Education({ onNext, onPrevious, formData }) {
  const {
    register, handleSubmit, watch, formState: { errors }, trigger, setValue, clearErrors,
  } = useForm({
    defaultValues: formData,
  });

  const [education, setEducation] = useState(formData?.education || []);

  const handleAddEducation = () => {
    clearErrors();
    setEducation((prevEducation) => [
      ...prevEducation,
      {
        startDate: '',
        endDate: '',
        university: '',
        description: '',
        country: '',
        titleEducation: '',
      },
    ]);
    const newIndex = education.length;
    setValue(`education[${newIndex}].titleEducation`, '');
    setValue(`education[${newIndex}].university`, '');
    setValue(`education[${newIndex}].startDate`, '');
    setValue(`education[${newIndex}].endDate`, '');
    setValue(`education[${newIndex}].description`, '');
    setValue(`education[${newIndex}].country`, '');
  };

  const handleDeleteEducation = (index) => {
    setEducation((prevEducation) => {
      const updatedEducation = [...prevEducation];
      updatedEducation.splice(index, 1);
      return updatedEducation;
    });
  };

  const handleEducationChange = (index, field, value) => {
    setEducation((prevEducation) => {
      const updatedEducation = [...prevEducation];
      updatedEducation[index][field] = value;
      return updatedEducation;
    });
    setValue(`education[${index}].${field}`, value);
    trigger(`education[${index}].${field}`);
  };

  const onSubmit = (data) => {
    const updatedEducation = education.map((item) => ({
      ...item,
    }));
    onNext({
      ...data,
      education: updatedEducation,
    });
  };

  const watchedEducation = watch('education', education);
  console.log('Education &:', watchedEducation);

  return (
    <>
      <h2 className="mb-5 items-center">User details</h2>
      <form className='w-3/4' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex w-full'>
          <div className="education w-full flex flex-col justify-center">
            <div className='label-and-plus flex flex-row w-full justify-center' >
              <label htmlFor="education">Education   <button type="button" onClick={handleAddEducation}>
                <FontAwesomeIcon color='green' icon={faPlus} />
              </button></label>
            </div>
            <div className="flex flex-col justify-center">
              {education.map((item, index) => (
                <div key={index} className="education-job-experience ml-2 w-full mb-5">
                  <div className="flex justify-end">
                    <button type="button" onClick={() => handleDeleteEducation(index)}>
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
                        id={`titleEducation_${index}`}
                        {...register(`education[${index}].titleEducation`, validationRules.titleEducation)}
                        value={item.titleEducation}
                        onChange={(e) => {
                          setValue(`education[${index}].titleEducation`, e.target.value);
                          trigger(`education[${index}].titleEducation`);
                          handleEducationChange(index, 'titleEducation', e.target.value);
                        }}
                      />
                      {errors.education?.[index]?.titleEducation && (
                        <span className="text-danger">title is required</span>
                      )}</div>
                  </div>
                  <div className='experience-form'>
                    <label>University</label>
                    <div className="input-and-error">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter university"
                        value={item.university}
                        {...register(`education[${index}].university`, validationRules.university)}
                        onChange={(e) => {
                          setValue(`education[${index}].university`, e.target.value);
                          trigger(`education[${index}].university`);
                          handleEducationChange(index, 'university', e.target.value);
                        }}
                      />
                      {errors.education?.[index]?.university && (
                        <span className="text-danger">university is required</span>
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
                          {...register(`education[${index}].startDate`, validationRules.startDate)}
                          onChange={(e) => {
                            setValue(`education[${index}].startDate`, e.target.value);
                            trigger(`education[${index}].startDate`);
                            handleEducationChange(index, 'startDate', e.target.value);
                          }}
                        />
                        {errors.education?.[index]?.startDate && (
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
                          {...register(`education[${index}].endDate`, validationRules.endDate)}
                          value={item.endDate}
                          onChange={(e) => {
                            setValue(`education[${index}].endDate`, e.target.value);
                            trigger(`education[${index}].endDate`);
                            handleEducationChange(index, 'endDate', e.target.value);
                          }}
                        />
                        {errors.education?.[index]?.endDate && (
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
                        {...register(`education[${index}].description`, validationRules.description)}
                        value={item.description}
                        onChange={(e) => {
                          setValue(`education[${index}].description`, e.target.value);
                          trigger(`education[${index}].description`);
                          handleEducationChange(index, 'description', e.target.value);
                        }}
                      ></textarea>
                      {errors.education?.[index]?.description && (
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
                        {...register(`education[${index}].country`, validationRules.country)}
                        onChange={(e) => {
                          setValue(`education[${index}].country`, e.target.value);
                          trigger(`education[${index}].country`);
                          handleEducationChange(index, 'country', e.target.value);
                        }}
                      />
                      {errors.education?.[index]?.country && (
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
          <Button disabled={education.length === 0} >Next</Button>
        </div>
      </form>
    </>
  );
}

export default Education;
