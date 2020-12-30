import React, { useEffect, useState } from 'react'
import { getAllPlaylists } from '../utils/API';

const PlaylistsPage = () => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        getAllPlaylists().then(playlistsReponse => {
            const playlistUnfilteredObjs = playlistsReponse.data.items;

            const playlistObjs = playlistUnfilteredObjs.map(playlist => {
                return {
                    id: playlist.id,
                    name: playlist.name,
                    images: playlist.images,
                    url: playlist.external_urls.spotify,
                    num_tracks: playlist.tracks.total,
                }
            })

            setPlaylists(playlistObjs);

            // setPlaylists(playlistsReponse);
        });
    }, [])

    const Playlist = (props) => {
        const playlist = props.playlist;

        return (
            <div style={{margin: '30px' }}>
                <img src={playlist.images[0].url} alt='' width='300px' height='300px' onClick={() => {window.location = playlist.url}}/>
                <div>
                    {playlist.name}
                </div>
            </div>
        );
    }

    return (
        <div className='playlists page'>
            <h1 style={{textAlign: 'center' }}>Playlists</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                {playlists.map(playlist => <Playlist key={playlist.id} playlist={playlist}/>)}
            </div>
        </div>
    )
}

export default PlaylistsPage
