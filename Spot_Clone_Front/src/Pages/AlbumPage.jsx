import React from 'react';
import { useParams } from 'react-router-dom';
import Songs from './Songs.jsx';


const albums = [
  {
    name: "Hybrid Theory",
    image: '/Images/global.png',
    description: "Your weekly update of the most played tracks.",
    likes: 1234421,
    songs: [
      { id: 1, title: "In the End", artist: "Linkin Park", date: "2003", duration: "3:23" },
      { id: 2, title: "Crawling", artist: "Linkin Park", date: "2003", duration: "3:37" },
    ],
  },
  {
    name: "Divide",
    image: "/Images/topglobal.jpg",
    description: "A fantastic collection of tracks by Ed Sheeran.",
    likes: 654321,
    songs: [
      { id: 1, title: "Shape of You", artist: "Ed Sheeran", date: "2017", duration: "3:53" },
      { id: 2, title: "Perfect", artist: "Ed Sheeran", date: "2017", duration: "4:23" },
    ],
  },
];

// Helper function to calculate total duration
const calculateTotalDuration = (songs) => {
  let totalMinutes = 0;
  let totalSeconds = 0;

  songs.forEach((song) => {
    const [minutes, seconds] = song.duration.split(":").map(Number);
    totalMinutes += minutes;
    totalSeconds += seconds;
  });

  totalMinutes += Math.floor(totalSeconds / 60);
  totalSeconds %= 60;

  return `${totalMinutes}min ${totalSeconds}sec`;
};

const AlbumPage = () => {
  const { albumName } = useParams();
  const album = albums.find((album) => album.name === albumName);

  if (!album) {
    return <p>Album not found!</p>;
  }

  const totalDuration = calculateTotalDuration(album.songs);

  return (
    <div className="album-page">
      <div className="album-header">
        <img src={album.image} alt="Album Cover" />
        <div className="album-details">
          <p>Playlist</p>
          <h1>{album.name}</h1>
          <p>{album.description}</p>
          <p>
            {album.likes.toLocaleString()} likes | {album.songs.length} songs, about {totalDuration}
          </p>
        </div>
      </div>
      <div className="songs-header">
        <p>#</p>
        <p>Title</p>
        <p>Album</p>
        <p>Date Added</p>
        <p>Duration</p>
      </div>
      <hr />
      {album.songs.map((song, index) => (
        <Songs
          key={song.id}
          num={index + 1}
          image={album.image}
          name={song.artist}
          albumName={song.title}
          date={song.date}
          duration={song.duration}
        />
      ))}
    </div>
  );
};

export default AlbumPage;
