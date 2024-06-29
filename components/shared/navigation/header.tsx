"use client";
import { NavMenu } from "@/constants";
import { INavMenu } from "@/types";
import { useUser } from "@clerk/nextjs";
import { MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

const Header = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const [menuToggle, setmenuToggle] = useState<boolean>(false);

  return (
    <header className="lg:mx-0 mx-2 md:py-1 flex flex-row shadow-lg sticky z-50 top-2 bg-glass backdrop-blur-md  mt-2 p-2 rounded-md items-center justify-between">
      {/* logo  */}
      <Link href={`/`} className="flex flex-row items-center gap-2">
        <Image src={"/logo.png"} width={80} height={80} alt="logo" />
        <span className="text-white text-xl font-medium">VideoQuality.in</span>
      </Link>
      {/* menu items  */}
      {/* desktop menu  */}
      <div className="md:flex hidden  mx-auto  gap-2  p-2 ">
        {NavMenu.map((item: INavMenu) => (
          <Link
            className="text-white lg:text-lg md:text-sm  mx-2"
            key={item.link}
            href={`${item.link}`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* CTA button */}
      <div className=" flex flex-row items-center gap-2 py-2 ">
        <Link
          href={isSignedIn ? "/dashboard" : "/sign-in"}
          className="bg-white sm:flex hidden text-black lg:text-xl text-md md:text-md md:py-2 lg:py-2 py-1 lg:px-4 px-3 rounded-md transition-all duration-500 hover:text-white hover:shadow-lg hover:shadow-pink-500  hover:bg-gradient-to-tr from-pink-500 to-indigo-500"
        >
          {isSignedIn ? "Dashboard" : "Get Started"}
        </Link>
      </div>

      {/* mobile menu  */}

      <Sheet>
        <SheetTrigger
          className="md:hidden flex"
          onClick={() => setmenuToggle((prev) => !prev)}
        >
          <MenuIcon className="text-white " size={38} />
        </SheetTrigger>
        <SheetContent className="bg-glass backdrop-blur-md">
          <SheetClose>
            <X className="text-white" size={38} />
          </SheetClose>
          <div className="flex flex-col items-center  w-full gap-2 right-0">
            {NavMenu.map((item: INavMenu) => (
              <Link
                onClick={() => setmenuToggle(false)}
                className="text-white  lg:text-lg md:text-sm  my-2"
                key={item.link}
                href={`${item.link}`}
              >
                {item.name}
              </Link>
            ))}

            {/* CTA  */}
            <Link
              onClick={() => setmenuToggle(false)}
              href={isSignedIn ? "/dashboard" : "/sign-in"}
              className="bg-white sm:flex  text-black lg:text-xl text-md md:text-md md:py-2 lg:py-2 py-1 lg:px-4 px-3 rounded-md"
            >
              {isSignedIn ? "Dashbord" : "Get Started"}
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
