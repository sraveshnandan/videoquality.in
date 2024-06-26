import { FeatureCards } from "@/constants";
import { IFeatureCard } from "@/types";
import { ArrowRightCircle, VideoIcon } from "lucide-react";
import React from "react";

type Props = {};

const FeaturesSection = (props: Props) => {
  return (
    <section className="w-full  flex flex-col items-center my-12">
      {/* section heading  */}
      <span className="bg-gradient-to-r from-pink-500  to-indigo-400 text-6xl  hover:border-b-4 hover:border-pink-500 inline-block   text-transparent bg-clip-text">
        Features
      </span>

      {/* subheading  */}

      <span className="text-white text-center font-semibold text-lg mb-8 mt-2">
        Our unique features simply makes us diffrent from others.
      </span>

      {/* cards container  */}
      <div className="grid md:grid-cols-2 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3">
        {FeatureCards.map((item: IFeatureCard) => (
          <div
            className="p-3 relative group shadow-lg flex flex-col gap-2 text-white min-h-[250px] bg-glass rounded-xl lg:w-[320px] xl:w-[360px] cursor-pointer  m-4 hover:shadow-xl transition-all duration-500 hover:scale-110  hover:shadow-pink-400"
            key={item.title}
          >
            <div className="absolute hidden group-hover:flex duration-500 transition-all right-4 top-4">
              <ArrowRightCircle
                size={58}
                className=" p-1 rounded-full text-purple-600 "
              />
            </div>
            <span
              className={`bg-gradient-to-r from-pink-500 max-w-[75%]  to-indigo-500 lg:text-4xl md:text-4xl text-4xl line-clamp-1 text-transparent bg-clip-text`}
            >
              {item.title}
            </span>
            <span>{item.subTitle}</span>
            <h4 className="text-gray-400">{item.desc}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
