import React, { useState, useEffect } from 'react';
import { getMusicVideo } from '../../utils/API';
import './Section.css';

const MusicVideoSection = (props) => {
  const [videoUrl, setVideoUrl] = useState('');
  const song = props.song;

  useEffect(() => {
    // console.log("Rerender of Section " + type);
    // props.onLoad()
  });

  useEffect(() => {
    if (!song || song.name === 'No Song Playing') return;

    console.log('Making getMusicVideo call()');
    getMusicVideo(song.name, song.artists[0])
      .then((result) => {
        if (!result) return;

        const firstResultVideoId = result.data.items[0].id.videoId;

        const firstResultVideoUrl = `https://www.youtube.com/embed/${firstResultVideoId}?autoplay=1&mute=1`;

        setVideoUrl(firstResultVideoUrl);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [song]);

  return (
    <div className="section">
      <div className="info">
        <p>
          {song.name === 'No Song Playing'
            ? ''
            : `${song.name} - ${song.artists}`}
        </p>
        <iframe
          title="music video"
          width="70%"
          height="80%"
          src={videoUrl}
        ></iframe>
      </div>
    </div>
  );
};

export default MusicVideoSection;
