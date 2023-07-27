"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem: React.FC<ListItemProps> = ({ image, name, href }) => {
  const router = useRouter();
  const onClick = () => {
    // Add auth before push
    router.push(href);
  };
  return (
    <button
      onClick={onClick}
      className="relative group flex items-center gap-x-4 rounded-md bg-neutral-100/10 overflow-hidden hover:bg-neutral-100/20 transition duration-300 pr-4"
    >
      <div className="relative min-w-[64px] min-h-[64px]">
        <Image src={image} fill alt="Image" className="object-cover" />
      </div>
      <p className="font-medium truncate py-5">{name}</p>
      <div className="absolute transition duration-300 opacity-0 rounded-full items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
        <FaPlay className="text-black" />
      </div>
    </button>
  );
};

export default ListItem;
