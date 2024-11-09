import React from "react";
import HeroBG from "../assets/HeroBG.png";
import LimeImageButton from "../assets/LimeImage.png";
import ArrowDown from "../assets/ArrowDown.png";
import LimeHero from "../assets/LimeHero.png";
import MangoHero from "../assets/MangoHero.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div
      className="relative bg-cover bg-center py-44 px-20 text-white"
      style={{
        backgroundImage: `url(${HeroBG})`, // Replace with your actual image URL
      }}
    >
      <div className="flex">
        <div className="w-1/2 flex flex-col justify-center ">
          <div className="">
            <h1 className="text-9xl quantico-bold-italic mt-10">
              THE BRAIN <br />
              BATTERY
            </h1>
            <p className="nimbusL-bol text-xl uppercase ">
              pocket-sized nourishment that revitalises
              <br /> starved brains around the clock.
            </p>
            <Link to={"/products"}>
              <div className="">
                <button className="mt-8 pt-4 pb-4 pl-12 text-xl pr-8 bg-transparent quantico-bold-italic border border-white text-white font-bold rounded-sm focus:outline-none  hover:shadow-lg shadow-[0px_2px_8px_rgba(255,255,255,0.8)] transition-shadow duration-300 ease-in-out">
                  SHOP NOW
                </button>
                <img
                  className="w-28 h-18 -mt-24 -ml-12 "
                  src={LimeImageButton}
                  alt=""
                />
              </div>
            </Link>
          </div>
          {/* Arrow Image */}
          <div className="flex justify-end">
            <img className="w-28 h-18 ArrowDown" src={ArrowDown} alt="" />
          </div>
        </div>

        {/* Images */}
        <div className="w-1/2 flex justify-center relative">
          {/* Lime Charge Image */}
          <img
            src={LimeHero}
            alt="Lime Hero"
            className="w-auto h-auto LimeHero transform rotate-[-20deg] translate-x-[-10px]  z-10"
          />
          {/* Mango Fusion Image */}
          <img
            src={MangoHero}
            alt="Mango Hero"
            className="w-auto  MangoHero transform rotate-[20deg] translate-x-[-10px]  z-10 -ml-24 -mb-14"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
