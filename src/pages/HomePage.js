import React, { useEffect, useState } from 'react';
import { isValidSession } from '../utils/functions';
import { getCurrentlyPlaying, getRecommendations } from '../utils/API';
import { useHistory } from 'react-router-dom';
import CurrentlyPlayingSection from '../components/Section/CurrentlyPlayingSection';
import RecommendedSection from '../components/Section/CurrentlyPlayingSection';
import LyricsSection from '../components/Section/LyricsSection';
import './HomePage.css';
import _ from 'lodash';

const HomePage = () => {
    const [currentlyPlayingSong, setCurrentlyPlayingSong] = useState({ type: 'Now Playing', name: 'No Song Playing', artists: [], imageUrl: ''});
    const [recommendedSong, setRecommendedSong] = useState({ type: 'Recommended', name: '', id: '', artists: [], imageUrl: ''});

    const history = useHistory();

    useEffect(() => {
        // console.log("Rerender of HomePage");

        var isValidSessionBool = isValidSession();

        if(!isValidSessionBool) {
            history.push('/login');
        };
    });
    
    useEffect(() => {
        // console.log("intial effect including updateSongs");

        const updateSongs = async () => {
            // console.log("getting")
            var result = await getCurrentlyPlaying();

            var incomingSong = {};

            if(result.data === "" || result.data.currently_playing_type === "unknown") {
                // console.log("in blank")
                incomingSong = { type: 'Now Playing', name: 'No Song Playing', artists: [], imageUrl: ''};
            }
            else {
                var songJSONPath = result.data.item;
                incomingSong = {
                    type: 'Now Playing', 
                    name: songJSONPath.name,
                    id: songJSONPath.id,
                    artists: songJSONPath.artists.map(artist => artist.name + " "),
                    imageUrl: songJSONPath.album.images[songJSONPath.album.images.length - 3].url,
                };
            }

            if(!_.isEqual(incomingSong, currentlyPlayingSong)) {
                // console.log("gonna update");

                result = await getRecommendations(incomingSong.id);
                
                const songJSONPath = result.data;
        
                const incomingRecommendation = {
                        type: 'Recommended',
                        name: songJSONPath.name,
                        id: songJSONPath.id,
                        artists: songJSONPath.artists.map(artist => artist.name + " "),
                        imageUrl: songJSONPath.album.images[songJSONPath.album.images.length - 3].url,
                }
        
                setCurrentlyPlayingSong(incomingSong);
                setRecommendedSong(incomingRecommendation); 
            }

            // could put isValidSession code here since on every render (every second) the session is checked since updateSongs forces a render everywhere else
        }

        updateSongs();

        const timer = setInterval(updateSongs, 1000);

        return () => clearInterval(timer);
    },[currentlyPlayingSong]);
    
    return(
        <div className="home">
            <CurrentlyPlayingSection className="section" song={currentlyPlayingSong}/>
            <RecommendedSection className="section" song={recommendedSong}/>
            <LyricsSection className="section" song={currentlyPlayingSong}></LyricsSection>
        </div>
    );
};

export default HomePage;

