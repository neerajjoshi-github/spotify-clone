import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
interface SidebarItemProps {
  label: string;
  href: string;
  active: boolean;
  icon: IconType;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  active,
  icon: Icon,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex flex-row items-center w-full gap-x-4 text-base font-medium cursor-pointer text-neutral-400 hover:text-white transition duration-300 py-1`,
        active && "text-white"
      )}
    >
      <Icon size={26} />
      <p className="truncate w-full">{label}</p>
    </Link>
  );
};

export default SidebarItem;
