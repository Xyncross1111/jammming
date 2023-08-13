import React, { useCallback } from 'react';
import './track.css';

const Track = (props) => {

    const addTrack = useCallback(
      (event) => {
        props.onAdd(props.track);

        event.target.innerHTML = "✔️";
      },
      // eslint-disable-next-line
      [props.onAdd, props.track]
    );
    
    const removeTrack = useCallback(
      (event) => {
        props.onRemove(props.track);

        const searchListTrack = document.getElementById(props.track.id);

        searchListTrack.children[1].children[0].innerHTML = "+"
      },
      // eslint-disable-next-line
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
        <div className="Track" id={props.track.id} >
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