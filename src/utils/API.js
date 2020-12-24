import axios from 'axios';
import * as QueryString from "query-string";

const setAuthHeader = () => {
  try {
    const params = JSON.parse(localStorage.getItem('params'));
    if (params) { // sets auth header for all future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${params.access_token}`;
    }
  } catch (error) {
    console.log('Error setting auth', error);
  }
};

export const getCurrentlyPlaying = async () => {
  setAuthHeader();
  const response = axios.get('https://api.spotify.com/v1/me/player/currently-playing');
  return response;
};

export const getRecommendations = async seedTrackId => {
  setAuthHeader();
  var url = ('https://api.spotify.com/v1/recommendations?' + 
    QueryString.stringify({
      seed_tracks: seedTrackId,
    }));

  var response = await axios.get(url);
  const firstRecommendationSongId = response.data.tracks[0].id;

  console.log(response);

  url = ('https://api.spotify.com/v1/tracks/' + firstRecommendationSongId);

  response = await axios.get(url);

  return response;
}

export const queueSong = async id => {
  setAuthHeader();
  const uri = `spotify:track:${id}`;
  const response = axios.post(`https://api.spotify.com/v1/me/player/queue?uri=${uri}`);

  return response;
}

export const queueAndPlay = async id => {
  await queueSong(id);
  const response = axios.post('https://api.spotify.com/v1/me/player/next');
  
  return response;
}