import React, { useEffect, useState, useRef } from 'react';
import { isValidSession } from '../utils/functions';
import { getCurrentlyPlaying, getRecommendations, queueSong, queueAndPlay } from '../utils/API';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import ColorThief from 'colorthief';

const HomePage = () => {
    const [currentPlayingSong, setCurrentlyPlayingSong] = useState({name: '', id: '', artists: [], imageUrl: ''});
    const [recommendationSong, setRecommendationSong] = useState({name: '', id: '', artists: [], imageUrl: ''});
    const [palettes, setPalettes] = useState(['black', 'black']);

    var history = useHistory();

    const currRef = useRef(null);
    const reccRef = useRef(null);

    console.log("RENDERING")

    useEffect(() => {
        const isValidSessionBool = isValidSession();

        if(!isValidSessionBool) {
            history.push('/login');
        }

        updateSongs();

        var timer = setInterval(updateSongs, 1000);

        return function cleanup() {
            clearInterval(timer);
            timer = null;
        }
    });

    const updateSongs = async () => {
        var result = await getCurrentlyPlaying();

        if(result.data === "") {
            setCurrentlyPlayingSong({ name: 'No Song Playing', artists: [], imageUrl: ''});
        }
        else {
            var songJSONPath = result.data.item;
            const incomingSong = {
                name: songJSONPath.name,
                id: songJSONPath.id,
                artists: songJSONPath.artists.map(artist => artist.name + " "),
                imageUrl: songJSONPath.album.images[songJSONPath.album.images.length - 2].url,
            };

            if(_.isEqual(incomingSong, currentPlayingSong)) {
                // console.log("not new song");
            }
            else {
                // get currently playing
                setCurrentlyPlayingSong(incomingSong);

                // get recommendation for new song
                var incomingReccomendation = await getRecommendations(result.data.item.id);

                console.log("incomingRecommendation", incomingReccomendation);

                songJSONPath = incomingReccomendation.data;

                const recommendation = {
                    name: songJSONPath.name,
                    id: songJSONPath.id,
                    artists: songJSONPath.artists.map(artist => artist.name + " "),
                    imageUrl: songJSONPath.album.images[songJSONPath.album.images.length - 2].url,
                }

                setRecommendationSong(recommendation);
            }
        }
    }

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }
      
    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    const paletteChange = async (ref, idx) => {
        const colorThief = new ColorThief();
        const img = ref.current;
        if(img != null) {
            const result = colorThief.getColor(img);
            if(idx === 0)
                setPalettes([rgbToHex(...result), palettes[1]]);
            else if(idx === 1)
                setPalettes([palettes[0], rgbToHex(...result)]);
        }
    }

    return(
        <div className="Home">
            <div style={{ 'background-color': palettes[0] }}className="section-1">
                <div style={{ color: 'white' }}>
                    <b>Now Playing</b> <br></br>
                    {currentPlayingSong.name} - {currentPlayingSong.artists} <br></br>
                    <img 
                        src={currentPlayingSong.imageUrl} 
                        alt=""
                        ref={currRef} 
                        id="current"
                        crossOrigin={"anonymous"}
                        onLoad={() => paletteChange(currRef, 0)}
                    /> <br></br>
                </div>
            </div>
            
            <div style={{ 'background-color': palettes[1] }}className="section-2">
                <div style={{ color: 'white' }}>
                    <b>Recommended</b> <br></br>
                    {recommendationSong.name} - {recommendationSong.artists} <br></br>
                    <img 
                        src={recommendationSong.imageUrl} 
                        alt=""
                        ref={reccRef} 
                        id="recommendation"
                        crossOrigin={"anonymous"}
                        onLoad={() => paletteChange(reccRef, 1)}
                    /> <br></br>
                    <button style={{ color: 'black' }} type="submit" onClick={() => queueAndPlay(recommendationSong.id)}>Play</button>
                    <button style={{ color: 'black' }} type="submit" onClick={() => queueSong(recommendationSong.id)}>Queue</button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

