import React from "react";
import { Link } from "react-router-dom";

const Boxes = () => {
  return (
    <div>
      <div className="flex flex-wrap max-w-[84rem] mx-auto">
        <div className="w-1/4 p-4 text-white">
          <Link to="/Records">
            <div className="bg-red-600 p-10 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-bold">Academians.com.au</h2>
              <p className="text-sm ">Click here to check tracking</p>
            </div>
          </Link>
        </div>
        <div className="w-1/4 p-4 text-white">
          <div className="bg-red-600 p-10 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold">Mrassignment</h2>
            <p className="text-sm">This is the content of box 2</p>
          </div>
        </div>
        <div className="w-1/4 p-4 text-white">
          <div className="bg-red-600 p-10 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold">Box 3</h2>
            <p className="text-sm">This is the content of box 3</p>
          </div>
        </div>
        <div className="w-1/4 p-4 text-white">
          <div className="bg-red-600 p-10 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold">Box 4</h2>
            <p className="text-sm">This is the content of box 4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boxes;
