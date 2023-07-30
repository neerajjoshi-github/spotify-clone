import { Song } from "@/types";
import React, { useEffect, useState } from "react";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillBackward, AiFillForward } from "react-icons/ai";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
// @ts-ignore
import useSound from "use-sound";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) return;

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSongToPlay = player.ids[currentIndex + 1];

    if (!nextSongToPlay) {
      return player.setId(player.ids[0]);
    }
    player.setId(nextSongToPlay);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) return;

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSongToPlay = player.ids[currentIndex - 1];

    if (!previousSongToPlay) {
      return player.setId(player.ids[player.ids.length - 1]);
    }
    player.setId(previousSongToPlay);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlayPause = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    setVolume(volume === 0 ? 1 : 0);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem song={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          onClick={handlePlayPause}
          className="h-10 w-10 rounded-full flex items-center justify-center cursor-pointer p-1 bg-white"
        >
          <Icon size={30} color="black" />
        </div>
      </div>
      <div className="hidden md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
        <AiFillBackward
          onClick={onPlayPrevious}
          size={30}
          className="cursor-pointer text-neutral-400 hover:text-white transition duration-300"
        />
        <div
          onClick={handlePlayPause}
          className="h-10 w-10 rounded-full flex items-center justify-center cursor-pointer p-1 bg-white"
        >
          <Icon size={30} color="black" />
        </div>
        <AiFillForward
          onClick={onPlayNext}
          size={30}
          className="cursor-pointer text-neutral-400 hover:text-white transition duration-300"
        />
      </div>
      <div className="hidden md:flex justify-end items-center w-full pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            size={20}
            className="cursor-pointer"
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
