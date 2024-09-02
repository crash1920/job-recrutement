/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './CandidateStepper.css';
import './userDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../components/Button/Button';
import validationRules from '../../../validationRules';

function Skills({ onNext, onPrevious, formData }) {
  const {
    handleSubmit, watch, clearErrors, setValue, trigger, register, formState: { errors },
  } = useForm({
    defaultValues: formData,
  });

  const [skills, setSkills] = useState(formData?.skills || []);

  const handleAddSkill = () => {
    clearErrors();

    setSkills((prevSkills) => [...prevSkills, { titleSkill: '', percentageSkill: '' }]);
    const newIndex = skills.length;
    setValue(`skills[${newIndex}].titleSkill`, '');
    setValue(`skills[${newIndex}].percentageSkill`, '');
  };

  const handleDeleteSkill = (index) => {
    setSkills((prevSkills) => {
      const updatedSkills = [...prevSkills];
      updatedSkills.splice(index, 1);
      return updatedSkills;
    });
  };

  const handleSkillChange = (index, field, value) => {
    setSkills((prevSkills) => {
      const updatedSkills = [...prevSkills];
      updatedSkills[index][field] = value;
      return updatedSkills;
    });
    setValue(`skills[${index}].${field}`, value);
    trigger(`skills[${index}].${field}`);
  };

  const onSubmit = (data) => {
    onNext({
      ...data,
      skills,
    });
  };

  const watchedSkills = watch('skills', skills);
  console.log('Skills:', watchedSkills);

  return (
    <>
      <h2 className="mb-5 items-center">add some skills</h2>
      <form className='w-3/4' onSubmit={handleSubmit(onSubmit)}>
        <div className='skills-form flex w-full items-center'>
          <div className="education-experience w-full flex flex-col">
            <div className='label-and-plus flex flex-row w-full justify-center' >
              <label htmlFor="skills">skills  <button type="button" onClick={handleAddSkill}>
                <FontAwesomeIcon color='green' icon={faPlus} />
              </button></label>
            </div>
            <div className="flex flex-col justify-center">
              {skills.map((skill, index) => (
                <div key={index} className="skill-input flex items-center flex-row ">
                  <div className="input-and-error">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter skill title"
                      id={`titleSkill_${index}`}
                      {...register(`skills[${index}].titleSkill`, validationRules.titleSkill)}
                      value={skill.titleSkill}
                      onChange={(e) => {
                        setValue(`skills[${index}].titleSkill`, e.target.value);
                        trigger(`skills[${index}].titleSkill`);
                        handleSkillChange(index, 'titleSkill', e.target.value);
                      }}
                    />
                    {errors.skills?.[index]?.titleSkill && (
                      <span className="text-danger">title is required</span>
                    )}
                  </div>
                  <div className='input-and-error'>
                    <select
                      className="form-control"
                      id={`percentageSkill_${index}`}
                      {...register(`skills[${index}].percentageSkill`, validationRules.percentageSkill)}
                      value={skill.percentageSkill}
                      onChange={(e) => {
                        setValue(`skills[${index}].percentageSkill`, e.target.value);
                        trigger(`skills[${index}].percentageSkill`);
                        handleSkillChange(index, 'percentageSkill', e.target.value);
                      }}
                    >
                      <option value="">Select skill level</option>
                      <option value="10%">Beginner</option>
                      <option value="50%">Intermediate</option>
                      <option value="80%">Expert</option>
                      <option value="100%">Advanced</option>
                    </select>
                    {errors.skills?.[index]?.percentageSkill && (
                      <span className="text-danger">percentage is required</span>
                    )}
                  </div>

                  <div className='flex items-center ml-3'>
                    <button type="button" onClick={() => handleDeleteSkill(index)} >
                      <FontAwesomeIcon color='red' icon={faTrashCan} /></button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
        <div className="flex justify-between mt-3">
          <Button onClick={onPrevious}>Previous</Button>
          <Button disabled={skills.length === 0} >Next</Button>

        </div>

      </form>
    </>
  );
}

export default Skills;
