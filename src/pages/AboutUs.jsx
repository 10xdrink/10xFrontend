import React from "react";
import BluePlainBackground from "../assets/Blue Plain Background.png";
import AboutImage from "../assets/About-Image.png";
import ArrowTexture from "../assets/Arrow Texture.png";
import VisionMission from "../assets/VisionMission.png";
import BluePlainBackgroundRotation from "../assets/BluePlainBackgroundRotation.png";
import EnlargedX from "../assets/EnlargedX.png";
import AvailableAtBG from "../assets/AvailableAtBG.png";
import ArrowDownPowerPurple from "../assets/ArrowDownPowerPurple.png";
import SunglowReaction from "../assets/SunglowReaction.png";
import GreenTarget from "../assets/GreenTarget.png";
import CyanBattery from "../assets/CyanBattery.png";
import FirstCol from "../assets/FirstCol.png";
import SecondCol from "../assets/SecondCol.png";
import WithoutX from "../assets/WithoutX.png";
import ThirdCol from "../assets/ThirdCol.png";
import BlackArrow from "../assets/BlackArrow.png";
import FaqDown from "../assets/FaqDown.png";
import FaqUp from "../assets/FaqUp.png";
import TakeCharge from "../components/TakeCharge";
import BlogCard from "../components/BlogCard";
// import DiscoverColl from "../assets/DiscoverColl.png";
import DiscoverCollPurple from "../assets/DiscoverCollPurple.png";
import About10XIcon2 from "../assets/About10XIcon2.png";
import About10XIcon1 from "../assets/About10XIcon1.png";
import About10XIcon3 from "../assets/About10XIcon3.png";

