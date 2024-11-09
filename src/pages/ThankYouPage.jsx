import React from "react";
import AvailableAtBG from "../assets/AvailableAtBG.png";
import About10XBottom from "../assets/About10X-Bottom.png";
import BluePlainBackground from "../assets/Blue Plain Background.png";
import About10XTop from "../assets/About10X-Top.png";
import About10XIcon1 from "../assets/About10XIcon1.png";
import About10XIcon2 from "../assets/About10XIcon2.png";

const ThankYouPage = () => {
  return (
    <div>
      <div
        className="w-full bg-cover bg-center p-28 items-center"
        style={{
          backgroundImage: `url(${AvailableAtBG})`, // Replace with your actual image URL
        }}
      >
        <h1 className="text-9xl quantico-bold-italic">Thank You</h1>
        <p className="text-xl text-black pt-sans-regular">
          We appreciate your purchase and look forward to serving you again.
        </p>
        {/* Bottom Buttons */}
        <div className="flex space-x-4 justify-start mt-8">
          <button className="uppercase quantico-bold-italic text-xl bg-gradient-to-r from-black to-[#0821D2] text-white py-3 px-8 font-bold focus:outline-none hover:shadow-lg transition duration-300 ease-in-out">
            continue
          </button>
          <div className="learn-more">
            <button
              className="shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-[#0821D2] quantico-bold-italic text-xl uppercase"
              type="button"
            >
              back
            </button>
          </div>
        </div>
      </div>
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
            <h1 className="text-5xl font-bold  uppercase tracking-wider text-white quantico-bold-italic">
              Experience the <br />
              Incredible Benefits <br />
              of 10X Products Today
            </h1>
            <p className="text-xl pt-sans-regular text-white mt-10">
              Our carefully crafted formulas combine ancient Ayurvedic herbs and
              modern neuroscience to deliver unparalleled benefits for your body
              and mind.
            </p>

            <div className="icon-divs flex mt-12 text-white gap-4">
              <div className="left">
                <img className="w-1/3" src={About10XIcon2} alt="" />
                <h3 className="nimbusL-bol text-2xl uppercase">
                  enhanced energy
                </h3>
                <p className="mt-4 pt-sans-regular text-base">
                  Feel a surge of energy that lasts throughout the day, keeping
                  you focused and productive.{" "}
                </p>
              </div>
              <div className="right">
                <img className="w-1/3" src={About10XIcon1} alt="" />
                <h3 className="nimbusL-bol text-2xl uppercase">
                  optimal performance
                </h3>
                <p className="mt-4 pt-sans-regular text-base">
                  Unlock your full potential and perform at your best in every
                  aspect of life.{" "}
                </p>
              </div>
            </div>
            <div className="button-divs mt-12">
              <button className="pt-4 pb-4 pl-8 text-xl pr-8 bg-transparent quantico-bold-italic border border-white text-white font-bold rounded-sm focus:outline-none  hover:shadow-lg shadow-[0px_2px_8px_rgba(255,255,255,0.8)] transition-shadow duration-300 ease-in-out">
                SHOP NOW
              </button>

              <button className="uppercase ml-4 pt-4 pb-4 pl-8 text-xl pr-8 bg-transparent quantico-bold-italic bordder-0 text-white font-bold rounded-sm focus:outline-none  ">
                see all <i class="ml-4 fa-solid fa-angle-right"></i>
              </button>
            </div>
          </div>

          <div className="right-column w-1/2">
            <img className="w-full h-auto" src={About10XTop} alt="" srcset="" />
            <img className="-mt-48 -ml-36" src={About10XBottom} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
