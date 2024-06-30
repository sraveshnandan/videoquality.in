"use client";
import Loader from "@/components/shared/landing/Loader";
import { Button } from "@/components/ui/button";
import { getUserProfile, verifyCode } from "@/libs/actions";
import { useStore } from "@/zustand/MainStore";
import { Check, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ReferEarnPage = () => {
  const { profile, setProfile } = useStore();
  const [copied, setcopied] = useState<boolean>(false);
  const [referCode, setreferCode] = useState<string>("");
  const [loading, setloading] = useState(false);

  // handle refer code submit function
  const handleReferCodeSubmit = async (e: any) => {
    e.preventDefault();
    if (referCode.length < 9 || !referCode.includes("Vid")) {
      return toast.error("Invalid refer code.");
    }
    setloading(true);
    const res = await verifyCode(referCode);
    setloading(false);
    toast.info(res);
  };

  useEffect(() => {
    getUserProfile().then((res) => {
      const u = JSON.parse(res);
      setProfile(u);
    });
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className="w-full h-full flex lg:p-4 p-2 flex-col">
      <span className="text-white text-4xl font-semibold">
        Earn extra credit by{" "}
        <span className="text-indigo-500 border-b-2 pb-2 border-b-indigo-400 cursor-pointer">
          Refer & Earn
        </span>
      </span>
      {/* subheading  */}
      <span className="py-2 text-gray-400 text-lg ">
        by using your friends refer code you&apos;ll earn up to 25 credit point.{" "}
      </span>

      {/* refer code box  */}
      <span className="my-8 text-white">
        ** you can redeem credit from refer code only one time.{" "}
      </span>
      <form
        onSubmit={handleReferCodeSubmit}
        className="flex flex-row lg:gap-4 gap-2  rounded-md xl:w-[80%] w-full justify-center  lg:self-start self-center bg-glass shadow-lg p-2 items-center"
      >
        <input
          type="text"
          maxLength={9}
          className="p-2 flex-grow rounded-md bg-glass text-white font-semibold"
          placeholder="Enter refer code "
          onChange={(e) => setreferCode(e.target.value)}
        />
        <Button
          type="submit"
          className="bg-white text-black font-black"
          variant={"ghost"}
        >
          Add Credit
        </Button>
      </form>

      {/* refer an earn box  */}

      <div className="bg-glass flex flex-col gap-4 lg:p-4 p-2 my-4 rounded-md shadow-lg xl:w-[80%] w-[100%]  lg:self-start self-center  ">
        <div className="bg-glass flex lg:flex-row flex-col  items-center rounded-md shadow-lg lg:p-3 p-1 ">
          <input
            type="text"
            className="bg-glass lg:my-0  my-2 flex-grow rounded-md text-white lg:text-2xl text-lg font-semibold p-3"
            readOnly
            placeholder={profile ? profile.referCode : "Loading.."}
          />
          <span
            onClick={() => {
              if (copied) {
                return toast.warning(" Refer Code already copied.");
              }
              navigator.clipboard.writeText(profile?.referCode!);
              toast.success("Code copied successfully.");
              setcopied(true);

              setTimeout(() => {
                setcopied(false);
              }, 5500);
            }}
            className={`p-4 ${
              copied ? "bg-green-500" : "bg-white"
            } rounded-md  ml-2  cursor-pointer`}
          >
            {copied ? (
              <Check className="text-2xl text-white" />
            ) : (
              <CopyIcon className="text-2xl  text-black " />
            )}
          </span>
        </div>

        <span className="text-center text-lg font-semibold text-gray-400">
          you will get 25 credit point for each refer, and also another 25
          credit if anyone of your friends purchase a plan.
        </span>
      </div>
    </div>
  );
};

export default ReferEarnPage;
