import React, { useState, useCallback } from 'react';
import './App.css';
import Spotify from '../../utils/spotify';
import SearchBar from '../searchbar/searchBar';
import Playlist from '../playlist/playlist';
import SearchResults from '../searchresults/searchresults';


function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
    
  const search = useCallback((term) => {
    Spotify.search(term).then(setSearchResults);
  }, []);

  const addTrack = useCallback(
    (track) => {
      if (playlist.some((savedTrack) => savedTrack.id === track.id))
        return;

      setPlaylist((prevTracks) => [...prevTracks, track]);
    },
    [playlist]
  );

  const removeTrack = useCallback((track) => {
    setPlaylist((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);

  const handlePlaylistSave = useCallback( () => {


    const trackUris = playlist.map( track => track.uri );

    Spotify.savePlaylist(playlistName, trackUris);

    setPlaylistName("New Playlist");
    setPlaylist([]);

  },[playlistName, playlist])



  return (
    <div className="App">
      <header>
        <h1>Jammming</h1>
      </header>

      <SearchBar onSearch={search} />

      <div className="songs">
        <SearchResults searchResults={searchResults} onAdd={addTrack} />

        <Playlist playlist={playlist}
                  playlistName={playlistName}
                  onRemove={removeTrack}
                  onNameChange={setPlaylistName}
                  onPlaylistSave={handlePlaylistSave}
                   />
      </div>
    </div>
  )
}

export default App;
