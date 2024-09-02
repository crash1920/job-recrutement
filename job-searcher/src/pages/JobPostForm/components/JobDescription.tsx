/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../components/Button/Button';
import validationRules from '../../../validationRules';

function JobDescription({ onNext, onPrevious, formData }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
    clearErrors,

  } = useForm({
    defaultValues: formData,
    mode: 'onChange',
  });
  const [fieldValues, setFieldValues] = useState(formData);
  const [Responsibilities, setResponsibilities] = useState(formData?.Responsibilities || []);
  const [Criteria, setCriteria] = useState(formData?.Criteria || []);

  const handleAddResponsibility = () => {
    clearErrors();

    setResponsibilities((prevResponsibilities) => [...prevResponsibilities, { value: '' }]);
    const newIndex = Responsibilities.length;
    setValue(`responsibilities[${newIndex}].value`, '');
  };

  const handleDeleteResponsibility = (index) => {
    setResponsibilities((prevResponsibilities) => {
      const updatedResponsibilities = [...prevResponsibilities];
      updatedResponsibilities.splice(index, 1);
      return updatedResponsibilities;
    });
  };

  const handleResponsibilityChange = (index, field, value) => {
    setResponsibilities((prevResponsibilities) => {
      const updatedResponsibilities = [...prevResponsibilities];
      updatedResponsibilities[index][field] = value;
      return updatedResponsibilities;
    });
    setValue(`responsibilities[${index}].${field}`, value);
    trigger(`responsibilities[${index}].${field}`);
  };
  const handleAddCriteria = () => {
    clearErrors();

    setCriteria((prevCriteria) => [...prevCriteria, { value: '' }]);
    const newIndex = Criteria.length;
    setValue(`criteria[${newIndex}].value`, '');
  };

  const handleDeleteCriteria = (index) => {
    setCriteria((prevCriteria) => {
      const updatedCriteria = [...prevCriteria];
      updatedCriteria.splice(index, 1);
      return updatedCriteria;
    });
  };

  const handleCriteriaChange = (index, field, value) => {
    setCriteria((prevCriteria) => {
      const updatedCriteria = [...prevCriteria];
      updatedCriteria[index][field] = value;
      return updatedCriteria;
    });
    setValue(`criteria[${index}].${field}`, value);
    trigger(`criteria[${index}].${field}`);
  };
  useEffect(() => {
    if (!fieldValues.openings) {
      setValue('openings', formData.openings || '');
    }
    if (!fieldValues.jobLevel) {
      setValue('jobLevel', formData.jobLevel || '');
    }
    if (!fieldValues.jobXp) {
      setValue('jobXp', formData.jobXp || '');
    }
    if (!fieldValues.workShift) {
      setValue('workShift', formData.workShift || '');
    }
    setFieldValues((prevValues) => ({
      ...prevValues,
      openings: formData.openings || prevValues.openings,
      jobLevel: formData.jobLevel || prevValues.jobLevel,
      jobXp: formData.jobXp || prevValues.jobXp,
      workShift: formData.workShift || prevValues.workShift,

    }));
    setValue('openings', fieldValues.openings || '');
    setValue('jobLevel', fieldValues.jobLevel || '');
    setValue('jobXp', fieldValues.jobXp || '');
    setValue('workShift', fieldValues.workShift || '');
  }, [formData.openings,
  formData.jobLevel,
  formData.jobXp,
  formData.workShift,
    setValue,
  ]);
  const handleChange = (field, value) => {
    setFieldValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
    setValue(field, value);
    trigger(field);
  };

  const onSubmit = (data) => {
    onNext({ ...data, Responsibilities, Criteria });
  };

  return (
    <>
      <h2 className='mb-5 items-center'>job description </h2>
      <form className='w-[70%]' onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-full">
          <div className="form-stepper flex flex-col">
            <div>
              <label htmlFor="jobDescription">Description </label>
            </div>
            <div className="user-input">
              <textarea

                className="form-control"
                id="jobDescription"
                placeholder="Enter your job description "
                {...register('jobDescription', validationRules.description)}
                value={fieldValues.jobDescription}
                onChange={(e) => {
                  setValue('jobDescription', e.target.value);
                  handleChange('jobDescription', e.target.value);
                }}
              />
              {errors.jobDescription && errors.jobDescription.type === 'required' && (
                <span className="text-danger">description job  is required</span>
              )}
            </div>
          </div>

          <div className="education-experience w-full flex flex-col">
            <div className='label-and-plus flex flex-row  justify-center' >
              <label htmlFor="responsibilities">Responsibilities  <button type="button" onClick={handleAddResponsibility}>
                <FontAwesomeIcon color='green' icon={faPlus} />
              </button></label>
            </div>
            <div className="flex flex-col justify-center">
              {Responsibilities.map((Responsibility, index) => (
                <div key={index} className="Responsibility-input flex items-center flex-row w-full ">
                  <div className="input-and-error">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Responsibility description "
                      id={`value${index}`}
                      {...register(`responsibilities[${index}].value`, validationRules.titleResponsibility)}
                      value={Responsibility.value}
                      onChange={(e) => {
                        setValue(`responsibilities[${index}].value`, e.target.value);
                        trigger(`responsibilities[${index}].value`);
                        handleResponsibilityChange(index, 'value', e.target.value);
                      }}
                    />
                    {errors.Responsibilities?.[index]?.value && (
                      <span className="text-danger">value is required</span>
                    )}
                  </div>

                  <div className='flex items-center ml-3'>
                    <button type="button" onClick={() => handleDeleteResponsibility(index)} >
                      <FontAwesomeIcon color='red' icon={faTrashCan} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="education-experience w-full flex flex-col mt-5">
            <div className='label-and-plus flex flex-row  justify-center' >
              <label htmlFor="Responsibilities"> criteria for selection  <button type="button" onClick={handleAddCriteria}>
                <FontAwesomeIcon color='green' icon={faPlus} />
              </button></label>
            </div>
            <div className="flex flex-col justify-center">
              {Criteria.map((criteria, index) => (
                <div key={index} className="criteria-input flex items-center flex-row w-full ">
                  <div className="input-and-error">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter criteria description "
                      id={`value${index}`}
                      {...register(`criteria[${index}].value`, validationRules.titleResponsibility)}
                      value={criteria.value}
                      onChange={(e) => {
                        setValue(`criteria[${index}].value`, e.target.value);
                        trigger(`criteria[${index}].value`);
                        handleCriteriaChange(index, 'value', e.target.value);
                      }}
                    />
                    {errors.Criteria?.[index]?.value && (
                      <span className="text-danger">value is required</span>
                    )}
                  </div>

                  <div className='flex items-center ml-3'>
                    <button type="button" onClick={() => handleDeleteCriteria(index)} >
                      <FontAwesomeIcon color='red' icon={faTrashCan} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-3">
          <Button onClick={onPrevious}>Previous</Button>
          <Button >Next</Button>

        </div>
      </form>
    </>
  );
}

export default JobDescription;
