import React, { useState, useRef, useEffect } from 'react';
import { rgbToHex } from '../../utils/functions';
import { queueAndPlaySong } from '../../utils/API';
import ColorThief from 'colorthief';
import * as IoIcons from 'react-icons/io';
// import * as BsIcons from 'react-icons/bs';
import './Section.css';

const CurrentlyPlayingSection = (props) => {
  const [palette, setPalette] = useState(['black', 'black']);
  const [imgInlineStyle, setImgInlineStyle] = useState({
    filter: `drop-shadow(5px 5px 5px black)`,
  });
//   const [isLoaded, setIsLoaded] = useState(false);
  const song = props.song;
  const type = song.type;

  const myRef = useRef(null);

  useEffect(() => {
    // console.log("Rerender of Section " + type)
  });

  useEffect(() => {
    // props.onLoad('currentlyPlaying');
  }, []);

  const paletteUpdate = () => {
    const colorThief = new ColorThief();
    const img = myRef.current;
    const palette = colorThief.getPalette(img, 5);
    const paletteInHex = palette.map((colorArr) => rgbToHex(...colorArr));

    setPalette(paletteInHex);
    setImgInlineStyle({
      filter: `drop-shadow(5px 5px 5px ${paletteInHex[1]})`,
    });
  };

  const handleLoaded = () => {
    paletteUpdate();
//     setIsLoaded(true);
  };

  return (
    <div style={{ backgroundColor: palette[0] }} className='section'>
      {/* <div className='arrow'>
        <BsIcons.BsChevronLeft></BsIcons.BsChevronLeft>
      </div> */}
      <div className='info'>
        <p>
          <b>{type}</b> <br />
          {song.name === 'No Song Playing'
            ? ''
            : `${song.name} - ${song.artists}`}
        </p>
        <div className='img-wrapper'>
          <img
            src={song.imageUrl}
            alt=''
            ref={myRef}
            crossOrigin={'anonymous'}
            onLoad={handleLoaded}
            style={imgInlineStyle}
          />
          <div className='play-button-overlay'>
            <IoIcons.IoMdPlay
              className='play-button-icon'
              onClick={() => queueAndPlaySong(song.id)}
            />
          </div>
        </div>
      </div>
      {/* <div className='arrow'>
        <BsIcons.BsChevronRight></BsIcons.BsChevronRight>
      </div> */}
    </div>
  );
};

export default CurrentlyPlayingSection;
