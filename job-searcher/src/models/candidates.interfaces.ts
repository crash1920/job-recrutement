export interface ICandidates {
  _id: number;
  firstName: string;
  lastName: string;
  city: string;
  jobTitle: string;
  twitterLink: string;
  facebookLink: string;
  githubLink: string;
  photoCandidate: string;
  email: string;
  skills: ISkill[];
  education: IEducation[];
  jobExperience: IJobExperience[];
  certif: ICertification[];
  languages: ILanguage[];
  customFields: ICustomField[];
}

export interface ISkill {
  titleSkill: string;
  percentageSkill: string;
}

export interface IEducation {
  startDate: string;
  endDate: string;
  university: string;
  description: string;
  country: string;
  titleEducation: string;
}

export interface IJobExperience {
  startDate: string;
  endDate: string;
  contractType: string;
  description: string;
  country: string;
  titleJobExperience: string;
  company: string;
}

export interface ICertification {
  startDate: string;
  endDate: string;
  CertifTitle: string;
  description: string;
}

export interface ILanguage {
  titleLanguage: string;
  percentageLanguage: string;
}

export interface IField {
  value: string | number,
  label: string
}
export interface ICustomField {
  birthCity: IField[],
  familyMembers: IField[],
  jobXp: IField[],
}
