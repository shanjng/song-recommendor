import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getHashParams } from '../utils/functions';

const RedirectPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [didGrabHashParams, setDidGrabHashParams] = useState(false);

  useEffect(() => {
    if (didGrabHashParams) {
      navigate('/');
    }
  });

  try {
    const hashParams = getHashParams(location.hash);
    const expiryTime = new Date().getTime() + hashParams.expires_in * 1000;
    localStorage.setItem('params', JSON.stringify(hashParams));
    localStorage.setItem('expiry_time', expiryTime);
    if (!didGrabHashParams) {
      setDidGrabHashParams(true);
    }
  } catch (error) {
    return <div>Error</div>;
  }

  return <div>Redirecting...</div>;
};

export default RedirectPage;
