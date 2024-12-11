import { useContext } from "react";
import { Playerbarcontext } from "../Context/Playerbarcontext";

const Playerbar = () => {
  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pauseStatus,
    pause,
    time,
    previous,
    next,
    seekSong,
    volume,
    handleVolumeChange,
    getVolumeIcon,
  } = useContext(Playerbarcontext);

  return (
    <div className="fixed bottom-0 left-0 w-full h-[10%] bg-black flex justify-between items-center text-white px-4">
      {/* Left Section */}
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={track.image} alt="Song Image" />
        <div>
          <p>{track.name}</p>
          <p className="text-gray-400 text-sm">{track.artist}</p>
        </div>
      </div>

      {/* Center Section */}
      <div className="flex flex-col items-center gap-1">
        {/* Controls */}
        <div className="flex gap-4">
          <i
            className="fa-solid fa-shuffle w-4 cursor-pointer"
            alt="Shuffle"
          ></i>
          <i
            onClick={previous}
            className="fa-solid fa-backward w-4 cursor-pointer"
            alt="Previous"
          ></i>
          {playStatus ? (
            <i
              onClick={pause}
              className="fa-solid fa-pause w-4 cursor-pointer"
              alt="Pause"
            ></i>
          ) : (
            <i
              onClick={play}
              className="fa-solid fa-play w-4 cursor-pointer"
              alt="Play"
            ></i>
          )}
          <i
            onClick={next}
            className="fa-solid fa-forward w-4 cursor-pointer"
            alt="Next"
          ></i>
          <i className="fa-solid fa-rotate w-4 cursor-pointer" alt="Loop"></i>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-5">
          <p>
            {time.currentTime.minute}:{time.currentTime.second}
          </p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-green-800 rounded-full"
            />
          </div>
          <p>
            {time.totalTime.minute}:{time.totalTime.second}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <i className="fa-solid fa-microphone w-4 cursor-pointer" alt="Mic"></i>
        <i className="fa-solid fa-list w-4 cursor-pointer" alt="Queue"></i>
        <i
          className={`fa-solid ${getVolumeIcon()} w-4 cursor-pointer`}
          title="Volume"
        />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 h-1 rounded-full bg-white appearance-none cursor-pointer"
          style={{
            accentColor: "white", // For browsers that support accent color
          }}
        />
        <i
          className="fa-solid fa-window-maximize w-4 cursor-pointer"
          alt="Fullscreen"
        ></i>
      </div>
    </div>
  );
};

export default Playerbar;
