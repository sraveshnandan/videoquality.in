import React from "react";

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className=" flex z-100  w-full h-full items-center justify-center">
      <div className="spinner">
        <div className="spinner1"></div>
      </div>
    </div>
  );
};

export default Loader;
