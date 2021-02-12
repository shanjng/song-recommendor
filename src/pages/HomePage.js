import React, { useEffect, useState } from 'react';
import { isValidSession } from '../utils/functions';
import { getCurrentlyPlaying, getRecommendations } from '../utils/API';
import { useHistory } from 'react-router-dom';
import CurrentlyPlayingSection from '../components/Sections/CurrentlyPlayingSection';
import RecommendedSection from '../components/Sections/RecommendedSection';
import LyricsSection from '../components/Sections/LyricsSection';
import MusicVideoSection from '../components/Sections/MusicVideoSection';
import './HomePage.css';
import _ from 'lodash';
import ReactFullpage from '@fullpage/react-fullpage';
import updownkeys from '../assets/up-down-keys.png';

const HomePage = () => {
  const [currentlyPlayingSong, setCurrentlyPlayingSong] = useState({
    type: 'Now Playing',
    name: 'No Song Playing',
    artists: [],
    imageUrl: '',
  });
  const [recommendedSong, setRecommendedSong] = useState({
    type: 'Recommended',
    name: '',
    id: '',
    artists: [],
    imageUrl: '',
  });
  const [mouseIdle, setMouseIdle] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const updateSongs = async () => {
      const isValidSessionBool = isValidSession();

      if (!isValidSessionBool) {
        history.push('/login');
        return;
      }

      var result = await getCurrentlyPlaying();

      var incomingSong = {};

      if (
        result.data === '' ||
        result.data.currently_playing_type === 'unknown'
      ) {
        incomingSong = {
          type: 'Now Playing',
          name: 'No Song Playing',
          artists: [],
          imageUrl: '',
        };
      } else {
        var songJSONPath = result.data.item;
        incomingSong = {
          type: 'Now Playing',
          name: songJSONPath.name,
          id: songJSONPath.id,
          artists: songJSONPath.artists.map((artist) => artist.name + ' '),
          imageUrl:
            songJSONPath.album.images[songJSONPath.album.images.length - 3].url,
        };
      }

      if (!_.isEqual(incomingSong, currentlyPlayingSong)) {
        result = await getRecommendations(incomingSong.id);

        const songJSONPath = result.data;

        const incomingRecommendation = {
          type: 'Recommended',
          name: songJSONPath.name,
          id: songJSONPath.id,
          artists: songJSONPath.artists.map((artist) => artist.name + ' '),
          imageUrl:
            songJSONPath.album.images[songJSONPath.album.images.length - 3].url,
        };

        setCurrentlyPlayingSong(incomingSong);
        setRecommendedSong(incomingRecommendation);
      }
    };

    updateSongs();

    const timer = setInterval(updateSongs, 1000);

    return () => clearInterval(timer);
  }, [currentlyPlayingSong, history]);

  var timer;
  const handleMouseMove = (e) => {
    setMouseIdle(false);
    // clear previous timer
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      setMouseIdle(true);
    }, 3000);
  };

  // return (
  //   <div
  //     className={'home' + (mouseIdle ? ' mouse-idle' : ' mouse-active')}
  //     onMouseMove={(e) => handleMouseMove(e)}
  //   >
  //     <div className='scroll-container'>
  //       <CurrentlyPlayingSection song={currentlyPlayingSong} />
  //       <RecommendedSection song={recommendedSong} />
  //       <LyricsSection song={currentlyPlayingSong} />
  //       {/* <MusicVideoSection
  //         className='section'
  //         song={currentlyPlayingSong}
  //       ></MusicVideoSection> */}
  //     </div>
  //     <div className='updownkeys-img'>
  //       <img src={updownkeys} alt='' />
  //     </div>
  //   </div>
  // );
  const FullPage = () => (
    <ReactFullpage
      render={({ state, fullpageApi }) => {
        return (
          <ReactFullpage.Wrapper>
            <CurrentlyPlayingSection
              className='section'
              song={currentlyPlayingSong}
            />
            <div className='section'>
              <p>something 2</p>
            </div>
          </ReactFullpage.Wrapper>
        );
      }}
    />
  );

  return <FullPage />;
};

export default HomePage;
