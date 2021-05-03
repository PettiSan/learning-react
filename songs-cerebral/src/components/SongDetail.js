import React from 'react';
import { connect } from 'react-redux';

const SongDetail = ({ song }) => {
  console.log('props ', song);
  if (!song) {
    return <div>Select a song!</div>;
  }

  return (
    <div>
      <h3>Song Detail:</h3>

      <p>Song Title: {song.title}</p>
    </div>
  );
};

const mapStateToProps = state => {
  return { song: state.selectedSong };
};

export default connect(mapStateToProps)(SongDetail);
