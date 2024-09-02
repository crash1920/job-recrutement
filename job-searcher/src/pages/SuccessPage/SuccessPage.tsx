import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state ? location.state.message : null;
  const token = localStorage.getItem('token');
  const username = token ? JSON.parse(token).user.username : null;
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/');
      window.scrollTo(0, 0); // Scroll to top of the page
    }, 5000);

    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div className="success-page m-60">
      <div className='flex flex-col items-center'>
        <FontAwesomeIcon className="w-full text-7xl text-green-500 animate-bounce-once" color='green' icon={faCircleCheck}></FontAwesomeIcon>
        <h4 className="success-page__message text-5xl font-semibold animate-pulse-once  mb-5">{message}</h4>
        <h5 className="success-page__message text-3xl font-semibold animate-pulse-once  ">Thank You {username}</h5>

      </div>
    </div>
  );
};

export default SuccessPage;
