const clientId = 'b791d339b30d42a6ac6a58c878c339bf';
const redirectUri = 'http://localhost:3000/';

let accessToken;

const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        img: track.album.images[2].url
      }));
    });
  },

  async savePlaylist(name, trackURIs) {
    const accessToken = Spotify.getAccessToken();
    let userId;

    const headers = {
      Authorization: `Bearer ${accessToken}`
    }

    const response = await fetch(`https://api.spotify.com/v1/me`, { headers: headers });
    const JSONResponse = await response.json();

    userId = JSONResponse.id;

    const response_1 = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({ name: name })
      });

    const JSONResponse_1 = await response_1.json();
    const playlistId = JSONResponse_1.id;

    return await fetch(`
          https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({ uris: trackURIs })
    });

    
  }
}

export default Spotify;