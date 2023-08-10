import React from 'react';
import Track from '../track/track';
import './tracklist.css'


const TrackList = (props) => {

    const Tracks = props.tracks.map( (track) => {

        return(
            <Track 
                track={track}
                key={track.id}
                onAdd={props.onAdd}
                onRemove={props.onRemove}
                isRemoval={props.isRemoval}
            />
        )
    });

    return(
        <div className="TrackList">
            {Tracks}
        </div> 
    );
};

export default TrackList;