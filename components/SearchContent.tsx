"use client";
import { Song } from "@/types";
import React from "react";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-500">
        No songs found.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full py-2">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full px-4">
          <div className="flex-1">
            <MediaItem song={song} onClickHandler={() => {}} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
