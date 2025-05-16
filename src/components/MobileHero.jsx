// src/components/MobileHero.jsx

import React from "react";
import HeroBG from "../assets/MobileHeroBG.png";
import LimeImageButton from "../assets/LimeImage.png";
import ArrowDown from "../assets/ArrowDown.png";
import LimeHero from "../assets/LimeHero.png";
import MangoHero from "../assets/MangoHero.png";
import { Link } from "react-router-dom";

const MobileHero = () => {
  return (
    <div
      className="block md:hidden relative bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(${HeroBG})`,
      }}
    >
      {/* Embedded CSS for animation */}
      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          .float-animation {
            animation: float 3s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .float-animation {
              animation: none;
            }
          }
        `}
      </style>

      {/* Adjust padding for mobile */}
      <div className="px-4 py-16">
        {/* Flex container with column direction */}
        <div className="flex flex-col">

          {/* Product Images Section */}
          <div className="w-full flex justify-center items-center relative mt-6 ">
            <div className="flex items-center space-x-[-20px]">
              
              {/* Lime Hero Image Wrapper */}
              <div className="transform rotate-[-20deg] translate-y-[-20px]">
                <img
                  src={LimeHero}
                  alt="Lime Hero"
                  className="w-[180px] sm:w-[200px] float-animation z-10"
                />
              </div>

              {/* Mango Hero Image Wrapper */}
              <div className="transform rotate-[20deg] translate-x-[-20px]">
                <img
                  src={LimeHero}
                  alt="Lime Hero"
                  className="w-[180px] sm:w-[200px] float-animation z-10"
                />
              </div>

            </div>
          </div>

          {/* Text Content Section */}
          <div className="w-full flex flex-col justify-center items-center mt-10">
            <h1 className="w-full text-left text-[78px] quantico-bold-italic mt-4 leading-tight">
              THE BRAIN <br />
              BATTERY
            </h1>
            <p className="w-full text-left nimbusL-bol text-lg uppercase mt-4">
              pocket-sized nourishment that revitalises
              <br /> starved brains around the clock.
            </p>

            <Link to={"/products"}>
              <div className="relative mt-8 flex justify-center w-full">
                <button className="w-full pt-3 pb-3 px-40 text-md bg-transparent quantico-bold-italic border border-white text-white font-bold rounded-sm focus:outline-none hover:shadow-lg shadow-[0px_2px_8px_rgba(255,255,255,0.8)] transition-shadow duration-300 ease-in-out">
                  SHOP NOW
                </button>
                {/* Lime button image */}
                <img
                  className="absolute w-24 h-auto -top-6 -left-10"
                  src={LimeImageButton}
                  alt="Lime Button"
                />
              </div>
            </Link>

            {/* Arrow Image */}
            <div className="flex justify-center mt-8 mb-12">
              <img
                className="w-20 h-auto ArrowDown"
                src={ArrowDown}
                alt="Arrow Down"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MobileHero;