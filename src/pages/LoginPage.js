import React from 'react';
import { generateRandomString } from '../utils/functions';
import * as QueryString from "query-string"
import './LoginPage.css';

const LoginPage = () =>  {
    var scope = 'user-read-private user-read-email user-read-currently-playing user-modify-playback-state';
    var state = generateRandomString(16);
      
    const handleLogin = () => {
        var redirectURL = ('https://accounts.spotify.com/authorize?' + 
            QueryString.stringify({
            response_type: 'token',
            client_id: process.env.REACT_APP_CLIENT_ID,
            scope: scope,
            redirect_uri: process.env.REACT_APP_REDIRECT_URI,
            state: state
            }));

        window.location = redirectURL;
    };
    
    return(
        <div className="login">
            <h1>Login Page</h1>
            <p>
                <button className="spotify-login" type="submit" onClick={handleLogin}>
                Login to Spotify
                </button>
            </p>
            
        </div>
    );
}

export default LoginPage;

