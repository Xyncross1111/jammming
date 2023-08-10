import React, { useCallback } from 'react';
import './track.css';

const Track = (props) => {

    const addTrack = useCallback(
      (event) => {
        props.onAdd(props.track);
      },
      [props.onAdd, props.track]
    );
    
    const removeTrack = useCallback(
      (event) => {
        props.onRemove(props.track);
      },
      [props.onRemove, props.track]
    );

    const renderAction = () => {
      if (props.isRemoval) {
        return (
          <button className="Track-button remove" onClick={removeTrack}>
            -
          </button>
        );
      }
      return (
        <button className="Track-button add" onClick={addTrack}>
          +
        </button>
      );
    };
    
    return(
        <div className="Track">
            <div className="Track-information">

                <img src={props.track.img} alt="Album Cover" />

                <div className="details">
                  <h3>{props.track.name}</h3>
                  <p>
                      {props.track.artist} | {props.track.album}
                  </p>
                </div>
                
            </div>
            <div>
                {renderAction()}
            </div>
        </div>
    );
};

export default Track;