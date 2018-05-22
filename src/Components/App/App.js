import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar'
import SearchResults from '../SearchResults'
import PlayList from '../PlayList'

class App extends Component {

  constructor(props) {
    super(props)

    this.renderAction = this.renderAction.bind(this)

    this.state = { 

      playlistName: 'playList',
      playlistTracks: [

        {name: 'huu', artist: 'haa', album: 'hee', id: 0}, 
        {name: 'huu', artist: 'haa', album: 'hee', id: 1}, 
        {name: 'huu', artist: 'haa', album: 'hee', id: 2} 
      ],
      
      searchResults: [ 
        
        {name: 'huu', artist: 'haa', album: 'hee', id: 0}, 
        {name: 'huu', artist: 'haa', album: 'hee', id: 1}, 
        {name: 'huu', artist: 'haa', album: 'hee', id: 2}   
      ]
    }

    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
  } // constructor

  addTrack(track) {
    
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return
    }

    this.setState({ playlistTracks: [...this.state.playlistTracks, track] }) // could be wrong
    // OR: this.setState((oldState) => return { playlistTracks: oldState.playlistTracks + track })
    // OR: this.setState({playlistTracks: track}) // it may auto-merge is instead of replacement
  }

  removeTrack(track) {
        
    const newState = this.state.playlistTracks
                    .filter(savedTrack => { 

                      return savedTrack.id !== track.id
                    })

    this.setState({ playlistTracks: newState })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <PlayList 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks}
              onRemove={this.onRemove}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
/******************************************************************************/