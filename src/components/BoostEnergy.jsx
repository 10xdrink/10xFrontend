import React from "react";
import energyBoostBG from "../assets/energyBoostBG.png";
import BluePlainBackground from "../assets/Blue Plain Background.png";
import { FaAngleRight } from "react-icons/fa";

const BoostEnergy = () => {
  return (
    <div>
      <div className="main-div flex w-full">
        <div
          className="left-column w-1/2 pt-28 pl-20 pr-20 pb-28 flex flex-col justify-center"
          style={{
            backgroundImage: `url(${BluePlainBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-8xl font-bold uppercase tracking-wider text-white quantico-bold-italic">
            boost your <br />
            energy and <br />
            performance
          </h1>
          <p className="text-xl pt-sans-regular text-white mt-10">
            Experience the power of 10X and unlock your full potential.
          </p>

          <div className="button-divs mt-12">
            <button className="pt-4 pb-4 pl-8 pr-8 text-xl bg-transparent quantico-bold-italic border border-white text-white font-bold rounded-sm focus:outline-none hover:shadow-lg shadow-[0px_2px_8px_rgba(255,255,255,0.8)] transition-shadow duration-300 ease-in-out">
              ADD
            </button>
          </div>
        </div>

        <div className="right-column w-1/2">
          <img
            className="w-full"
            src={energyBoostBG}
            alt="Energy Boost Background"
          />
        </div>
      </div>
    </div>
  );
};

export default BoostEnergy;
