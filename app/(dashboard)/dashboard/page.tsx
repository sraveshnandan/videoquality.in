"use client";
import { VideoTypes } from "@/constants";
import { firebaseApp } from "@/firebase";
import { getUserProfile, setFCMtoken } from "@/libs/actions";
import { useStore } from "@/zustand/MainStore";
import { UserButton } from "@clerk/nextjs";
import { getMessaging, getToken } from "firebase/messaging";
import { Copy } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const FcmTokenComponent = dynamic(
  () => import("@/components/shared/FCMtokenHandler"),
  {
    ssr: false, // This ensures the component is only rendered on the client side
  }
);

type Props = {};

const Page = (props: Props) => {
  const { setProfile, profile } = useStore();

  // for setting user profile
  const setUserProfile = () => {
    getUserProfile()
      .then((res) => {
        const u = JSON.parse(res);
        setProfile(u);
      })
      .catch(() => toast.error("Unable to fetch your profile."));
  };

  // for getting user token

  useEffect(() => {
    // setting user profile
    setUserProfile();
  }, []);

  return (
    <div className="flex items-start mx-w-[calc(100vw)] lg:p-4 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-25px)] scroll-smooth sh flex-col gap-2 justify-start">
      {/* welcome section  */}
      <div className="rounded-md p-2 border shadow-lg shadow-black  w-full items-center flex justify-between">
        <span className="text-white text-lg">
          {" "}
          Welcome Mr. {profile?.first_name}{" "}
        </span>
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      {/* Video type section  */}

      {VideoTypes &&
        VideoTypes.map((item, index) => (
          <div key={index} className="flex  w-full lg:p-4 flex-col gap-4">
            {/* type section  */}
            <div className="flex items-center rounded-xl  flex-col gap-4 w-full justify-center border p-2">
              {/* type heading  */}
              <span className="bg-gradient-to-r from-pink-500  to-indigo-400 text-3xl  hover:border-b-4 hover:border-pink-500 inline-block text-center text-transparent bg-clip-text">
                {item.name}
              </span>
              <video
                autoPlay
                loop
                className="rounded-xl w-full"
                src={item.url}
              ></video>
              {/* before video  */}

              {/* after video  */}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Page;