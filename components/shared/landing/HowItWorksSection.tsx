import Uploader from "@/components/dasbord/uploader";
import React from "react";

const HowItWorksSection = () => {
  return (
    <section className="my-8 md:w-[98%] lg:w-full mx-auto flex  m-0 items-center py-8 rounded-xl shadow-md flex-col ">
      {/* section heading  */}
      <span className="bg-gradient-to-r from-pink-500  to-indigo-500 text-5xl  mb-16 hover:border-b-4 hover:border-pink-500 inline-block w-fit text-center   text-transparent bg-clip-text">
        How it Works
      </span>

      {/* linking  section  */}

      <section>
        <div className="container p-4 mx-auto  rounded-xl shadow-lg max-w-7xl sm:p-6 lg:p-8 bg-glass">
          <div className="flex flex-wrap -mx-8">
            <div className="w-full px-8 lg:w-1/2">
              <div className="pb-12 mb-12 border-b lg:mb-0 lg:pb-0 lg:border-b-0">
                <h2 className="bg-gradient-to-r from-pink-500  to-indigo-500 text-5xl  inline-block w-fit  text-transparent bg-clip-text mb-2">
                  Three simple steps, to Transfor your video.
                </h2>
                <p className="mb-8 leading-loose text-gray-500  font-medium text-xl">
                  Just do these three simple steps, and your video will pe
                  processed on our server and edited by our professional team of
                  video editors. After it you will download it.
                </p>
                <div className="w-full md:w-1/3">
                  <button
                    type="button"
                    className="py-2 px-4 text-black   bg-white hover:bg-pink-500 focus:ring-indigo-500 focus:ring-offset-indigo-200 hover:text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    See more
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full px-8 lg:w-1/2">
              <ul className="space-y-12">
                <li className="flex -mx-4 items-center">
                  <div className="px-4">
                    <span className="flex items-center justify-center w-12 h-12 mx-auto text-2xl font-bold text-blue-600 rounded-full font-heading bg-blue-50">
                      1
                    </span>
                  </div>
                  <div className="px-4">
                    <h3 className="my-4 text-xl font-semibold text-pink-500">
                      Upload Video
                    </h3>
                    <p className="leading-loose text-white">
                      Just upload your video and choose editing type.
                    </p>
                  </div>
                </li>
                <li className="flex -mx-4 items-center">
                  <div className="px-4">
                    <span className="flex items-center justify-center w-12 h-12 mx-auto text-2xl font-bold text-blue-600 rounded-full font-heading bg-blue-50">
                      2
                    </span>
                  </div>
                  <div className="px-4">
                    <h3 className="my-4 text-xl font-semibold  text-pink-500">
                      Track Task Status
                    </h3>
                    <p className="leading-loose text-white dark:text-gray-300">
                      You can easily track your generated task.
                    </p>
                  </div>
                </li>
                <li className="flex -mx-4 items-center">
                  <div className="px-4">
                    <span className="flex items-center justify-center w-12 h-12 mx-auto text-2xl font-bold text-blue-600 rounded-full font-heading bg-blue-50">
                      3
                    </span>
                  </div>
                  <div className="px-4">
                    <h3 className="my-4 text-xl font-semibold text-pink-500">
                      Download Video
                    </h3>
                    <p className="leading-loose text-white dark:text-gray-300">
                      You have to just download your edited video after it is
                      ready for download.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default HowItWorksSection;
