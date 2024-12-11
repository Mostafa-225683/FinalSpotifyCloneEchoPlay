import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/JS/assets";

export const Playerbarcontext = createContext();

const PlayerbarcontextProvider = ({ children }) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [volume, setVolume] = useState(1);
  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },

    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithId = async (id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayStatus(true);
  };

  const previous = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    } else {
      await setTrack(songsData[songsData.length - 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    } else {
      await setTrack(songsData[0]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const seekSong = async (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value; // Range input's value
    setVolume(newVolume); // Update state
    audioRef.current.volume = newVolume; // Update audio volume
  };

  // In Playerbarcontext.js
  const getVolumeIcon = () => {
    if (Math.abs(volume - 0) < 0.01) {
      // Check if volume is close to 0
      return "fa-volume-xmark"; // Mute icon
    } else if (volume <= 0.5) {
      return "fa-volume-low"; // Low volume icon
    } else {
      return "fa-volume-high"; // Full volume icon
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60); // Calculate minutes
    const seconds = Math.floor(timeInSeconds % 60); // Calculate seconds
    return `${minutes}:${String(seconds).padStart(2, "0")}`; // Ensure 2-digit seconds
  };

  useEffect(() => {
    const updateProgressAndTime = () => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        audioRef.current.onended = () => {
          next();
        };
        // Update the progress bar width based on the current time
        seekBar.current.style.width =
          Math.floor((currentTime / duration) * 100) + "%";

        // Format time using a helper function
        setTime({
          currentTime: {
            // Format the seconds to be two digits
            second: String(Math.floor(currentTime % 60)).padStart(2, "0"),
            minute: Math.floor(currentTime / 60),
          },

          totalTime: {
            // Only update totalTime when duration is valid
            second: duration
              ? String(Math.floor(duration % 60)).padStart(2, "0")
              : "00",
            minute: duration ? Math.floor(duration / 60) : 0,
          },
        });
      }
    };

    setTimeout(updateProgressAndTime, 1000); // Update every second

    // Add the ontimeupdate event handler when the audio is loaded
    audioRef.current.ontimeupdate = updateProgressAndTime;

    return () => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = null; // Cleanup the event handler
        return () => {
          audioRef.current.onended = null;
        };
      }
    };
  }, [audioRef, next]); // Runs every time audioRef changes

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    volume,
    handleVolumeChange,
    getVolumeIcon,
    formatTime,
  };

  return (
    <Playerbarcontext.Provider value={contextValue}>
      {children}
    </Playerbarcontext.Provider>
  );
};

export default PlayerbarcontextProvider;
