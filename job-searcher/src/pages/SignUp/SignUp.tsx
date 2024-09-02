import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';

import validationRules from '../../validationRules';
import './SignUp.css';

import { createUser } from './store/SignupSlice';
import { IUsers } from '../../models/users.interfaces';
import { RootState } from '../../store/store';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IUsers>();
  const [fileName, setFileName] = useState<string>('');
  const [termsAgreed, setTermsAgreed] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      localStorage.setItem('token', JSON.stringify({ user: decoded, token }));
    }
  }, [token]);
  const connected = localStorage.getItem('token');
  const userIsConnected = !!connected;
  const role = '';
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };
  const { error, users } = useSelector((state: RootState) => state.users);
  const saltRounds = 10;
  const onSubmit = async (data: IUsers) => {
    bcrypt
      .hash(data.password, saltRounds)
      .then((hash: string) => {
        if (termsAgreed) {
          const updatedData = {
            ...data,
            resume: fileName,
            role,
            password: hash,
            confirmPassword: hash,
          };
          dispatch(createUser(updatedData))
            .then((response: any) => {
              if (response.payload) {
                alert('Successfully registered!');
                navigate('/Success', { state: { message: 'You successfully created an account' } });
                window.scrollTo(0, 0); // Scroll to top of the page
              } else {
                alert('Failed to register. Please try again.');
              }
            })
            .catch((err: any) => {
              alert(`Error: ${err.message}`);
            });
        }
      });
  };

  if (userIsConnected) {
    return (
      <div className="success-page m-60">
        <div className='flex flex-col items-center'>
          <h4 className="success-page__message text-5xl font-semibold animate-pulse-once  mb-5">You  already have an account</h4>

        </div>
      </div>
    );
  }
  return (

    <div className="py-20 bg-gray-100">
      <div className=" mx-auto w-3/4 py-24">
        <div className="form-container flex flex-col items-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-5xl font-light text-center mb-8 text-gray-dark ">If you are a Fresher, Apply here</h3>
            <div className="form-group">
              <label htmlFor="username">username</label>
              <div className="input-and-error">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter  your username "
                  {...register('username', validationRules.username)}
                />
                {errors.username && <span className="text-danger">username  is required</span>}</div>
            </div>
            <div className="form-group">
              <label htmlFor="firstName">first name</label>
              <div className="input-and-error">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Enter your first name"
                  {...register('firstName', validationRules.firstName)}
                />
                {errors.firstName && <span className="text-danger">first name is required</span>}</div>
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last name</label>
              <div className="input-and-error">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Enter  your last name"
                  {...register('lastName', validationRules.lastName)}
                />
                {errors.lastName && <span className="text-danger">last name  is required</span>}</div>
            </div>
            <div className="form-group">
              <label htmlFor="lastName">birthday</label>
              <div className="input-and-error">
                <input
                  type="date"
                  className="form-control"
                  id="birthday"
                  placeholder="Enter  your last name"
                  {...register('birthday', validationRules.date)}
                />
                {errors.birthday && <span className="text-danger">birthday  is required</span>}</div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-and-error">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  {...register('email', validationRules.email)}
                />
                {errors.email && <span className="text-danger">Email is required and must be a valid email address</span>}</div>
            </div>
            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number</label>
              <div className="input-and-error">
                <input
                  type="tel"
                  className="form-control"
                  id="mobileNumber"
                  placeholder="Enter a mobile number"
                  {...register('mobileNumber', validationRules.mobileNumber)}
                />
                {errors.mobileNumber && <span className="text-danger">mobile Number is required and must be a valid mobile Number</span>}</div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-and-error">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  {...register('password', validationRules.password)}
                />
                {errors.password && <span className="text-danger">Password is required and must be at least 8 characters long</span>}</div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-and-error">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm password"
                  {...register('confirmPassword', validationRules.confirmPassword)}
                />
                {errors.confirmPassword && <span className="text-danger">Passwords do not match</span>}</div>
            </div>
            <div className="form-group ml-[8.5rem]">
              <label id="upload-resume-button" htmlFor="resume-input">
                Upload Resume
              </label>
              <div className="flex flex-row w-full gap-7 items-center">
                <input
                  id="resume-input"
                  type="file"
                  name="resume"
                  accept=".doc,.docx,.rtf,.pdf"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <div className="flex flex-col "><p className="">{fileName}</p>  <p className="text-red-10 font-bold "> doc,docx,rtf,pdf-2MB max</p></div>
              </div>
            </div>
            <div className=" flex flex-row text-center items-center max-w-lg mx-auto my-10"><input type="checkbox" className="mb-4" required onChange={(e) => setTermsAgreed(e.target.checked)}></input><span>I agreed to the Terms and Conditions of job.com.
              I have reviewed the default Mailer & Communications settings.</span></div>
            <div className=" text-center ">

              <Button customClassName="register-button">Register now</Button>
              {error ? (
                <div className="text-red-500">{error}</div>
              ) : (
                users.length > 0 && (
                  <div className="text-green-500">Form submitted successfully!</div>
                )
              )}
            </div>

          </form>

        </div>

      </div>
    </div >
  );
};

export default SignUp;
