
import React, { useEffect, useState } from "react";
import {
  IoPlayCircleOutline,
  IoPauseCircleOutline,
  IoStopCircleOutline,
  IoPlaySkipBackCircleOutline,
  IoPlaySkipForwardCircleOutline,
} from "react-icons/io5";

const PlayStory = (props) => {
  const { base64adio } = props;
  const [playing, isPlaying] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [duration, setDuration] = useState("00:00");
  const [currentTime, setCurrentTime] = useState("00:00");

  const handleStop = () => {
    audioFile.pause();
    audioFile.currentTime = 0;
    isPlaying(false);
  };

  const handleSkipBack = () => {
    const newTime = audioFile.currentTime - 10;
    audioFile.currentTime = newTime < 0 ? 0 : newTime;
  };

  const handleSkipForward = () => {
    const newTime = audioFile.currentTime + 10;
    audioFile.currentTime =
      newTime > audioFile.duration ? audioFile.duration : newTime;
  };

  const handlePlayPause = () => {
    if (audioFile) {
      if (playing) {
        audioFile.pause();
      } else {
        audioFile.play();
      }
      isPlaying((pre) => !pre);
    }
  };

  useEffect(() => {
    if (base64adio) {
      const audio = new Audio(`data:audio/x-wav;base64, ${base64adio}`);
      setAudioFile(audio);

      audio.onloadeddata = () => {
        const audioDuration = audio.duration;
        if (typeof audioDuration === "number" && !isNaN(audioDuration)) {
          setDuration(formatTime(audioDuration));
        }
      };
    }
  }, [base64adio]);

  useEffect(() => {
    if (audioFile) {
      // // Update current time while audio is playing
      audioFile.ontimeupdate = () => {
        const duration = audioFile.duration;
        const currentTime = audioFile.currentTime;
        if (duration === currentTime) {
          isPlaying(false);
          audioFile.currentTime = 0;
          audioFile.pause();
          setCurrentTime(formatTime(audioFile.currentTime));
        } else {
          setCurrentTime(formatTime(currentTime));
        }
      };
    }

    return () => {
      if (audioFile) {
        audioFile.onloadeddata = null; // Cleanup on unmount
        audioFile.ontimeupdate = null; // Cleanup on unmount
      }
    };
  }, [audioFile]);

  return (
    <div className="flex items-center justify-between mx-1">
      {currentTime}
      <IoPlaySkipBackCircleOutline
        className="cursor-pointer text-gray-800 size-6"
        size={25}
        onClick={handleSkipBack}
      />
      {playing ? (
        <IoPauseCircleOutline
          onClick={handlePlayPause}
          className="cursor-pointer text-gray-800 size-6"
          size={25}
        />
      ) : (
        <IoPlayCircleOutline
          onClick={handlePlayPause}
          className="cursor-pointer text-gray-800 size-6"
          size={25}
        />
      )}
      <IoStopCircleOutline
        className="cursor-pointer text-gray-800 size-6"
        size={25}
        onClick={() => handleStop()}
      />
      <IoPlaySkipForwardCircleOutline
        className="cursor-pointer text-gray-800 size-6"
        size={25}
        onClick={handleSkipForward}
      />
      {duration}
    </div>
  );
};

export default PlayStory;

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};
