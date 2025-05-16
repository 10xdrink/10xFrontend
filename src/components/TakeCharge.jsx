import React from "react";
import TakeChargeBG from "../assets/TakeChargeBG.png";
import TakeChargeBGMobile from "../assets/MobileTakeCharge.png"
import AvailableAtBG from "../assets/AvailableAtBG.png";
import LimeImageButton from "../assets/LimeImage.png";

const TakeCharge = () => {
  return (
    <div>
      {/* Desktop/Laptop Version */}
      <div className="hidden lg:block">
        <div className="main-div flex flex-row">
          {/* Left Column */}
          <div className="left-col w-1/2 px-20 pr-8 bg-[#F2F3F2] flex flex-col justify-center">
            <div>
              <h2 className="text-6xl lg:text-7xl xl:text-8xl quantico-bold-italic">
                TAKE CHARGE. <br />
                OWN THE DAY.
              </h2>
            </div>
            <div className="paragraph mt-4">
              <p className="text-base lg:text-lg leading-relaxed font-pt-sans-regular">
                10X Formulas was born out of a deep understanding of nutritional
                needs and a dedication to improving people's daily performance
                through proper brain nourishment. Harness your potential with 10X
                to tackle your day with confidence and clarity.
              </p>
            </div>

            <div className="mt-8">
              <div className="learn-more">
                <button
                  className="shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-[#0821D2] quantico-bold-italic text-xl px-4 py-2 rounded"
                  type="button"
                >
                  Buy Now
                </button>
              </div>
              <img
                className="w-24 h-18 -mt-20 -ml-12"
                src={LimeImageButton}
                alt="Lime Button"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="right-col w-1/2 h-auto">
            <img src={TakeChargeBG} className="w-full h-auto" alt="Take Charge Background" />
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="block lg:hidden">
        <div className="main-div flex flex-col">
          {/* Right Column (Image) - Moved above on Mobile */}
          <div className="right-col w-full h-auto">
            <img
              src={TakeChargeBGMobile}
              className="w-full h-auto"
              alt="Take Charge Background"
            />
          </div>

          {/* Left Column (Content) */}
          <div className="left-col w-full px-6 py-8 bg-[#F2F3F2] flex flex-col justify-center">
            <div>
              <h2 className="text-6xl sm:text-6xl md:text-7xl quantico-bold-italic">
                TAKE<br /> CHARGE. <br />
                OWN <br />THE DAY.
              </h2>
            </div>
            <div className="paragraph mt-4">
              <p className="text-[18px] sm:text-base lg:text-lg leading-relaxed font-pt-sans-regular">
                10X Formulas was born out of a deep understanding of nutritional
                needs and a dedication to improving people's daily performance
                through proper brain nourishment. Harness your potential with 10X
                to tackle your day with confidence and clarity.
              </p>
            </div>

            <div className="mt-6">
              <div className="learn-more">
                <button
                  className="w-full shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-[#0821D2] quantico-bold-italic text-lg sm:text-xl px-4 py-2 rounded"
                  type="button"
                >
                  Buy Now
                </button>
              </div>
              <img
                className="w-24 h-full sm:w-24 sm:h-24 -mt-[80px] sm:-mt-20 -ml-8 sm:-ml-12"
                src={LimeImageButton}
                alt="Lime Button"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeCharge;
