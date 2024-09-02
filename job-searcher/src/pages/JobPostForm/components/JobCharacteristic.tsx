/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/Button/Button';
import validationRules from '../../../validationRules';

import { RootState } from '../../../store/store';
import { fetchCountries } from '../../Home/store/countriesSlice';

function JobCharacteristic({ onNext, formData }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);
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
  const [photoPreview, setPhotoPreview] = useState(formData.photoPreview);
  const { countries } = useSelector((state: RootState) => state.countries);
  const { categories } = useSelector(
    (state: RootState) => state.jobCategories,
  );
  useEffect(() => {
    if (!fieldValues.jobTitle) {
      setValue('jobTitle', formData.jobTitle || '');
    }
    if (!fieldValues.logo) {
      setValue('logo', formData.logo || '');
    }
    if (!fieldValues.jobCategory) {
      setValue('jobCategory', formData.jobCategory || '');
    }
    if (!fieldValues.city) {
      setValue('city', formData.city || '');
    }
    if (!fieldValues.type) {
      setValue('type', formData.type || '');
    }
    setFieldValues((prevValues) => ({
      ...prevValues,
      jobTitle: formData.jobTitle || prevValues.jobTitle,
      logo: formData.logo || prevValues.logo,
      jobCategory: formData.jobCategory || prevValues.jobCategory,
      city: formData.city || prevValues.city,
      type: formData.type || prevValues.type,
    }));
    setValue('jobTitle', fieldValues.jobTitle || '');
    setValue('logo', fieldValues.logo || '');
    setValue('city', fieldValues.city || '');
    setValue('type', fieldValues.type || '');
    setValue('jobCategory', fieldValues.jobCategory || '');
    if (formData.photoPreview) {
      setFieldValues((prevValues) => ({
        ...prevValues,
        photoPreview: formData.photoPreview,
      }));
    }
  }, [formData.jobTitle,
  formData.photoPreview,
  formData.city,
  formData.type,
  formData.jobCategory,
  formData.time,
    setValue,
  ]);
  const handleChange = (field, value) => {
    setFieldValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
    setValue(field, value);
    trigger(field);
  }; const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const photoPath = event.target?.result?.toString() || '';
          const fileName = file.name;

          setFieldValues((prevValues) => ({
            ...prevValues,
            logo: fileName,
            photoPreview: photoPath,
          }));
          setPhotoPreview(photoPath);
          setValue('logo', fileName);
          setValue('photoPreview', photoPath);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    let month = (now.getMonth() + 1).toString();
    let day = now.getDate().toString();

    if (month.length === 1) {
      month = `0${month}`;
    }
    if (day.length === 1) {
      day = `0${day}`;
    }
    return `${day}-${month}-${year}`;
  };
  const onSubmit = (data) => {
    onNext(data);
    console.log(data);
  };

  return (
    <>
      <h2 className='mb-5 items-center'>job details</h2>
      {photoPreview && <img className="rounded-md max-w-[60px] max-h-[60px]" src={photoPreview} alt="Selected" />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid">
          <div className="form-stepper">
            <label htmlFor="jobTitle">Job Title</label>
            <div className="user-input">
              <input
                type="text"
                className="form-control"
                id="jobTitle"
                placeholder="Enter job Title"
                {...register('jobTitle', validationRules.jobTitle)}
                value={fieldValues.jobTitle}
                onChange={(e) => {
                  setValue('jobTitle', e.target.value);
                  handleChange('jobTitle', e.target.value);
                }}
              />
              {errors.jobTitle && (
                <span className="text-danger">
                  {errors.jobTitle.type === 'required'
                    ? 'Job title is required'
                    : 'Job title cannot contain numbers'}
                </span>
              )}
            </div>
          </div>
          <div className="form-stepper">
            <label htmlFor="logo">upload the logo </label>
            <div className="user-input">
              <input
                type="file"
                id="logo"
                accept="image/*"
                onChange={(e) => {
                  setValue('logo', e.target.value);
                  handlePhotoChange(e);
                }}
              />
            </div>
          </div>

          <div className="form-stepper">
            <label htmlFor="city">city</label>
            <div className="user-input w-full">
              <select
                className="form-control"
                {...register('city', validationRules.country)}
                value={fieldValues.city}
                onChange={(e) => {
                  setValue('city', e.target.value);
                  trigger('city');
                  handleChange('city', e.target.value);
                }}
              >
                <option value="">Select city</option>
                {countries?.map((option) => (
                  <option key={option._id}>{option.countryName}</option>
                ))}
              </select>
              {errors.city && <span className="text-danger">city  is required</span>}
            </div>
          </div>
          <div className="form-stepper">
            <label htmlFor="jobCategory">Job Category</label>
            <div className="user-input w-full">
              <select
                className="form-control"
                {...register('jobCategory', validationRules.country)}
                value={fieldValues.jobCategory}
                onChange={(e) => {
                  setValue('jobCategory', e.target.value);
                  trigger('jobCategory');
                  handleChange('jobCategory', e.target.value);
                }}
              >
                <option value="">Select job category</option>
                {categories?.map((option) => (
                  <option key={option._id}>{option.name}</option>
                ))}
              </select>
              {errors.jobCategory && <span className="text-danger">job Category  is required</span>}
            </div>
          </div>
          <div className="form-stepper">
            <label htmlFor="jobLevel">Type</label>
            <div className="user-input w-full">
              <select
                className="form-control"
                {...register('type', validationRules.country)}
                value={fieldValues.type}
                onChange={(e) => {
                  setValue('type', e.target.value);
                  trigger('type');
                  handleChange('type', e.target.value);
                }}
              >
                <option value="">Select job type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
              </select>
              {errors.type && <span className="text-danger">type job   is required</span>}
            </div>
          </div>

          <div className="form-stepper">
            <label htmlFor="time">date of publication</label>
            <div className="user-input w-full">
              <input
                type="text"
                className="form-control"
                id="time"
                placeholder="Enter a mobile number"
                max={getCurrentDate()} // Set the max attribute to the current date
                readOnly
                {...register('time', validationRules.startDate)}
                value={getCurrentDate()}
                onChange={(e) => handleChange('mobileNumber', e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='flex justify-end mt-3'>
          <Button>Next</Button>
        </div>
      </form>
    </>
  );
}

export default JobCharacteristic;
