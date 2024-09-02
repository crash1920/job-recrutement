import { faFacebookF, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Button from '../../components/Button/Button';
import validationRules from '../../validationRules';
import './Login.css';
import { login, setError } from './store/LoginSlice';
import { RootState } from '../../store/store';

type LoginFormValues = {
  username: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const error = useSelector((state: RootState) => state.auth.error);
  const location = useLocation();
  const path = location.state ? location.state.pathname : '/';
  // const { from } = location.state || { from: { pathname: '/' } }; // Default redirect path

  const jobId = location.state ? location.state.jobId : null;
  const jobTitle = location.state ? location.state.jobTitle : null;
  console.log(jobId, jobTitle);
  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      localStorage.setItem('token', JSON.stringify({ user: decoded, token }));
    }
  }, [token]);

  const connected = localStorage.getItem('token');
  const userIsConnected = !!connected;

  const onSubmit = async (data: LoginFormValues) => {
    await dispatch(login(data));
  };

  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (error) {
      setApiError(error);
      dispatch(setError(''));
    } else if (token) {
      navigate(path, { state: { jobId, jobTitle } });
    }
  }, [error, token, dispatch, navigate, path]);

  if (userIsConnected) {
    return (
      <div className="success-page m-60">
        <div className='flex flex-col items-center'>
          <h4 className="success-page__message text-5xl font-semibold animate-pulse-once  mb-5">You are already connected</h4>
        </div>
      </div>
    );
  }
  return (
    <div className="py-20 bg-gray-100">
      <div className=" mx-auto w-3/4 py-24">
        <div className="login-methods grid grid-cols-2 mx-[7%]">
          <div className="left-form ">
            <h4 className="left-form-title">Using social accounts</h4>
            <p>Donec sed tempus enim, a congue risus. euismod massa a quam viverra interdum.</p>
            <div className=" flex  items-start w-full mb-4  ">
              <Button customClassName="  py-4 w-full rounded-md  duration-300  hover:bg-blue-900 focus:outline-none bg-blue-facebook">
                <div className="flex flex-start">
                  <span className=" ml-7  text-white-standard text-sm font-medium ">
                    <FontAwesomeIcon icon={faFacebookF} className="mr-2" />  sign in with facebook</span>
                </div></Button></div>
            <div className=" flex  items-start w-full mb-4 ">
              <Button customClassName="  py-4 w-full rounded-md  duration-300  hover:bg-blue-900 focus:outline-none bg-blue-linkedin">
                <div className="flex flex-start">
                  <span className=" ml-7  text-white-standard text-sm font-medium ">
                    <FontAwesomeIcon icon={faLinkedinIn} className="mr-2" />  sign in with linkedin</span>
                </div></Button>
            </div>
            <div className=" flex  items-start w-full mb-4 ">
              <Button customClassName="  py-4 w-full rounded-md  duration-300  hover:bg-red-700 focus:outline-none bg-red-google">
                <div className="flex flex-start">
                  <span className=" ml-7  text-white-standard text-sm font-medium ">
                    <FontAwesomeIcon icon={faGooglePlusG} className="mr-2" />  sign in with google</span>
                </div></Button>
            </div>
          </div>
          <div className="left-form right-form ">
            <h4 className="left-form-title right-form-title ">Login using email</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="login-input-container flex items-center flex-row gap-4">

                <div className="login-form w-full ">
                  <input
                    type="text"
                    className="w-full"
                    id="emailOrUsername"
                    placeholder="Enter your email or username"
                    {...register('username', validationRules.username)}
                  />
                  {errors.username && <span className="text-danger">Email or username is required</span>}</div>
              </div>
              <div className="login-form w-full">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  {...register('password', { required: 'Password is required' })}
                />
                {apiError && !errors.password && <span className="text-danger">{apiError}</span>}
                {errors.password && <span className="text-danger">{errors.password.message}</span>}</div>
              <div className="flex justify-between items-center 00 ">
                <div><span className="text-white-standard">forgot password ? </span></div>
                <div><Button customClassName="text-white-standard text-sm px-7 py-2 rounded-md  duration-300  hover:bg-black-standard focus:outline-none  bg-black-10 ">login</Button></div>
              </div>
            </form>
            <div className="flex items-center justify-center mt-6">
              <span className="text-white-standard ">Don t have an account? <a href="/signUp" className="font-bold">Sign up now</a></span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
export default Login;
