import React, { useState } from 'react';
import songs from '../data/songs';

const Search = ({ onSongSelect, onLike }) => {
  const [query, setQuery] = useState('');

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2>Search</h2>
      <input
        type="text"
        placeholder="Search songs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="row">
        {filteredSongs.map((song) => (
          <div key={song.id} className="card">
            <img src={song.cover} alt={song.title} />
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
            <div className="card-actions">
              <button className="play-btn" onClick={() => onSongSelect(song)}>Play</button>
              <button onClick={() => onLike(song)} className="favorite-btn">
                ❤️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
