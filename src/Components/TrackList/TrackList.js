import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends Component {

  constructor(props) {
    super(props);

    this.renderTracks = this.renderTracks.bind(this);
  }

  renderTracks() {

    return this.props.tracks
    .map(track => {

      return (
        <Track 
          track={track} 
          key={track.id} 
          onAdd={this.props.onAdd}
          onRemove={this.props.onRemove}
          isRemoval={this.props.isRemoval}
        />);
    })
  }

  render() {

    return (
      <div className="TrackList">
        {this.renderTracks()}
    </div>
    );
  }
}

export default TrackList;
