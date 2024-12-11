import { useState } from "react";
import "./Styles/Favorites.css";

export default function Favorites() {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: "Super Freaky Girl",
      album: "Super Freaky",
      dateAdded: "3 days ago",
      duration: "2:51",
      artist: "Nicki Minaj",
    },
    {
      id: 2,
      title: "Shinunoga E-Wa",
      album: "HELP EVER HURT NEVER",
      dateAdded: "6 days ago",
      duration: "3:31",
      artist: "Fujii Kaze",
    },
    {
      id: 3,
      title: "True Friends",
      album: "That's The Spirit",
      dateAdded: "10 days ago",
      duration: "3:20",
      artist: "Bring Me The Horizon",
    },
    {
      id: 4,
      title: "Learn to Fly",
      album: "There Is Nothing Left to Lose",
      dateAdded: "1 day ago",
      duration: "4:00",
      artist: "Foo Fighters",
    },
  ]);

  const handleRemove = (id) => {
    setFavorites(favorites.filter((song) => song.id !== id));
  };

  return (
    <div className="favorites-container">
      {/* Header */}
      <div className="favorites-header">
        <div className="favorites-header-icon">
          <i className="fa fa-heart"></i>
        </div>
        <div className="favorites-header-details">
          <h1 className="favorites-title">Liked Songs</h1>
          <p>{favorites.length} songs</p>
        </div>
      </div>

      {/* Song List */}
      <table className="favorites-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Album</th>
            <th>Date Added</th>
            <th>Duration</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {favorites.map((song, index) => (
            <tr key={song.id}>
              <td>{index + 1}</td>
              <td>
                <div className="song-details">
                  <p className="song-title">{song.title}</p>
                  <p className="song-artist">{song.artist}</p>
                </div>
              </td>
              <td>{song.album}</td>
              <td>{song.dateAdded}</td>
              <td>{song.duration}</td>
              <td>
                <button
                  className="remove-button"
                  onClick={() => handleRemove(song.id)}
                >
                  ✖
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
