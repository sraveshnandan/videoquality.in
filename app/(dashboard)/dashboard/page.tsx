"use client";
import { VideoTypes } from "@/constants";
import { getUserProfile } from "@/libs/actions";
import { useStore } from "@/zustand/MainStore";
import { UserButton } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { useEffect } from "react";
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
    if (!profile?.first_name) {
      // setting user profile
      return setUserProfile();
    }
    return () => {};
  }, []);

  return (
    <div className="flex items-start mx-w-full scrh xl:p-4 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-25px)] scroll-smooth sh flex-col gap-2 justify-start">
      {/* welcome section  */}
      <div className="rounded-md xl:w-fit xl:p-4 p-2 fixed md:mb-4 xl:mb-2 lg:relative backdrop-blur-md bg-glass  shadow-lg shadow-black  w-full items-center flex gap-2">
        <UserButton afterSignOutUrl="/" />
        <span className="text-white  font-medium">
          Welcome back{" "}
          <span className="text-purple-500 text-lg">{profile?.first_name}</span>
        </span>
      </div>

      {/* Video type section  */}

      <div className="py-12 xl:py-0">
        {VideoTypes &&
          VideoTypes.map((item, index) => (
            <div
              key={index}
              className={`flex ${
                index === 0 && "border-pink-500"
              } w-full border xl:p-4 flex-col gap-4 
              `}
            >
              {/* type section  */}
              <div
                className={`flex items-center rounded-xl  flex-col gap-4 w-full justify-center   p-2`}
              >
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
    </div>
  );
};

export default Page;
