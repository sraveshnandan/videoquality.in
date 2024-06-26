"use client";
import {
  Clock,
  Clock2,
  Coins,
  CoinsIcon,
  IndianRupee,
  MenuIcon,
  RocketIcon,
  Shield,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { loggedInUserMenu } from "@/constants";
import { INavMenu } from "@/types";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { IUser } from "@/models";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { useStore } from "@/zustand/MainStore";

const DashBoardMenu = () => {
  const path = usePathname();
  const { profile: u } = useStore();
  const [menuToggle, setmenuToggle] = useState<boolean>(false);
  const [width, setwidth] = useState<string>("w-[320px]");
  const activeClass = ` gap-2 text-black rounded-md transition-all duration-400 hover:scale-110 p-3 bg-white my-2 flex flex-row items-center`;
  const inActiveClass = `text-white rounded-md gap-2  transition-all duration-400 hover:scale-110 p-2 hover:bg-glass my-2 flex flex-row items-center`;
  return (
    <aside
      className={`bg-transparent z-50  relative flex h-[calc(100vh-150px)]   flex-col  ${width} p-4 rounded-md backdrop-blur-md `}
    >
      {/* Logo  */}
      <Link
        className="text-white border-b-[0.5px] pb-3 border-b-gray-500 text-2xl flex flex-row items-center gap-2"
        href={"/"}
      >
        <RocketIcon size={45} /> VideoQuality
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
      <div className="flex flex-col pb-8  gap-4">
        <div className="bg-white p-2 flex flex-col rounded-md shadow-md">
          <UserButton showName={true} />
          {/* user remaining credit  */}
          <div className="flex flex-row mt-4 items-center gap-2">
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
