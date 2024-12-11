import { useState } from "react";
import "./Search.css";
import { songsData } from "../../../assets/JS/assets";
import { useContext } from "react";
import { Playerbarcontext } from "../../../Context/Playerbarcontext";

const SearchBar = () => {
  const { playWithId } = useContext(Playerbarcontext);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredSongs = songsData.filter(
    (song) =>
      song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-container">
      {/* Search Input with Icon */}
      <div className="search-input-wrapper">
        <i className="fa-solid fa-magnifying-glass | search-icon"></i>{" "}
        {/* Unicode for a magnifying glass */}
        <input
          type="text"
          className="search-input"
          placeholder="Search for music..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Show filtered songs */}
      {searchTerm.trim() && filteredSongs.length > 0 && (
        <ul className="song-list">
          {filteredSongs.map((song) => (
            <li onClick={() => playWithId(song.id)} key={song.id}>
             {song.name} by {song.artist}
            </li>
          ))}
        </ul>
      )}

      {/* Display no results message */}
      {searchTerm.trim() && filteredSongs.length === 0 && (
        <p className="no-results">No songs found</p>
      )}
    </div>
  );
};

export default SearchBar;
