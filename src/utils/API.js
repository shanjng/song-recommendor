import axios from 'axios';
import * as QueryString from "query-string";

const setSpotifyAuthHeader = () => {
  try {
    const params = JSON.parse(localStorage.getItem('params'));
    if (params) { // sets auth header for all future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${params.access_token}`;
    }
  } catch (error) {
    console.log('Error setting auth', error);
  }
};

// const setMusixMatchHeader = () => {
//   const apiKey = 'c779594d43223e0b40345e1b61b2c18c'
//   axios.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
// }

export const getCurrentlyPlaying = () => {
  setSpotifyAuthHeader();
  const response = axios.get('https://api.spotify.com/v1/me/player/currently-playing');
  return response;
};

export const getRecommendations = async seedTrackId => {
  setSpotifyAuthHeader();
  var url = ('https://api.spotify.com/v1/recommendations?' + 
    QueryString.stringify({
      seed_tracks: seedTrackId,
    }));

  var response = await axios.get(url);
  const firstRecommendationSongId = response.data.tracks[0].id;

  url = ('https://api.spotify.com/v1/tracks/' + firstRecommendationSongId);

  response = await axios.get(url);

  return response;
}

export const queueSong = id => {
  setSpotifyAuthHeader();
  const uri = `spotify:track:${id}`;
  const response = axios.post(`https://api.spotify.com/v1/me/player/queue?uri=${uri}`);

  return response;
}

export const queueAndPlaySong = async id => {
  await queueSong(id);
  const response = axios.post('https://api.spotify.com/v1/me/player/next');
  
  return response;
}

export const getAllPlaylists = () => {
  setSpotifyAuthHeader();
  const url = 'https://api.spotify.com/v1/me/playlists';
  const response = axios.get(url);

  return response;
}

export const getLyrics = (trackName) => {
  // setMusixMatchHeader();

  const response = axios.get('https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?' + QueryString.stringify({
    api_key: 'c779594d43223e0b40345e1b61b2c18c',
    q_track: trackName,
  }));

  return response;
}