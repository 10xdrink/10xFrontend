import React from "react";
import Benefit1 from "../assets/Benefit1.png";
import Benefit2 from "../assets/Benefit2.png";
import Benefit3 from "../assets/Benefit3.png";
import BluePlainBackground from "../assets/Blue Plain Background.png";

const Benefits10X = () => {
  return (
    <div
      className="w-full relative bg-cover bg-center py-32 px-20 text-white"
      style={{
        backgroundImage: `url(${BluePlainBackground})`,
      }}
    >
      {/* Title and Description */}
      <div className="flex justify-between items-start mb-12 ml-24 mr-24">
        <div className="w-1/2">
          <hr className="horizontal-carousel-hr border-0 bg-white my-2 w-[500px]" />
          <h1 className="text-8xl font-bold uppercase tracking-wider text-white quantico-bold-italic">
            Benefits <br />
            of 10X
          </h1>
          <hr className="horizontal-carousel-hr border-0 bg-white my-2 w-[500px]" />
        </div>
        <div className="w-1/2 flex flex-col justify-end items-end">
          <p className="text-xl pt-sans-regular text-white w-[500px]">
            With ZERO calories and ZERO sugar, 10X is an indispensable asset for
            those who want to plug into their maximum potential and harness
            every ounce of it in a healthy way. And we deliver within 60 minutes
            of your purchase!
          </p>
        </div>
      </div>

      {/* Benefits Columns */}
      <div className="flex relative justify-center h-[500px]">
        {/* Column 1 */}
        <div className="w-1/3 relative z-30 overflow-hidden">
          <img
            src={Benefit1}
            alt="Benefit 1"
            className="cursor-pointer w-full h-full object-cover transform transition-transform duration-300 hover:scale-110 origin-center"
            loading="lazy"
          />
        </div>

        {/* Column 2 */}
        <div className="w-1/3 relative -ml-20 z-20 overflow-hidden">
          <img
            src={Benefit2}
            alt="Benefit 2"
            className="cursor-pointer w-full h-full object-cover transform transition-transform duration-300 hover:scale-110 origin-center"
            loading="lazy"
          />
        </div>

        {/* Column 3 */}
        <div className="w-1/3 relative -ml-20 z-10 overflow-hidden">
          <img
            src={Benefit3}
            alt="Benefit 3"
            className="cursor-pointer w-full h-full object-cover transform transition-transform duration-300 hover:scale-110 origin-center"
            loading="lazy"
          />
        </div>
      </div>

      {/* Description Columns */}
      <div className="flex col-span-3 pl-20 pr-20 mt-4">
        <div className="w-[500px] p-4">
          <h3 className="uppercase nimbusL-bol text-xl">powerhouse of rejuvenation</h3>
          <p className="pt-sans-regular">
            Whether it’s invigoration for your busy day or the wind down at
            night so you can rest and recharge, 10X amplifies nourishment for
            peak performance. It’s rapid nourishment for a starving brain.
          </p>
        </div>
        <div className="w-[500px] ml-3 p-4">
          <h3 className="uppercase nimbusL-bol text-xl">the winner’s shot</h3>
          <p className="pt-sans-regular">
          It’s an essential boost in an easy to carry, convenient pack that doesn’t need refrigeration and fits in a pocket for high flyers, go-getters, and people outworking the competition.
          </p>
        </div>
        <div className="w-[500px] ml-3 p-4">
          <h3 className="uppercase nimbusL-bol text-xl">energy you can control</h3>
          <p className="pt-sans-regular">
          Forget nervous, jittery, unsteady energy that’s explosive and puts you in a briefly heightened state. 10X is collected, expansive energy that your brain can regulate all day and night.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Benefits10X;
