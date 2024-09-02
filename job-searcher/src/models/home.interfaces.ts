export interface ICategory {
  _id: number;
  name: string;
  openings: number;
}
export interface ICountry {
  _id: number;
  countryName: string;
}
export interface IJobInformation {
  workShift: IField[],
  postedOn: IField[],
  openings: IField[],
  jobLevel: IField[],
  jobXp: IField[],
  remote: IField[],
}
export interface IFeaturedJobs {
  _id: number;
  jobTitle: string;
  city: string;
  jobCategory: string;
  jobDescription: string;
  type: string;
  time: string;
  logo: string;
  salaryRange: string;
  jobInformation: IJobInformation[];
  responsibilities: IResponsibilities[];
  criteria: ICriteria[];
  jobSkills: ISkills[];
}

export interface ICriteria {
  value: string,
}
export interface IResponsibilities {
  value: string,
}
export interface INews {
  _id: number;
  date: string;
  newsTitle: string;
  description: string;
  newsImage: string;
}
export interface ISkills {
  _id: number,
  title: string,
}
export interface IEducationAndExperience {
  debut: string,
  fin: string,
  xpTitle: string,
  university: string,
}
export interface IPortfolio {
  photo: string,
}
export interface IField {
  value: string | number,
  label: string
}
export interface ICustomFields {
  birthCity: IField[],
  martialStatus: IField[],
  searchingForJob: IField[],
  JoiningDate: IField[],
  familyMembers: IField[],
  jobXp: IField[],
}
