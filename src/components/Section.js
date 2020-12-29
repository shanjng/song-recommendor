import React, { useState, useRef, useEffect } from 'react';
import { rgbToHex } from '../utils/functions';
import { queueSong, queueAndPlay } from '../utils/API';
import ColorThief from 'colorthief';

const Section = (props) => {
    const [palette, setPalette] = useState('black');
    const song = props.song;
    const type = song.type;

    const myRef = useRef(null);

    useEffect(() => {
        // console.log("Rerender of Section " + type)
    });
    
    const paletteUpdate = () => {
        const colorThief = new ColorThief();
        const img = myRef.current;
        const result = colorThief.getColor(img);
        
        // console.log("img loaded and setting palette in Section " + type);
        setPalette(rgbToHex(...result));
    }

    return (
        <div style={{ backgroundColor: palette }} className="section">
            <div style={{ color: 'white'}}>
                <b>{ type }</b> 
                <br />
                {song.name === 'No Song Playing' ? '' : `${song.name} - ${song.artists}`}
                <br />
                <img 
                    src={song.imageUrl} 
                    alt=""
                    ref={myRef} 
                    crossOrigin={"anonymous"}
                    onLoad={() => paletteUpdate()}
                /> 
            {type === 'Recommendation' && 
            (<p>
                <button style={{ color: 'black' }} type="submit" onClick={() => queueAndPlay(song.id)}>Play</button>
                <button style={{ color: 'black' }} type="submit" onClick={() => queueSong(song.id)}>Queue</button> 
            </p>)}
            </div>
        </div>
    );
}

export default Section;