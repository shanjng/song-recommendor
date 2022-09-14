import React, { useEffect } from 'react';
import { generateRandomString, isValidSession } from '../utils/functions';
import * as QueryString from 'query-string';
import { useHistory } from 'react-router-dom';
import './LoginPage.css';
import logo from '../assets/anime-girl-music.png';
// import * as GiIcons from 'react-icons/gi';

const LoginPage = () => {
  var scope =
    'user-read-private user-read-email user-read-currently-playing user-modify-playback-state';
  var state = generateRandomString(16);
  var history = useHistory();

  useEffect(() => {
    let isValidSessionBool = isValidSession();

    if (isValidSessionBool) {
      history.push('/home');
    }
  });

  const handleLogin = () => {
    const redirect_uri =
      process.env.REACT_APP_TESTING === 'true'
        ? 'http://localhost:3000/redirect'
        : `https://${window.location.hostname}/redirect`;

    var redirectURL =
      'https://accounts.spotify.com/authorize?' +
      QueryString.stringify({
        response_type: 'token',
        client_id: '771a396bfd864a1893e6d23c02e6e269',
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      });

    window.location = redirectURL;
  };

  return (
    <div className='login'>
      <img src={logo} alt='' />
      <p>
        <button className='spotify-login' type='submit' onClick={handleLogin}>
          {/* <GiIcons.GiBrainFreeze></GiIcons.GiBrainFreeze> */}
          LOGIN
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
