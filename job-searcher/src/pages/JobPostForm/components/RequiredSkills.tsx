/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../components/Button/Button';
import validationRules from '../../../validationRules';

function RequiredSkills({ onNext, onPrevious, formData }) {
  const {
    handleSubmit, watch, clearErrors, setValue, trigger, register, formState: { errors },
  } = useForm({
    defaultValues: formData,
  });

  const [skills, setSkills] = useState(formData?.skills || []);

  const handleAddSkill = () => {
    clearErrors();

    setSkills((prevSkills) => [...prevSkills, { title: '' }]);
    const newIndex = skills.length;
    setValue(`jobSkills[${newIndex}].title`, '');
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
    setValue(`jobSkills[${index}].${field}`, value);
    trigger(`jobSkills[${index}].${field}`);
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
      <h2 className="mb-5 items-center">add the required skills</h2>
      <form className='w-[50%]' onSubmit={handleSubmit(onSubmit)}>
        <div className='skills-form flex w-full items-center'>
          <div className="education-experience w-full flex flex-col">
            <div className='label-and-plus flex flex-row w-full justify-center' >
              <label htmlFor="skills">skills  <button type="button" onClick={handleAddSkill}>
                <FontAwesomeIcon color='green' icon={faPlus} />
              </button></label>
            </div>
            <div className="flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="skill-input flex items-center flex-row ">
                    <div className="input-and-error">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter skill title"
                        id={`title${index}`}
                        {...register(`jobSkills[${index}].title`, validationRules.titleSkill)}
                        value={skill.title}
                        onChange={(e) => {
                          setValue(`jobSkills[${index}].title`, e.target.value);
                          trigger(`jobSkills[${index}].title`);
                          handleSkillChange(index, 'title', e.target.value);
                        }}
                      />
                      {errors.skills?.[index]?.title && (
                        <span className="text-danger">title is required</span>
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
        </div>
        <div className="flex justify-between mt-3">
          <Button onClick={onPrevious}>Previous</Button>
          <Button disabled={skills.length === 0} >Next</Button>

        </div>

      </form>
    </>
  );
}

export default RequiredSkills;