const AboutUs = () => {
  return (
    <div className="about-section">
      {/* About Hero Section */}
      <div className="about-hero grid grid-cols-1 lg:grid-cols-2 relative w-full">
        {/* Left Section with Background */}
        <div
          className="relative flex flex-col justify-center pl-20 pr-8 bg-blue-900 text-white"
          style={{
            backgroundImage: `url(${BluePlainBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="z-10">
            {/* Heading */}
            <h2 className="sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl quantico-bold-italic">
              HARNESS <br />
              YOUR <br />
              POTENTIAL
            </h2>

            {/* Paragraph */}
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed pt-sans-regular mt-4">
              10X Formulas was born out of a deep understanding of nutritional
              needs and a dedication to improving people's daily performance
              through proper brain nourishment. Harness your potential with 10X
              to tackle your day with confidence and clarity.
            </p>

            {/* Buttons */}
            <div className="buttons flex gap-8 mt-8">
              <div className="learn-more bg-white">
                <button
                  className="quantico-bold-italic text-xl uppercase"
                  type="button"
                >
                  LEARN MORE
                </button>
              </div>
              <div className="contact-us">
                <button
                  className="uppercase text-xl pr-8 bg-transparent quantico-bold-italic border border-white text-white font-bold rounded-sm focus:outline-none hover:shadow-lg shadow-[0px_2px_8px_rgba(255,255,255,0.8)] transition-shadow duration-300 ease-in-out"
                  type="button"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section with Image and Larger Arrow Overlay */}
        <div className="relative w-full h-64 lg:h-auto">
          {/* Background Image */}
          <div className="w-full h-full">
            <img
              src={AboutImage}
              alt="About Us"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Larger Arrow Overlay */}
          <div
            className="absolute top-1/2 left-0 transform -translate-y-1/2 w-20 h-32 lg:w-28 lg:h-48"
            style={{
              clipPath: "polygon(0 0, 100% 50%, 0 100%)",
              backgroundImage: `url(${ArrowTexture})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>

      {/* Our Mission and Vision */}
      <div
        className="main-vision-mission-div -mt-2 -mb-2 flex  transform"
        style={{
          backgroundImage: `url(${BluePlainBackgroundRotation})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="left w-1/2 px-20 py-48">
          <hr className="horizontal-carousel-hr border-0 bg-white my-2 w-full" />
          <h1 className="text-8xl font-bold uppercase tracking-wider text-white quantico-bold-italic">
            Our Mission <br />
            and Vision
          </h1>
          <hr className="horizontal-carousel-hr border-0 bg-white my-2 w-full" />
          <p className="text-xl pt-sans-regular text-white mt-10">
            10X Formulas creates pocket-sized nourishment that revitalises
            starved <br />
            brains and powers go-getters around the clock.
          </p>
          {/* Buttons */}
          <div className="buttons flex gap-8 mt-8">
            <div className="learn-more bg-white">
              <button
                className="quantico-bold-italic text-xl uppercase"
                type="button"
              >
                LEARN MORE
              </button>
            </div>
            <div className="contact-us">
              <button
                className="uppercase text-xl pr-8 bg-transparent quantico-bold-italic border border-white text-white font-bold rounded-sm focus:outline-none hover:shadow-lg shadow-[0px_2px_8px_rgba(255,255,255,0.8)] transition-shadow duration-300 ease-in-out"
                type="button"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>

        <div className="right flex w-1/2 overflow-hidden items-center justify-end">
          <div className="flex">
            <img
              src={VisionMission}
              className="w-auto h-auto mr-36"
              alt="Vision and Mission"
            />
          </div>
        </div>
      </div>

      {/* Our Journey to Success */}
      <div
        className="top bg-[#FDFDFD] -mt-4 -mb-2 flex py-20 px-20"
        style={{
          backgroundImage: `url(${AvailableAtBG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="left-top w-1/2">
          <hr className="horizontal-carousel-hr border-0 bg-black my-2 w-[559px]" />
          <h1 className="text-7xl font-bold uppercase tracking-wider text-black quantico-bold-italic">
            Our Journey <br />
            to Success
          </h1>
          <hr className="horizontal-carousel-hr border-0 bg-black my-2 w-[559px]" />
        </div>

        <div className="right-top w-1/2 flex items-center justify-end">
          <img
            className="w-[167px] h-[161px]"
            src={ArrowDownPowerPurple}
            alt="Arrow Down Power Purple"
          />
        </div>
      </div>

      <div
        className="bottom py-20 px-20"
        style={{
          backgroundImage: `url(${AvailableAtBG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Bottom Section 1 */}
        <div className="bottom-1 flex">
          <div
            className="left w-1/2 p-12"
            style={{
              backgroundImage: `url(${BluePlainBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <img
              className="w-[180px] h-auto -ml-8"
              src={SunglowReaction}
              alt="Sunglow Reaction"
            />
            <h1 className="text-5xl font-bold uppercase tracking-wider text-white quantico-bold-italic">
              10X <br /> Formulas
            </h1>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed pt-sans-regular mt-4 text-white">
              was founded after 20 years of experience in the lifestyle coaching
              business by Kunal Gir, a prominent coach in India. Over two
              decades, Kunal trained thousands of people, including top
              celebrities, and identified a significant problem: nutritional
              deficiencies affecting people’s mindsets. Recognizing that mindset
              is fundamental to everything, he decided to distill his knowledge
              into a convenient, effective solution accessible to everyone.
            </p>
          </div>
          <div className="right w-1/2">
            <img
              className="w-full"
              src={FirstCol}
              alt="First Column Illustration"
            />
          </div>
        </div>

        {/* Bottom Section 2 */}
        <div className="bottom2 flex">
          <div className="right w-1/2">
            <img
              className="w-full"
              src={SecondCol}
              alt="Second Column Illustration"
            />
          </div>
          <div
            className="left w-1/2 p-12"
            style={{
              backgroundImage: `url(${WithoutX})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <img
              className="w-[180px] h-auto -ml-8 mt-12"
              src={GreenTarget}
              alt="Green Target"
            />
            <h1 className="text-5xl font-bold uppercase tracking-wider text-white quantico-bold-italic">
              Kunal's <br />
              Previous Ventures
            </h1>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed pt-sans-regular mt-4 text-white">
              Include owning supplement stores and developing a supplement line.
              However, he realized that most nutrients should come from whole
              foods. Despite this belief, the challenges posed by modern
              agriculture and depleted food supplies necessitated a product that
              could be consumed quickly.
            </p>
          </div>
        </div>

        {/* Bottom Section 3 */}
        <div className="bottom-3 flex">
          <div
            className="left w-1/2 p-12"
            style={{
              backgroundImage: `url(${BluePlainBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <img
              className="w-[180px] h-auto -ml-8"
              src={CyanBattery}
              alt="Cyan Battery"
            />
            <h1 className="text-5xl font-bold uppercase tracking-wider text-white quantico-bold-italic">
              The Result
            </h1>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed pt-sans-regular mt-4 text-white">
              is 10X, a brain-boosting energy shot designed to address these
              deficiencies. Kunal's mission was to create something that could
              provide the most impactful solution to a widespread problem in the
              simplest way. After extensive research and consultations with
              neuroscientists and experts in nutrition, Kunal developed 10X to
              fill this critical gap.
            </p>
          </div>
          <div className="right w-1/2">
            <img
              className="w-full"
              src={ThirdCol}
              alt="Third Column Illustration"
            />
          </div>
        </div>
      </div>

      {/* USP's Section */}

      <div
        className="usp-section py-10 sm:py-20 px-4 sm:px-6 lg:px-20"
        style={{
          backgroundImage: `url(${BluePlainBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Top Decorative Image */}
        <div className="down-img flex justify-start mb-8 sm:mb-12">
          <img
            className="w-32 sm:w-56 h-auto -mb-16 sm:-mb-60 -ml-4 sm:-ml-10 z-10"
            src={FaqUp}
            alt="Decorative Arrow Up"
            loading="lazy"
            aria-hidden="true"
          />
        </div>

        {/* USP Items */}
        <div className="usp-items flex flex-col gap-8 sm:gap-12 mb-12">
          {/* First Row */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Catalyst */}
            <div className="left w-full lg:w-1/2 bg-white py-24 sm:py-32 lg:py-28 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
              <div className="img flex justify-center sm:justify-start">
                <img
                  className="w-24 sm:w-[93px] h-auto transform -rotate-90"
                  src={BlackArrow}
                  alt="Decorative Arrow"
                />
              </div>

              <div className="content text-center sm:text-left">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-black quantico-bold-italic">
                  CATALYST
                </h3>
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed pt-sans-regular mt-4 text-black">
                  10X is the catalyst that empowers <br />
                  people to seize their day at their best.
                </p>
              </div>
            </div>

            {/* Excellence */}
            <div className="right w-full lg:w-1/2 bg-white py-24 sm:py-32 lg:py-28 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
              <div className="img flex justify-center sm:justify-start">
                <img
                  className="w-24 sm:w-[93px] h-auto transform -rotate-90"
                  src={BlackArrow}
                  alt="Decorative Arrow"
                />
              </div>

              <div className="content text-center sm:text-left">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-black quantico-bold-italic">
                  EXCELLENCE
                </h3>
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed pt-sans-regular mt-4 text-black">
                  Life is a challenge, that’s why <br />
                  people need a high-performance <br />
                  shot to stay at the top.
                </p>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Control */}
            <div className="left w-full lg:w-1/2 bg-white py-24 sm:py-32 lg:py-28 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
              <div className="img flex justify-center sm:justify-start">
                <img
                  className="w-24 sm:w-[93px] h-auto transform -rotate-90"
                  src={BlackArrow}
                  alt="Decorative Arrow"
                />
              </div>

              <div className="content text-center sm:text-left">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-black quantico-bold-italic">
                  CONTROL
                </h3>
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed pt-sans-regular mt-4 text-black">
                  We believe in giving people control <br />
                  over their energy, their time, <br />
                  and their entire day.
                </p>
              </div>
            </div>

            {/* Potential */}
            <div className="right w-full lg:w-1/2 bg-white py-24 sm:py-32 lg:py-28 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
              <div className="img flex justify-center sm:justify-start">
                <img
                  className="w-24 sm:w-[93px] h-auto transform -rotate-90"
                  src={BlackArrow}
                  alt="Decorative Arrow"
                />
              </div>

              <div className="content text-center sm:text-left">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-black quantico-bold-italic">
                  POTENTIAL
                </h3>
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed pt-sans-regular mt-4 text-black">
                  10X doesn’t just help you get <br />
                  through the day, it unlocks <br />
                  your potential every day.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Image */}
        <div className="down-img flex justify-end mt-8 sm:mt-12">
          <img
            className="w-40 sm:w-64 h-auto -mt-12 sm:-mt-36 -mr-4 sm:-mr-10 z-10"
            src={FaqDown}
            alt="Decorative Arrow Down"
            loading="lazy"
            aria-hidden="true"
          />
        </div>
      </div>

      <TakeCharge />

      {/* Rejuvenate-Section */}

      <div
        className="main-div-rejuvenate py-20 px-20"
        style={{
          backgroundImage: `url(${BluePlainBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="top flex">
          <div className="left w-[60%]">
            <h1 className="text-8xl font-bold  uppercase tracking-wider text-white quantico-bold-italic">
              Rejuvenate your <br />
              body with 10x
            </h1>
          </div>

          <div className="right w-[40%] flex justify-end">
            <p className="text-xl pt-sans-regular text-white">
              Experience the 10X difference and take on your <br />
              day with renewed vitality.
            </p>
          </div>
        </div>

        <div className="bottom flex mt-12">
          <div className="div-1 w-1/3 p-8">
            <img
              className="w-[180px] h-auto -ml-8"
              src={About10XIcon2}
              alt=""
            />
            <h3 className="uppercase nimbusL-bol text-white text-2xl">
              Regenerate your cells{" "}
            </h3>
            <p className="text-base pt-sans-regular text-white mt-5">
              Our advanced formula is backed by years of <br />
              research and is proven to regenerate cells,
              <br /> promoting overall health and vitality.
            </p>

            <button className="quantico-bold-italic text-white text-lg mt-5 uppercase">
              learn more <i class="ml-4 fa-solid fa-angle-right"></i>
            </button>
          </div>
          <div className="div-2 w-1/3 p-8">
            <img
              className="w-[180px] h-auto -ml-8"
              src={About10XIcon1}
              alt=""
            />
            <h3 className="uppercase nimbusL-bol text-white text-2xl  mt-4">
              the ultimate energy boost{" "}
            </h3>
            <p className="text-base pt-sans-regular text-white mt-5">
              Boost your energy levels and stay productive
              <br /> throughout the day with our powerful and natural <br />
              brain battery.
            </p>

            <button className="quantico-bold-italic text-white text-lg mt-5 uppercase">
              learn more <i class="ml-4 fa-solid fa-angle-right"></i>
            </button>
          </div>
          <div className="div-3 w-1/3 p-8">
            <img
              className="w-[180px] h-auto -ml-8"
              src={About10XIcon3}
              alt=""
            />
            <h3 className="uppercase nimbusL-bol text-white text-2xl mt-12">
              Unlock your full potential{" "}
            </h3>
            <p className="text-base pt-sans-regular text-white mt-5">
              Experience a renewed sense of vitality and unlock
              <br /> your full potential with our revolutionary winner’s
              <br /> shot.
            </p>

            <button className="quantico-bold-italic text-white text-lg mt-5 uppercase">
              learn more <i class="ml-4 fa-solid fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Discover Collection */}
      <div>
        <div className="main-div flex w-full">
          <div
            className="left-column w-1/2 pt-28 pl-20 pr-20 pb-28 flex flex-col justify-center"
            style={{
              backgroundImage: `url(${AvailableAtBG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* <hr className="horizontal-carousel-hr border-0 bg-white my-2 w-full" /> */}
            <h1 className="text-8xl font-bold  uppercase tracking-wider text-black quantico-bold-italic">
              Discover Our <br />
              Collection of <br />
              Products
            </h1>
            {/* <hr className="horizontal-carousel-hr border-0 bg-white my-2 w-full" /> */}
            <p className="text-xl pt-sans-regular text-black mt-10">
              Experience the 10X difference with our expansive range.
            </p>

            {/* Bottom Buttons */}
            <div className="flex space-x-4 justify-start mt-10">
              <div className="learn-more">
                <button
                  className="uppercase shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-[#0821D2] quantico-bold-italic text-xl "
                  type="button"
                >
                  shop now
                </button>
                <button
                  className="uppercase quantico-bold-italic text-xl ml-4"
                  type="button"
                >
                  see all <i class="ml-2 fa-solid fa-angle-right"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="right-column w-1/2">
            <img className="w-full" src={DiscoverCollPurple} alt="" srcset="" />
            {/* <img className="-mt-56 -ml-36" src={About10XBottom} alt="" /> */}
          </div>
        </div>
      </div>

      <BlogCard />
    </div>
  );
};

export default AboutUs;
