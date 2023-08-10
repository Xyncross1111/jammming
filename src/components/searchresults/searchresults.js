import  React from 'react';
import './searchresults.css';
import TrackList from '../tracklist/tracklist';

function SearchResults(props) {


    return (
        <div className="searchresults">
            <h1>Results</h1>
            <TrackList tracks={props.searchResults} onAdd={props.onAdd} />
        </div>
    )

}

export default SearchResults;