import { useNavigate } from "react-router-dom";
import songs from "../data/songs";
import { songsData } from "../assets/JS/assets";
import { useContext } from "react";
import { Playerbarcontext } from "../Context/Playerbarcontext";

const albums = [
  { id: 1, name: "Hybrid Theory", image: "/Images/global.png" },
  { id: 2, name: "Divide", image: "/Images/topglobal.jpg" },
  { id: 3, name: "Like a Virgin", image: "/Images/happyfavorites.jpg" },
];

const Home = ({ onSongSelect, onLike }) => {
  const navigate = useNavigate();
  const { playWithId } = useContext(Playerbarcontext);

  return (
    <div>
      <h2>Good Afternoon</h2>

      {/* Album Cards */}
      <div>
        <h3>Albums</h3>
        <div className="row">
          {albums.map((album) => (
            <div
              key={album.id}
              className="card"
              onClick={() => navigate(`/album/${album.name}`)}
              style={{ cursor: "pointer" }}
            >
              <img src={album.image} alt={album.name} />
              <h3>{album.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Song Cards */}
      <div>
        <h3>Songs</h3>
        <div className="row | pb-40">
          {songsData.map((songsData) => (
            <div key={songsData.id} className="card">
              <img
                onClick={() => playWithId(songsData.id)}
                src={songsData.image}
                alt={songsData.title}
              />
              <h3>{songsData.name}</h3>
              <p>{songsData.artist}</p>
              <div className="card-actions">
                <button className="favorite-btn">
                  <i
                    onClick={() => onLike(songsData)}
                    className="fa-regular fa-heart | text-green-700"
                  ></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
