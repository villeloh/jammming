import React, { Component } from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends Component {

  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {

    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={event => this.handleNameChange(event)}/>
        <TrackList 
          tracks={this.props.playlistTracks} 
          onRemove={this.props.onRemove} 
          isRemoval={true}
        />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default PlayList;
