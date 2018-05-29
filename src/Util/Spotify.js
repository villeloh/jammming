let accessToken;
let expiresIn;

const Spotify = {};

Spotify.getAccessToken = () => {

  if (accessToken) {
      return accessToken;
  }

  const currentUrl = window.location.href;
  const token = currentUrl.match(/access_token=([^&]*)/);
  const time = currentUrl.match(/expires_in=([^&]*)/);

  if (token && time) {

    accessToken = token[1];
    expiresIn = time[1];

    window.setTimeout(() => accessToken = null, expiresIn * 1000);
    window.history.pushState('Access Token', null, '/');
    return accessToken;
  }

  const baseUrl = 'https://accounts.spotify.com/authorize';
  const clientID = process.env.REACT_APP_CLIENT_ID || '0';
  const redirectURI = 'http://localhost:3000/';

  const authorizeUrl = `${baseUrl}?response_type=token&client_id=${clientID}&redirect_uri=${redirectURI}&scope=playlist-modify-public`;
  window.location = authorizeUrl;
}; // getAccessToken()

Spotify.search = (term) => {

  Spotify.getAccessToken();

  const url = `https://api.spotify.com/v1/search?type=track&q=${term}`;
  const params = { 

    headers: {

      Authorization: `Bearer ${accessToken}`
    }
  };

  return fetch(url, params)
  .then(response => response.json())
  .then(myJson => {

    const tracks = myJson.tracks.items;

    if (tracks !== null) { 

      return tracks.map(track => ({

        id: track.id,
        title: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    } else {
      return [];
    }
  });
}; // search()

Spotify.savePlaylist = (playlistName, trackURIs) => {

  Spotify.getAccessToken();

  if (!playlistName || !trackURIs) {
    return;
  }

  const url = 'https://api.spotify.com/v1/me';
  const params = { 

    headers: {

      Authorization: `Bearer ${accessToken}`
    }
  };

  let userId;
  let playlistId;

  return fetch(url, params)
  .then(response => response.json())
  .then(myJson => {

    userId = myJson.id;

    const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const params = {

      headers: {

        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({name: playlistName, description: 'new playlist'})
    };

    return fetch(url, params) 
    .then(response => response.json())
    .then(data => {

      playlistId = data.id;

      const url = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
      const params = {

        headers: {
  
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({uris: trackURIs})
      };

      return fetch(url, params)
      .then(response => response.json())
      .then(json => { 
        
        return json.snapshot_id;
      })
    }); // data-then
  }); // myJson-then
}; // savePlaylist()

export default Spotify;
