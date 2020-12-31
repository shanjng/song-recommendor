import React, { useState, useEffect } from 'react';
import { getLyrics } from '../../utils/API';
import './Section.css';

const LyricsSection = (props) => {
    const [lyrics, setLyrics] = useState('');
    const song = props.song;

    useEffect(() => {
        console.log("Rerender of Section Lyrics")
    });

    useEffect(() => {
        getLyrics(song.name).then(result => {
            console.log("lyrics result: ", result);
        })
    }, [song]);

    return (
        <div className="section" style={props.isAllLoaded ? {} : {display: 'none'}}>
            result
        </div>
    );
}

export default LyricsSection;