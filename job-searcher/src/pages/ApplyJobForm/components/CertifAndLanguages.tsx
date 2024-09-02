/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './CandidateStepper.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../components/Button/Button';
import validationRules from '../../../validationRules';

function CertifAndLanguages({ onNext, onPrevious, formData }) {
  const {
    handleSubmit, watch, clearErrors, setValue, trigger, register, formState: { errors },
  } = useForm({
    defaultValues: formData,
  });

  const [Languages, setLanguages] = useState(formData?.Languages || []);
  const [Certif, setCertif] = useState(formData?.Certif || []);

  const handleAddLanguages = () => {
    clearErrors();
    setLanguages((prevLanguages) => [...prevLanguages, { titleLanguage: '', percentageLanguage: '' }]);
    const newIndex = Languages.length;
    setValue(`languages[${newIndex}].titleLanguage`, '');
    setValue(`languages[${newIndex}].percentageLanguage`, '');
  };

  const handleDeleteLanguages = (index) => {
    setLanguages((prevLanguages) => {
      const updatedLanguages = [...prevLanguages];
      updatedLanguages.splice(index, 1);
      return updatedLanguages;
    });
  };

  const handleLanguagesChange = (index, field, value) => {
    setLanguages((prevLanguages) => {
      const updatedLanguages = [...prevLanguages];
      updatedLanguages[index][field] = value;
      return updatedLanguages;
    });
    setValue(`languages[${index}].${field}`, value);
    trigger(`languages[${index}].${field}`);
  };

  const handleAddCertif = () => {
    clearErrors();
    setCertif((prevCertif) => [
      ...prevCertif,
      {
        startDate: '', endDate: '', CertifTitle: '', description: '',
      },
    ]);
    const newIndex = Certif.length;
    setValue(`certif[${newIndex}].CertifTitle`, '');
    setValue(`certif[${newIndex}].startDate`, '');
    setValue(`certif[${newIndex}].endDate`, '');
    setValue(`certif[${newIndex}].description`, '');
  };

  const handleDeleteCertif = (index) => {
    setCertif((prevCertif) => {
      const updatedCertif = [...prevCertif];
      updatedCertif.splice(index, 1);
      return updatedCertif;
    });
  };

  const handleCertifChange = (index, field, value) => {
    setCertif((prevCertif) => {
      const updatedCertif = [...prevCertif];
      updatedCertif[index][field] = value;
      return updatedCertif;
    });
    setValue(`certif[${index}].${field}`, value);
    trigger(`certif[${index}].${field}`);
  };

  const onSubmit = (data) => {
    onNext({
      ...data,
      Languages,
      Certif,
    });
  };

  const watchedLanguages = watch('languages', Languages);
  const watchedCertif = watch('certif', Certif);

  return (
    <>
      <h2 className="mb-5 items-center">Languages and Certifications</h2>
      <form className='w-3/4' onSubmit={handleSubmit(onSubmit)}>
        <div className='languages-grid w-full grid grid-cols-2 gap-4'>
          <div className="education-experience w-full flex flex-col">
            <div className='label-and-plus flex flex-row w-full justify-center'>
              <label htmlFor="languages">Languages  <button type="button" onClick={handleAddLanguages}>
                <FontAwesomeIcon color='green' icon={faPlus} />
              </button></label>
            </div>
            <div className="flex flex-col justify-center">
              {Languages.map((Language, index) => (
                <div key={index} className="Language-input flex items-center flex-row ">
                  <div className="input-and-error">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Language title"
                      id={`titleLanguage_${index}`}
                      {...register(`languages[${index}].titleLanguage`, validationRules.titleLanguage)}
                      value={Language.titleLanguage}
                      onChange={(e) => {
                        setValue(`languages[${index}].titleLanguage`, e.target.value);
                        trigger(`languages[${index}].titleLanguage`);
                        handleLanguagesChange(index, 'titleLanguage', e.target.value);
                      }}
                    />
                    {errors.Languages?.[index]?.titleLanguage && (
                      <span className="text-danger">title is required</span>
                    )}
                  </div>
                  <div className='input-and-error'>
                    <select
                      className="form-control"
                      id={`percentageLanguage_${index}`}
                      {...register(`languages[${index}].percentageLanguage`, validationRules.percentageLanguage)}
                      value={Language.percentageLanguage}
                      onChange={(e) => {
                        setValue(`languages[${index}].percentageLanguage`, e.target.value);
                        trigger(`languages[${index}].percentageLanguage`);
                        handleLanguagesChange(index, 'percentageLanguage', e.target.value);
                      }}
                    >
                      <option value="">Select Language level</option>
                      <option value="10%">Beginner</option>
                      <option value="50%">Intermediate</option>
                      <option value="80%">Expert</option>
                      <option value="100%">Advanced</option>
                    </select>
                    {errors.Languages?.[index]?.percentageLanguage && (
                      <span className="text-danger">percentage is required</span>
                    )}
                  </div>
                  <div className='flex items-center'>
                    <button type="button" onClick={() => handleDeleteLanguages(index)}>
                      <FontAwesomeIcon className='ml-4' color='red' icon={faTrashCan} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="education-experience w-full flex flex-col">
            <div className='label-and-plus flex flex-row w-full justify-center'>
              <label htmlFor="certif">Certifications  <button type="button" onClick={handleAddCertif}>
                <FontAwesomeIcon className='ml-3' color='green' icon={faPlus} />
              </button></label>
            </div>
            <div className="flex flex-col justify-center">
              {Certif.map((item, index) => (
                <div key={index} className="education-experience-input ml-2 w-full">
                  <div className="flex justify-end">
                    <button type="button" onClick={() => handleDeleteCertif(index)}>
                      <FontAwesomeIcon color='red' icon={faTrashCan} />
                    </button>
                  </div>
                  <div className='experience-form'>
                    <label>Name </label>
                    <div className='input-and-error '>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter name"
                        id={`CertifTitle_${index}`}
                        {...register(`certif[${index}].CertifTitle`, validationRules.CertifTitle)}
                        value={item.CertifTitle}
                        onChange={(e) => {
                          setValue(`certif[${index}].CertifTitle`, e.target.value);
                          trigger(`certif[${index}].CertifTitle`);
                          handleCertifChange(index, 'CertifTitle', e.target.value);
                        }}
                      />
                      {errors.Certif?.[index]?.CertifTitle && (
                        <span className="text-danger">name is required</span>
                      )}
                    </div>
                  </div>
                  <div className='experience-form'>
                    <label>Start Date</label>
                    <div className='input-and-error'>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Enter start date"
                        id={`startDate_${index}`}
                        {...register(`Certif[${index}].startDate`, validationRules.startDate)}
                        value={item.startDate}
                        onChange={(e) => {
                          setValue(`Certif[${index}].startDate`, e.target.value);
                          trigger(`Certif[${index}].startDate`);
                          handleCertifChange(index, 'startDate', e.target.value);
                        }}
                      />
                      {errors.Certif?.[index]?.startDate && (
                        <span className="text-danger">start date is required</span>
                      )}
                    </div>
                  </div>
                  <div className='experience-form'>
                    <label>End Date</label>
                    <div className='input-and-error'>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Enter end date"
                        id={`endDate_${index}`}
                        {...register(`certif[${index}].endDate`, validationRules.endDate)}
                        value={item.endDate}
                        onChange={(e) => {
                          setValue(`certif[${index}].endDate`, e.target.value);
                          trigger(`certif[${index}].endDate`);
                          handleCertifChange(index, 'endDate', e.target.value);
                        }}
                      />
                      {errors.Certif?.[index]?.endDate && (
                        <span className="text-danger">end date is required</span>
                      )}
                    </div>
                  </div>
                  <div className='experience-form'>
                    <label>Description</label>
                    <div className='input-and-error'>
                      <textarea
                        className="form-control"
                        placeholder="Enter description"
                        id={`description_${index}`}
                        {...register(`certif[${index}].description`, validationRules.description)}
                        value={item.description}
                        onChange={(e) => {
                          setValue(`certif[${index}].description`, e.target.value);
                          trigger(`certif[${index}].description`);
                          handleCertifChange(index, 'description', e.target.value);
                        }}
                      />
                      {errors.Certif?.[index]?.description && (
                        <span className="text-danger">description is required</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='w-full flex justify-between mt-8'>
          <Button onClick={onPrevious}>Previous</Button>
          <Button disabled={Languages.length === 0 && Certif.length === 0}>Next</Button>
        </div>
      </form>
    </>
  );
}

export default CertifAndLanguages;
