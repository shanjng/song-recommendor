import React, { useState, useEffect } from 'react';
import { getSongLyrics } from '../../utils/API';
import './Section.css';

const LyricsSection = (props) => {
  const [lyrics, setLyrics] = useState('');
  const song = props.song;
  const type = 'Lyrics';

  useEffect(() => {
    // console.log("Rerender of Section Lyrics")
    // props.onLoad('lyrics');
  });

  useEffect(() => {
    if (song.name !== 'No Song Playing') {
      getSongLyrics(song.name, song.artists[0])
        .then((lyrics) => {
          const newLyrics = lyrics.data.split('\n').map((str) => <p>{str}</p>);
          setLyrics(newLyrics);
        })
        .catch((err) => console.log(err));
    }
  }, [song]);

  return (
    <div
      className='section'
      style={lyrics === '' ? { display: 'none' } : { backgroundColor: 'green' }}
    >
      <div className='info'>
        <p>
          <b>{type}</b> <br />
          {song.name === 'No Song Playing'
            ? ''
            : `${song.name} - ${song.artists}`}
        </p>
        <div className='lyrics'>{lyrics}</div>
      </div>
    </div>
  );
};

export default LyricsSection;
