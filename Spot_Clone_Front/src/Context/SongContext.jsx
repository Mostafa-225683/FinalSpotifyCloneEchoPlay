import { createContext, useState } from 'react';

export const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);

  const playSong = (song) => setCurrentSong(song);

  return (
    <SongContext.Provider value={{ currentSong, playSong }}>
      {children}
    </SongContext.Provider>
  );
};
