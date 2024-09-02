import { faFacebookSquare, faLinkedin, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import {
  faBriefcase, faCalendarDays, faCheckSquare, faEnvelope, faLocationDot, faMobile,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { RootState } from '../../store/store';
import './CandidateDetails.css';
import { fetchCandidateById } from './store/CandidateDetailsSlice';
import { IField } from '../../models/candidates.interfaces';

function CandidateDetails() {
  const { id } = useParams();
  const { candidate } = useSelector((state: RootState) => state.candidateDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCandidateById(id));
  }, []);
  const animateProgressBar = () => {
    const progressBars = document.querySelectorAll('.animate');
    progressBars.forEach((progressBar) => {
      const progressBarPosition = progressBar.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (progressBarPosition < windowHeight) {
        const progressElement = progressBar.querySelector('.progress') as HTMLElement;
        const progressBarWidth = progressElement.style.width;
        progressElement.style.width = '0%';
        setTimeout(() => {
          progressElement.style.width = progressBarWidth;
        }, 2000);
        progressBar.classList.remove('animate');
      }
    });
  };

  window.addEventListener('scroll', animateProgressBar);

  return (
    <div>
      <section className="backgroundimage-container candidate-banner  bg-candidateBanner ">
        <div className="wrapper w-3/4 mx-auto flex flex-row gap-5 pt-52 pb-5 items-center justify-between ">
          <div className="image-and-candidate-name flex flex-row gap-5 items-center ">
            <div className="">
              <img src={`${process.env.PUBLIC_URL}/assets/candidates/${candidate?.photoCandidate}`} className="rounded-full -mb-32 border-4 border-solid border-white-standard" />
            </div>
            <div className="flex flex-col pt-24">
              <h4 className="text-white-standard text-3xl leading-9 font-light">{candidate?.firstName} {candidate?.lastName}</h4>
              <p className="text-white-standard leading-6 text-base">{candidate?.jobTitle}</p>
            </div>
          </div>
          <div className="social-media-icons flex pt-24 gap-5 ">
            <a href={candidate?.facebookLink} className=" w-full relative  text-3xl  text-blue-facebook">
              <FontAwesomeIcon icon={faFacebookSquare} />
            </a>
            <a href={candidate?.twitterLink} className="text-3xl relative  text-blue-twitter">
              <FontAwesomeIcon icon={faTwitterSquare} />
            </a>
            <a href={candidate?.githubLink} className=" social-candidate-icon relative text-3xl  text-blue-linkedin">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
      </section>
      <div className="body-page  py-28 bg-dirtyWhite ">
        <div className="body-wrapper  mx-auto w-3/4">
          {/*         left boxes  */}
          <div className="boxes-container flex items-start gap-5">
            <div className="left-boxes-container flex flex-col w-[70%]">
              <div className="box mb-5  bg-white-standard p-8  shadow-2xl">

                <h5 className="featured-title">
                  about me
                </h5>
                <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. orci urna.
                  In et augue ornare,
                  tempor massa in, luctus sapien. Proin a
                  diam et dui fermentum dolor molestie vel id neque.
                  Donec sed tempus enim, a congue risus.
                  Pellen tesqu euismod massa a quam viverra interdum urna
                  vel id neque, Fermentum viverra eros.
                  Praesent neque purus, rhoncus nec nibh non, mollis sodales odio.</p>

              </div>
              <div className="box mb-5  bg-white-standard p-8  shadow-2xl">

                <h5 className="featured-title">
                  Custom Fields
                </h5>
                <div className="box-list grid grid-cols-3 gap-5">
                  {candidate?.customFields.map((field, index) => (
                    Object.entries(field).map(([key, values]) => (
                      values.map((value: IField, idx: number) => (
                        <div className="flex items-center gap-5" key={`${index}_${key}_${idx}`}>
                          <div className="flex mb-6 text-red-600">
                            <FontAwesomeIcon icon={faCheckSquare} />
                          </div>
                          <div className="flex flex-col items-start">
                            <h4 className="font-medium text-base">{value.label}</h4>
                            <span className="location">{value.value}</span>
                          </div>
                        </div>
                      ))
                    ))
                  ))}
                </div>

              </div>
              <div className="box mb-5 bg-white-standard p-8 shadow-2xl">
                <h5 className="featured-title">Skills</h5>
                {candidate?.skills.map((skill, index) => (
                  <div className="skill flex flex-row items-center justify-between" key={index}>
                    <div className="skill-text text-base font-bold w-[20%]">{skill.titleSkill}</div>
                    <div className="progress-bar flex-grow h-2 bg-gray-300 w-[70%] animate">
                      <div className={'progress h-full bg-blue-600'} style={{ width: `${skill.percentageSkill}` }}></div>
                    </div>
                    <div className="percentage ml-4 text-sm font-bold w-[10%]">{skill.percentageSkill}</div>
                  </div>
                ))}
              </div>

              <div className="box mb-5 bg-white-standard p-8 shadow-2xl">
                <h5 className="featured-title">Education </h5>
                {candidate?.education.map((eduExp, index) => (
                  <div key={index} className="education-description flex flex-col">
                    <div className="education-period flex mb-5 w-[28%] h-[10%]">
                      <label>{eduExp.startDate} - {eduExp.endDate}</label>
                    </div>
                    <h4 className="text-xl text-black-10 font-normal"><span className='text-black-standard'>title : </span>{eduExp.titleEducation}</h4>
                    <span className="location mb-4"><span className='text-black-standard'>University Name : </span>{eduExp.university}</span>
                    <div className='flex flex-col w- full'>
                      <label className="text-xl text-black-10 font-normal">description :</label>
                      <p className="mb-4 whitespace-normal break-words" >{eduExp.description}</p>
                    </div>
                  </div>
                ))}
                <h5 className="featured-title">job Experience</h5>
                {candidate?.jobExperience.map((jobExp, index) => (
                  <div key={index} className="education-description flex flex-col">
                    <div className="education-period flex mb-5 w-[28%] h-[10%]">
                      <label>{jobExp.startDate} - {jobExp.endDate}</label>
                    </div>
                    <h4 className="text-xl text-black-10 font-normal">title : {jobExp.titleJobExperience}</h4>
                    <span className="location mb-4"><span className='text-black-standard'>Company Name : </span> {jobExp.company}</span>
                    <span className="location mb-4"><span className='text-black-standard'>Contract Type : </span>{jobExp.contractType}</span>
                    <span className="location mb-4"><span className='text-black-standard'>Country  : </span>{jobExp.country}</span>
                    <div className='flex flex-col w- full'>
                      <label className="text-xl text-black-10 font-normal">description :</label>
                      <p className="mb-4 whitespace-normal break-words" >{jobExp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="box mb-5 bg-white-standard p-8 shadow-2xl ">
                <h5 className="featured-title">Certifications</h5>
                {candidate?.certif.map((certification, index) => (
                  <div key={index} className="certification  flex flex-row items-center  w-full ">

                    <div className="education-period flex  w-[30%]">
                      <label>{certification.startDate} - {certification.endDate}</label>
                    </div>
                    <div className="flex  w-[30%]" >
                      <label className="skill-text text-base font-bold mr-1 " >certification name : </label>
                      <h5 className=" text-base  w-[20%]">{certification.CertifTitle}</h5>
                    </div>
                    <div className="flex  w-[40%]">
                      <label className="skill-text text-base font-bold mr-1 " >description : </label>
                      <p className="items-center flex flex-row ">{certification.description}</p>
                    </div>
                  </div>
                ))}
                <h5 className="featured-title">Languages</h5>
                {candidate?.languages.map((language, index) => (
                  <div key={index} className="language flex flex-row items-center justify-between">
                    <h4 className="skill-text text-base font-bold w-[20%]">{language.titleLanguage}</h4>
                    <div className="progress-bar flex-grow h-2 bg-gray-300 w-[70%] animate">
                      <div className={'progress h-full bg-blue-600'} style={{ width: `${language.percentageLanguage}` }}></div>
                    </div>
                    <div className="percentage ml-4 text-sm font-bold w-[10%]">{language.percentageLanguage}</div>
                  </div>
                ))}
              </div>
            </div>

            {/*         right  boxes  */}
            <div className="right-boxes-container flex flex-col w-[30%] ">
              <div className="box mb-5  bg-white-standard p-8  shadow-2xl">

                <h5 className="featured-title">
                  Candidate Details
                </h5>
                <div className="flex flex-col">
                  <div className="flex flex-row gap-2 items-center mb-5">
                    <span className="icon-container">
                      <FontAwesomeIcon icon={faCalendarDays} ></FontAwesomeIcon>
                    </span>
                    <div className="flex flex-col">
                      <h4>Date of birth since</h4>
                      <span className="location">{candidate?.customFields[0].birthCity[0].value}</span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 items-center mb-5">
                    <span className="icon-container">
                      <FontAwesomeIcon icon={faLocationDot} ></FontAwesomeIcon>
                    </span>
                    <div className="flex flex-col">
                      <h4>Location</h4>
                      <span className="location">{candidate?.customFields[0]?.birthCity[0]?.value} </span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 items-center mb-5">
                    <span className="icon-container">
                      <FontAwesomeIcon icon={faBriefcase} ></FontAwesomeIcon>
                    </span>
                    <div className="flex flex-col">
                      <h4>Member since </h4>
                      <span className="location">October 2002</span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 items-center mb-5">
                    <span className="icon-container">
                      <FontAwesomeIcon icon={faEnvelope} ></FontAwesomeIcon>
                    </span>
                    <div className="flex flex-col">
                      <h4>Email address</h4>
                      <span className="location">{candidate?.email}</span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 items-center mb-5">
                    <span className="icon-container">
                      <FontAwesomeIcon icon={faMobile} ></FontAwesomeIcon>
                    </span>
                    <div className="flex flex-col">
                      <h4>Contact number</h4>
                      <span className="location">
                        +33 0658042435</span>
                    </div>
                  </div>

                </div>

              </div>
              <div className="box mb-5  bg-white-standard p-8  shadow-2xl">
                <h5 className="featured-title">
                  Contact Me
                </h5>
                <div className="flex flex-col " >
                  <form method="post" className="contact-employer">
                    <input type="text" name="name" placeholder="Your name"></input>
                    <input type="email" name="email" placeholder="Your email"></input>
                    <input type="subject" name="subject" placeholder="Your subject"></input>
                    <textarea placeholder="Your message"></textarea>
                    <Button onClick={() => alert('clicked')} customClassName="recent-jobs-button w-full" >Send</Button>
                  </form>

                </div>
              </div>
              <div className="box mb-5  bg-white-standard p-8  shadow-2xl">
                <h5 className="featured-title">
                  Candidate Portfolio
                </h5>
                {/* <div className="grid grid-cols-3 gap-2">
                  {candidate?.portfolio.map((item, index) => (
                    <div key={index}>
                      <img className="block w-full rounded-lg"
                       src={`${process.env.PUBLIC_URL}/assets/Blogs/${item.photo}`} />
                    </div>
                  ))}
                </div> */}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateDetails;
