import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  userId: string;
};

const HeroSection = ({ userId }: Props) => {
  // needs to be removed
  return (
    <div className="w-full group  z-50 min-h-[calc(100vh-100px)] flex flex-col items-center ">
      {/* grad animation  */}

      <span className="p-4 bg-gradient-to-tl min-h-44 min-w-44 ani rounded-t-sm  rounded-s-md rounded-e-full -z-10 duration-500 transition-all from-pink-500 to-indigo-500 absolute top-[25%] right-8 lg:right-[55%] blur-md"></span>

      <span className="p-4 bg-gradient-to-br min-h-44 min-w-44 ani rounded-t-sm  rounded-s-md rounded-e-full -z-10 duration-500 transition-all from-pink-500 to-indigo-500 absolute  top-[25%] lg:left-[50%] left-8 blur-md"></span>
      <span className="p-4 bg-gradient-to-br min-h-44 min-w-44 ani rounded-t-sm  rounded-s-md rounded-e-full -z-10 duration-500 transition-all from-pink-500 md:flex hidden to-indigo-500 absolute lg:top-[55%]  top-[45%] left-[30%] lg:left-[40%]  blur-md"></span>

      {/* Hero section text  */}
      <div className="pt-24  flex flex-col text-center gap-2 w-[75%] mx-auto ">
        {/* title  */}
        <span className="text-white lg:text-7xl md:text-6xl text-5xl text-wrap ">
          Elevate Your Video Content Instantly
        </span>
        <span className="text-gray-500 mt-2 text-wrap lg:text-lg text-sm font-semibold">
          Upload your raw videos, describe your vision, and let our AI-driven
          platform deliver polished, professional-grade results. No editing
          skills required!
        </span>

        {/* CTA buttons  */}
        <div className="flex items-center gap-8 justify-center flex-row  my-4">
          <Link
            href={userId ? "/dashboard" : "/sign-in"}
            className="text-md bg-white text-black px-5 py-3 rounded-md  transition-all duration-500 hover:text-white hover:shadow-lg hover:shadow-pink-500  hover:bg-gradient-to-tr from-pink-500 to-indigo-500 font-semibold"
          >
            {userId ? " Go to Dashboard" : "Get Started"}
          </Link>
          <Link
            href={"/"}
            className="text-white  flex flex-row items-center hover:border-b-2 font-semibold text-md"
          >
            See How it works <ArrowRight />
          </Link>
        </div>
      </div>

      {/* main  image  */}
      <div className="p-4 rounded-xl my-8 bg-glass w-[80%] shadow-lg lg:h-[750px] md:h-[550px] h-[350px]">
        <div className="relative w-[100%] rounded-lg overflow-hidden  h-full">
          <Image
            className="object-cover duration-800 transition-all hover:hue-rotate-60"
            src={"/hero-bg.jpg"}
            alt="herobg"
            fill={true}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export { HeroSection };
