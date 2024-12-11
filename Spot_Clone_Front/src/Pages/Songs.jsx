import { useContext } from 'react';
import { Playerbarcontext } from '../Context/Playerbarcontext';
import { songsData } from "../assets/JS/assets";


const Songs = ({ num, image, name, albumName, date, duration }) => {
  const {playWithId} = useContext(Playerbarcontext);
  return (
    <div className="song-row">
      <p>{num}</p>
      <div className="song-info">
        <img src={image} alt="Album" />
        <div>
          <h3>{albumName}</h3>
          <p>{name}</p>
        </div>
      </div>
      <p>{date}</p>
      <p>{duration}</p>
      <button onClick={()=> playWithId(songsData[1])}   className="play-btn">Play</button>
    </div>
  );
};

export default Songs;
