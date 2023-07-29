"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import React from "react";
import Image from "next/image";

interface MediaItemProps {
  song: Song;
  onClickHandler?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ song, onClickHandler }) => {
  const imageUrl = useLoadImage(song);

  const handleClick = () => {
    if (onClickHandler) {
      return onClickHandler(song.id);
    }

    // TODO default trun on player
  };
  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
    >
      <div className="relative min-h-[48px] min-w-[48px] rounded-md overflow-hidden ">
        <Image
          src={imageUrl || ""}
          fill
          alt={`${song.title}-image`}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{song.title}</p>
        <p className="text-neutral-400 text-sm truncate">{song.artist}</p>
      </div>
    </div>
  );
};

export default MediaItem;
