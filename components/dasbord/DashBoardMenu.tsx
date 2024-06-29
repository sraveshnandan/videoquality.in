"use client";
import { Clock2, Coins, IndianRupee, Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { loggedInUserMenu } from "@/constants";
import { INavMenu } from "@/types";
import { usePathname } from "next/navigation";
import { useStore } from "@/zustand/MainStore";
import Image from "next/image";

const DashBoardMenu = () => {
  const path = usePathname();
  const { profile: u } = useStore();
  const activeClass = ` gap-2 text-black rounded-md transition-all duration-400 hover:scale-110 p-3 bg-white my-2 flex flex-row items-center`;
  const inActiveClass = `text-white rounded-md gap-2  transition-all duration-400 hover:scale-110 p-2 hover:bg-glass my-2 flex flex-row items-center`;
  return (
    <aside
      className={`bg-transparent backdrop-blur-sm  absolute   left-0 right-0  flex h-full flex-col   p-4 rounded-md `}
    >
      {/* Logo  */}
      <Link
        className="text-white border-b-[0.5px] pb-3 border-b-gray-500 text-xl flex flex-row items-center gap-2"
        href={"/"}
      >
        <Image src={"/logo.png"} alt="logo" width={60} height={60} />
        <span className="text-xl font-medium">VideoQuality</span>
      </Link>

      {/* menu links  */}

      <div className="flex flex-col mt-4 flex-grow  ">
        {loggedInUserMenu.map((item: INavMenu) => (
          <Link
            className={path === item.link ? activeClass : inActiveClass}
            href={item.link}
            key={item.name}
          >
            {item.name === "Tasks" ? (
              <Clock2 className="text-xl font-bold mr-2" />
            ) : item.name === "Refer & Earn" ? (
              <IndianRupee className="text-xl font-bold mr-2" />
            ) : (
              <Shield className="text-xl font-bold mr-2" />
            )}
            {item.name}
          </Link>
        ))}
      </div>

      {/* user details  */}
      <div className="flex flex-col mb-16  gap-2">
        <div className="bg-white p-2 flex flex-col rounded-md shadow-md">
          {/* user remaining credit  */}
          <div className="flex flex-row text-black  items-center gap-2">
            <span>Credit:</span>
            <Coins className="text-yellow-500" />
            <span className="text-3xl font-semibold"> {u?.credit || 0}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashBoardMenu;
