/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { ReactNode, useEffect, useState } from 'react';
import Button from '../../../components/Button/Button';
import validationRules from '../../../validationRules';

function JobInformation({ onNext, onPrevious, formData }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,

  } = useForm({
    defaultValues: formData,
    mode: 'onChange',
  });
  const [fieldValues, setFieldValues] = useState(formData);
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
    const newData = {
      ...data,
      jobInformation: {
        openings: [{ value: data.openings, label: 'openings' }],
        jobXp: [{ value: data.jobXp, label: 'job experience' }],
        jobLevel: [{
          value: data.jobLevel, label: ' job Level',
        }],
        workShift: [{ value: data.workShift, label: 'work Shift' }],
        remote: [{ value: data.remote, label: 'possibility of remote' }],
        postedOn: [{ value: data.time, label: 'Posted on ' }],

      },
    };

    onNext(newData);
  };

  return (
    <>
      <h2 className='mb-5 items-center'>job information </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid">
          <div className="form-stepper">
            <label htmlFor="openings">no of openings </label>
            <div className="user-input">
              <input
                type="text"
                className="form-control"
                id="openings"
                placeholder="Enter no openings"
                {...register('openings', validationRules.openings)}
                value={fieldValues.openings}
                onChange={(e) => {
                  setValue('openings', e.target.value);
                  handleChange('openings', e.target.value);
                }}
              />
              {errors.openings && errors.openings.type === 'required' && (
                <span className="text-danger">Number of openings is required</span>
              )}
              {errors.openings && errors.openings.type === 'pattern' && (
                <span className="text-danger">Number of openings must be a number</span>
              )}
            </div>
          </div>

          <div className="form-stepper">
            <label htmlFor="jobLevel">job Level</label>
            <div className="user-input w-full">
              <select
                className="form-control"
                {...register('jobLevel', validationRules.country)}
                value={fieldValues.jobLevel}
                onChange={(e) => {
                  setValue('jobLevel', e.target.value);
                  trigger('jobLevel');
                  handleChange('jobLevel', e.target.value);
                }}
              >
                <option value="">Select a job Level</option>
                <option value="Executive or senior management">Executive or senior management</option>
                <option value="Middle management">Middle management </option>
                <option value="First-level management">First-level management</option>
                <option value="Intermediate or experienced (senior staff)">Intermediate or experienced (senior staff)</option>
                <option value="Entry-level">Entry-level</option>
              </select>
              {errors.jobLevel && <span className="text-danger">job Level  is required</span>}
            </div>
          </div>
          <div className="form-stepper">
            <label htmlFor="jobXp">Job Experience</label>
            <div className="user-input">
              <input
                type="text"
                className="form-control"
                id="jobXp"
                placeholder="Enter job experience"
                {...register('jobXp', validationRules.jobXp)}
                onChange={(e) => handleChange('jobXp', e.target.value)}
              />
              {errors.jobXp && errors.jobXp.type === 'required' && (
                <span className="text-danger">Number of openings is required</span>
              )}
              {errors.jobXp && errors.jobXp.type === 'pattern' && (
                <span className="text-danger">job experience  must be a number</span>
              )}
            </div>
          </div>

          <div className="form-stepper">
            <label htmlFor="workShift">work shift</label>
            <div className="user-input w-full">
              <select
                className="form-control"
                {...register('workShift', validationRules.country)}
                value={fieldValues.workShift}
                onChange={(e) => {
                  setValue('workShift', e.target.value);
                  trigger('workShift');
                  handleChange('workShift', e.target.value);
                }}
              >
                <option value="">Select a  work shift </option>
                <option value="Weekday or weekend shift">Weekday or weekend shift</option>
                <option value="Fixed Shift">Fixed Shift </option>
                <option value="Split Shift">Split Shift</option>
                <option value="On Call Shift">On Call Shift</option>
                <option value="Rotating shift">Rotating shift</option>
              </select>
              {errors.workShift && <span className="text-danger">work Shift  is required</span>}
            </div>
          </div>
          <div className="form-stepper">
            <label htmlFor="remote">remote work </label>
            <div className="user-input w-full">
              <select
                className="form-control"
                {...register('remote', validationRules.country)}
                value={fieldValues.remote}
                onChange={(e) => {
                  setValue('remote', e.target.value);
                  trigger('remote');
                  handleChange('remote', e.target.value);
                }}
              >
                <option value="">possibility of remote ? </option>
                <option value="full-remote">Full-remote</option>
                <option value="part-remote ">Part-remote </option>
                <option value="no remote">No remote</option>
              </select>
              {errors.remote && <span className="text-danger">remote work  is required</span>}
            </div>
          </div>
          <div className="form-stepper">
            <div className='flex flex-col w-[50%] '>
              <span className='w-full text-base font-semibold'>Salary Range</span>
              <span className='text-xs '>(exp:3000-4000)</span>
            </div>
            <div className="user-input">
              <input
                type="text"
                className={`form-control ${errors.salaryRange ? 'is-invalid' : ''}`}
                id="salaryRange"
                placeholder="Enter salary range"
                {...register('salaryRange', validationRules.salaryRange)}
                onChange={(e) => handleChange('salaryRange', e.target.value)}
              />
              {errors.salaryRange && (
                <div className="invalid-feedback">{errors.salaryRange.message as ReactNode}</div>
              )}
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

export default JobInformation;
