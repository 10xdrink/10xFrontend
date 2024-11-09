import React from "react";
import TakeChargeBG from "../assets/TakeChargeBG.png";
import AvailableAtBG from "../assets/AvailableAtBG.png";
import LimeImageButton from "../assets/LimeImage.png";

const TakeCharge = () => {
  return (
    <div>
      <div className="main-div flex">
        <div className="left-col w-1/2 pl-20 pr-8 bg-[#F2F3F2] flex flex-col justify-center">
          <div>
            <h2 className="sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl quantico-bold-italic">
              TAKE CHARGE. <br />
              OWN THE DAY.
            </h2>
          </div>
          <div className="paragraph mt-4">
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed pt-sans-regular">
              10X Formulas was born out of a deep understanding of nutritional
              needs and a dedication to improving people's daily performance
              through proper brain nourishment. Harness your potential with 10X
              to tackle your day with confidence and clarity.
            </p>
          </div>

          <div className="">
            <div className="learn-more mt-8">
              <button
                className="shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-[#0821D2] quantico-bold-italic text-xl"
                type="button"
              >
                Buy Now
              </button>
            </div>
            <img
              className="w-24 h-18 -mt-20 -ml-12 "
              src={LimeImageButton}
              alt=""
            />
          </div>
        </div>

        <div className="right-col w-1/2 h-auto">
          <img src={TakeChargeBG} className="h-auto" alt="" />
        </div>
      </div>
    </div>
  );
};

export default TakeCharge;
