import React, { useCallback } from 'react';
import TrackList from '../tracklist/tracklist';
import './playlist.css';

function Playlist(props) {

    const handleChange = useCallback(
        (event) => {

            props.onNameChange(event.target.value);
            // eslint-disable-next-line
        },[props.onNameChange]
    )


    return(
        <div className="playlist">
            <div className="playlist-name">
            <input 
                type="text"
                name="playlist-name"
                placeholder="New Playlist"
                onChange={handleChange}
                />
            </div>
            
            <div className="playlist-tracks">
                <TrackList  tracks={props.playlist}
                            onRemove={props.onRemove}
                            isRemoval={true}
                            />
            </div>
            
            <div className="submit">
            <button
                name="add-playlist"
                type="submit"
                value="Add Playlist"
                onClick={props.onPlaylistSave} >
                    Add Playlist
                </button>
            </div>
        </div>
    )
}

export default Playlist;