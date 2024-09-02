/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Button from '../../../components/Button/Button';
import './userDetails.css';

import validationRules from '../../../validationRules';

function UserDetails({ onNext, formData }) {
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
  useEffect(() => {
    // Retrieve data from localStorage
    const token = localStorage.getItem('token');
    const storedData = token ? JSON.parse(token).user : null;
    if (storedData) {
      const {
        username,
        email,
        mobileNumber,
        firstName,
        lastName,
        birthday,
      } = storedData;

      if (!fieldValues.username) {
        setValue('username', username);
      }

      if (!fieldValues.email) {
        setValue('email', email);
      }

      if (!fieldValues.mobileNumber) {
        setValue('mobileNumber', mobileNumber);
      }

      if (!fieldValues.firstName) {
        setValue('firstName', firstName);
      }

      if (!fieldValues.lastName) {
        setValue('lastName', lastName);
      }

      if (!fieldValues.birthday) {
        setValue('birthday', birthday);
      }
      if (!fieldValues.photoCandidate) {
        setValue('photoCandidate', formData.photoCandidate || '');
      }
      setFieldValues((prevValues) => ({
        ...prevValues,
        username: formData.username || username,
        email: formData.email || email,
        mobileNumber: formData.mobileNumber || mobileNumber,
        firstName: formData.firstName || firstName,
        lastName: formData.lastName || lastName,
        birthday: formData.birthday || birthday,
        photoCandidate: formData.photoCandidate || prevValues.photoCandidate,
      }));
    }

    setValue('birthCity', fieldValues.birthCity || '');
    setValue('jobXp', fieldValues.jobXp || '');
    setValue('familyMembers', fieldValues.familyMembers || '');
    if (formData.photoPreview) {
      setFieldValues((prevValues) => ({
        ...prevValues,
        photoPreview: formData.photoPreview,
      }));
    }
  }, [formData.username,
  formData.email,
  formData.mobileNumber,
  formData.firstName,
  formData.lastName,
  formData.birthday,
  formData.photoPreview,
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
            photoCandidate: fileName,
            photoPreview: photoPath,
          }));
          setPhotoPreview(photoPath);
          setValue('photoCandidate', fileName);
          setValue('photoPreview', photoPath);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    const newData = {
      ...data,
      customFields: {
        birthCity: [{ value: data.birthCity, label: 'birth city' }],
        jobXp: [{ value: data.jobXp, label: 'job experience' }],
        familyMembers: [{
          value: data.familyMembers, label: 'family members',
        }],
      },
    };
    onNext(newData);
  };

  return (
    <div className='flex items-center w-full flex-col'>
      <h2 className='mb-5 items-center'>User details</h2>
      {photoPreview && <img className="rounded-full max-w-[120px] max-h-[120px]" src={photoPreview} alt="Selected" />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid">
          <div className="form-stepper">
            <label htmlFor="username">Username</label>
            <div className="user-input">
              <input
                type="text"
                className="form-control"
                id="username"
                disabled
                placeholder="Enter username"
                {...register('username', validationRules.username)}
                value={fieldValues.username}
                onChange={(e) => {
                  setValue('username', e.target.value);
                  handleChange('username', e.target.value);
                }}
              />
              {errors.username && <span className="text-danger">Username is required</span>}
            </div>
          </div>
          <div className="form-stepper">
            <label htmlFor="photo">upload your photo</label>
            <div className="user-input">
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={(e) => {
                  setValue('photoCandidate', e.target.value);
                  handlePhotoChange(e);
                }}
              />
            </div>
          </div>

          <div className="form-stepper">
            <label htmlFor="firstName">First Name</label>
            <div className="user-input w-full">
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="First name"
                {...register('firstName', validationRules.firstName)}
                value={fieldValues.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
              />
              {errors.firstName && <span className="text-danger">First name is required</span>}
            </div>
          </div>

          <div className="form-stepper">
            <label htmlFor="lastName">Last Name</label>
            <div className="user-input">
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Last Name"
                {...register('lastName', validationRules.lastName)}
                value={fieldValues.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
              />
              {errors.lastName && <span className="text-danger">Last name is required</span>}
            </div>
          </div>

          <div className="form-stepper">
            <label htmlFor="birthday">Birthday</label>
            <div className="user-input w-full">
              <input
                type="date"
                className="form-control"
                id="birthday"
                {...register('birthday', validationRules.date)}
                value={fieldValues.birthday}
                onChange={(e) => handleChange('birthday', e.target.value)}
              />
              {errors.birthday && errors.birthday.type === 'notPastDate' && (
                <span className="text-danger">Date must not surpass the current date</span>
              )}
            </div>
          </div>

          <div className="form-stepper">
            <label htmlFor="email">Email</label>
            <div className="user-input">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                {...register('email', validationRules.email)}
                value={fieldValues.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
              {errors.email && <span className="text-danger">Email is required</span>}
            </div>
          </div>

          <div className="form-stepper">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <div className="user-input w-full">
              <input
                type="tel"
                className="form-control"
                id="mobileNumber"
                placeholder="Enter a mobile number"
                {...register('mobileNumber', validationRules.mobileNumber)}
                value={fieldValues.mobileNumber}
                onChange={(e) => handleChange('mobileNumber', e.target.value)}
              />
              {errors.mobileNumber && <span className="text-danger">Mobile number is required</span>}
            </div>
          </div>    {/* Custom Fields */}
          <div className="form-stepper">
            <label htmlFor="birthCity">Birth City</label>
            <div className="user-input">
              <input
                type="text"
                className="form-control"
                id="birthCity"
                placeholder="Enter birth city"
                {...register('birthCity', validationRules.birthCity)}
                onChange={(e) => handleChange('birthCity', e.target.value)}
              />
              {errors.birthCity && <span className="text-danger">birthCity is invalid</span>}
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
              {errors.jobXp && <span className="text-danger text-s">job experience is invalid</span>}
            </div>
          </div>
          <div className="form-stepper">
            <label htmlFor="familyMembers">Family Members</label>
            <div className="user-input">
              <input
                type="text"
                className="form-control"
                id="familyMembers"
                placeholder="Enter family members"
                {...register('familyMembers', validationRules.familyMembers)}
                onChange={(e) => handleChange('familyMembers', e.target.value)
                }
              />
              {errors.familyMembers && <span className="text-danger">family Members  is invalid</span>}
            </div>
          </div>
          <div className="form-stepper">
            <label htmlFor="twitterLink">Twitter Link</label>
            <div className="user-input">
              <input
                type="text"
                className="form-control"
                id="twitterLink"
                placeholder="Enter Twitter link"
                {...register('twitterLink', { ...validationRules.links, validate: validationRules.links.validate.isTwitterLink })}
                value={fieldValues.twitterLink}
                onChange={(e) => handleChange('twitterLink', e.target.value)}
              />

              {errors.twitterLink && <span className="text-danger">Invalid Twitter link</span>}
            </div>
          </div>

          <div className="form-stepper">
            <label htmlFor="facebookLink">Facebook Link</label>
            <div className="user-input">
              <input
                type="text"
                className="form-control"
                id="facebookLink"
                placeholder="Enter Facebook link"
                {...register('facebookLink', { ...validationRules.links, validate: validationRules.links.validate.isFacebookLink })}
                value={fieldValues.facebookLink}
                onChange={(e) => handleChange('facebookLink', e.target.value)}
              />
              {errors.facebookLink && <span className="text-danger">Invalid Facebook link</span>}
            </div>
          </div>

          <div className="form-stepper">
            <label htmlFor="githubLink">GitHub Link</label>
            <div className="user-input">
              <input
                type="text"
                className="form-control"
                id="githubLink"
                placeholder="Enter GitHub link"
                {...register('githubLink', { ...validationRules.links, validate: validationRules.links.validate.isGithubLink })}
                value={fieldValues.githubLink}
                onChange={(e) => handleChange('githubLink', e.target.value)}
              />
              {errors.githubLink && <span className="text-danger">Invalid GitHub link</span>}
            </div>
          </div>
        </div>
        <div className='flex justify-end mt-3'>
          <Button>Next</Button>
        </div>
      </form>
    </div>
  );
}

export default UserDetails;
