import React from 'react';

interface JobQualification {
  name: string;
  selected: boolean;
}

interface Props {
  jobQualifications: JobQualification[];
  handleCheckboxChange: (index: number) => void;
  title: string;
}

const JobsQualification: React.FC<Props> = ({ jobQualifications, handleCheckboxChange, title }) => (
  <div className="right-box-container">
    <h5 className="featured-title">{title}</h5>
    {jobQualifications.map((qualification, index) => (
      <div className="flex content-between text-center gap-2 py-2" key={index}>
        <input
          type="checkbox"
          checked={qualification.selected}
          onChange={() => handleCheckboxChange(index)}
        />
        <label className="text-gray-mid">{qualification.name}</label>
      </div>
    ))}
  </div>
);

export default JobsQualification;
