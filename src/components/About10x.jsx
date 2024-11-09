import React from "react";
import AboutImage from "../assets/About-Image.png";
import About10XBottom from "../assets/About10X-Bottom.png";
import BluePlainBackground from "../assets/Blue Plain Background.png";
import About10XTop from "../assets/About10X-Top.png";
import About10XIcon1 from "../assets/About10XIcon1.png";
import About10XIcon2 from "../assets/About10XIcon2.png";

const About10x = () => {
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
          <hr className="horizontal-carousel-hr border-0 bg-white my-2 w-full" />
          <h1 className="text-8xl font-bold  uppercase tracking-wider text-white quantico-bold-italic">
            about 10x
          </h1>
          <hr className="horizontal-carousel-hr border-0 bg-white my-2 w-full" />
          <p className="text-xl pt-sans-regular text-white mt-10">
            Our product is the result of 20 years of research and hands-on
            experience. We've engineered 10X with critical ingredients that
            cross the blood-brain barrier to optimize brain function. A
            well-nourished brain enhances focus, clarity, and energy, benefiting
            all aspects of daily life, whether it's a workout, a business
            meeting, or spending quality time with family.
          </p>

          <div className="icon-divs flex mt-12 text-white gap-4">
            <div className="left">
              <img className="w-1/3" src={About10XIcon2} alt="" />
              <h3 className="nimbusL-bol text-2xl">TAKE CONTROL</h3>
              <p className="mt-4 pt-sans-regular text-base">
                You’ll enjoy controllable energy and rejuvenating nourishment in
                one easy sip.{" "}
              </p>
            </div>
            <div className="right">
              <img className="w-1/3" src={About10XIcon1} alt="" />
              <h3 className="nimbusL-bol text-2xl">KEEP GOING</h3>
              <p className="mt-4 pt-sans-regular text-base">
                10X is like a battery for your brain. It keeps you focused for
                longer to unleash your true potential.{" "}
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
  );
};

export default About10x;
