import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../pages/Login/store/LoginSlice';

const TokenExpirationManager = () => {
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let timer: NodeJS.Timeout;

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    clearInterval(timer);
    navigate('/login');
  };

  useEffect(() => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const token = localStorage.getItem('token');
    const exp = token ? JSON.parse(token).user.exp : null;

    if (token && exp) {
      const calculateRemainingTime = () => {
        const timeDifference = exp - currentTimestamp;
        if (timeDifference > 0) {
          setRemainingTime(timeDifference);
        } else {
          handleLogout();
        }
      };

      calculateRemainingTime();

      timer = setInterval(() => {
        calculateRemainingTime();
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
    return () => { };
  }, []);

  useEffect(() => {
    setInitialCheckDone(true);
  }, []);

  if (!initialCheckDone) {
    return null;
  }

  if (remainingTime === null) {
    return <div>Token has expired</div>;
  }

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div>
      Token expires in {minutes} minutes and {seconds} seconds
    </div>
  );
};

export default TokenExpirationManager;
