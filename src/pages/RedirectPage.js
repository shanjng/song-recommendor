import React from 'react';
import { getHashParams } from '../utils/functions';

const RedirectPage = (props) => {
  try {
    const hashParams = getHashParams(props.location.hash);
    // console.log("hash params are: ", hashParams);
    const expiryTime = new Date().getTime() + hashParams.expires_in * 1000;
    localStorage.setItem('params', JSON.stringify(hashParams));
    localStorage.setItem('expiry_time', expiryTime);
    props.history.push('/');
  } catch (error) {
    return <div>Error</div>;
  }

  return <div>Redirecting...</div>;
};

export default RedirectPage;
