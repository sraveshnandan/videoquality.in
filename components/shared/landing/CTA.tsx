"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const CTA = () => {
  const { user } = useUser();
  const router = useRouter();
  const handleBtnClick = () => {
    if (!user?.id) {
      return router.push("/sign-in");
    }
    return router.push("/dashboard");
  };
  return (
    <div className="bg-glass rounded-xl mb-8  mx-4 lg:mx-0 ">
      <div className="lg:flex lg:items-center lg:justify-between w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="text-3xl font-extrabold text-pink-500 dark:text-white sm:text-4xl">
          <span className="block">Explore the world of Creativity.</span>
          <span className="block text-indigo-500">
            It&#x27;s today or never.
          </span>
        </h2>
        <div className="lg:mt-0 mt-4 lg:flex-shrink-0">
          <div className=" inline-flex rounded-md shadow">
            <button
              type="button"
              onClick={handleBtnClick}
              className="bg-white sm:flex hidden text-black lg:text-xl text-md md:text-md md:py-2 lg:py-2 py-1 lg:px-4 px-3 rounded-md transition-all duration-500 hover:text-white hover:shadow-lg hover:shadow-pink-500  hover:bg-gradient-to-tr from-pink-500 to-indigo-500 "
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
