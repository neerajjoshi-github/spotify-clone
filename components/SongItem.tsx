"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import React from "react";
import Image from "next/image";
import PlayButton from "./PlayButton";

interface SongItemProps {
  song: Song;
  onClickHandler: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ song, onClickHandler }) => {
  const imagePath = useLoadImage(song);
  return (
    <div
      onClick={() => onClickHandler(song.id)}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition duration-300 p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          src={imagePath || "/images/liked.png"}
          fill
          alt={`${song.title} image cover`}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{song.title}</p>
        <p className="w-full pb-4 truncate text-sm text-neutral-400">
          By {song.artist}
        </p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
