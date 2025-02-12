import React from "react";
import Slider from "react-slick";

// Import your images as needed
import Benefit1 from "../assets/Benefit1.png";
import Benefit2 from "../assets/Benefit2.png";
import Benefit3 from "../assets/Benefit3.png";
import Ms1 from "../assets/Ms1.png";
import Ms2 from "../assets/Ms2.png";
import Ms3 from "../assets/Ms3.png";
import BluePlainBackground from "../assets/Blue Plain Background.png";

// Import slick-carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/** 
 * Custom arrow components
 */
function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="group absolute right-8 bottom-0 top-0 flex items-center z-10 cursor-pointer"
    >
      {/* Outer square with purple border (transparent background) */}
      <div
        className="
          flex 
          items-center 
          justify-center 
          w-10 h-10 
          bg-purple-500
          border-2 
          border-purple-500 
          hover:bg-purple-500 
          transition-colors
        "
      >
        {/* SVG Right Arrow (purple by default; white on hover) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white group-hover:text-white transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="group absolute left-8 bottom-0 top-0 flex items-center z-10 cursor-pointer"
    >
      {/* Outer square with purple border (transparent background) */}
      <div
        className="
          flex 
          items-center 
          justify-center 
          w-10 h-10 
          bg-purple-500
          border-2 
          border-purple-500 
          hover:bg-purple-500 
          transition-colors
        "
      >
        {/* SVG Left Arrow (purple by default; white on hover) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white group-hover:text-white transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
    </div>
  );
}

const Benefits10X = () => {
  // Data for benefits (used in mobile slider)
  const benefits = [
    {
      img: Ms1,
      title: "Powerhouse of Rejuvenation",
      description:
        "Whether it’s invigoration for your busy day or the wind down at night so you can rest and recharge, 10X amplifies nourishment for peak performance. It’s rapid nourishment for a starving brain.",
    },
    {
      img: Ms2,
      title: "The Winner’s Shot",
      description:
        "It’s an essential boost in an easy to carry, convenient pack that doesn’t need refrigeration and fits in a pocket for high flyers, go-getters, and people outworking the competition.",
    },
    {
      img: Ms3,
      title: "Energy You Can Control",
      description:
        "Forget nervous, jittery, unsteady energy that’s explosive and puts you in a briefly heightened state. 10X is collected, expansive energy that your brain can regulate all day and night.",
    },
  ];

  /**
   * Slider settings for react-slick
   * - `nextArrow` and `prevArrow` point to custom arrow components.
   * - `customPaging` and `appendDots` let us style the dots as in the screenshot.
   */
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // Use appendDots to position the dots, and customPaging to define each dot
    appendDots: (dots) => (
      <div>
        <ul className="flex justify-center space-x-2 mt-4">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      // This is what each dot looks like when NOT active
      <div className="h-3 w-3 rounded-full bg-gray-400 cursor-pointer" />
    ),
  };

  return (
    <div
      className="w-full relative bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(${BluePlainBackground})`,
      }}
    >
      {/*
        We need global or inline CSS to change the color of the "active" dot.
        Tailwind cannot target .slick-active easily by default, so we add a style block here.
      */}
      <style>{`
        .slick-dots li.slick-active div {
          background-color: #a855f7 !important; /* Purple for the active dot */
        }
      `}</style>

      {/* Desktop/Laptop Version */}
      <div className="hidden md:block py-32 px-20">
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
              With ZERO calories and ZERO sugar, 10X is an indispensable asset
              for those who want to plug into their maximum potential and
              harness every ounce of it in a healthy way. And we deliver within
              60 minutes of your purchase!
            </p>
          </div>
        </div>

        {/* Benefits Columns */}
        <div className="flex relative justify-center h-[500px] mb-12">
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
            <h3 className="uppercase nimbusL-bol text-xl">
              Powerhouse of Rejuvenation
            </h3>
            <p className="pt-sans-regular">
              Whether it’s invigoration for your busy day or the wind down at
              night so you can rest and recharge, 10X amplifies nourishment for
              peak performance. It’s rapid nourishment for a starving brain.
            </p>
          </div>
          <div className="w-[500px] ml-3 p-4">
            <h3 className="uppercase nimbusL-bol text-xl">The Winner’s Shot</h3>
            <p className="pt-sans-regular">
              It’s an essential boost in an easy to carry, convenient pack that
              doesn’t need refrigeration and fits in a pocket for high flyers,
              go-getters, and people outworking the competition.
            </p>
          </div>
          <div className="w-[500px] ml-3 p-4">
            <h3 className="uppercase nimbusL-bol text-xl">
              Energy You Can Control
            </h3>
            <p className="pt-sans-regular">
              Forget nervous, jittery, unsteady energy that’s explosive and puts
              you in a briefly heightened state. 10X is collected, expansive
              energy that your brain can regulate all day and night.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="block md:hidden py-16 px-5">
        {/* Title and Description */}
        <div className="mb-8">
          <hr className="horizontal-carousel-hr border-0 bg-white my-2 w-full" />
          <h1 className="text-7xl font-bold uppercase tracking-wider text-start quantico-bold-italic">
            Benefits <br />
            of 10X
          </h1>
          <hr className="horizontal-carousel-hr border-0 bg-white my-2 w-full" />
        </div>
        <div className="mb-8">
          <p className="text-lg text-start text-white">
            With ZERO calories and ZERO sugar, 10X is an indispensable asset for
            those who want to plug into their maximum potential and harness
            every ounce of it in a healthy way. And we deliver within 60 minutes
            of your purchase!
          </p>
        </div>

        {/* Slider */}
        <Slider {...sliderSettings}>
          {benefits.map((benefit, index) => (
            <div key={index} className="px-4">
              <div className="flex flex-col items-start">
                <div className="w-full h-full mb-4 overflow-hidden cursor-pointer">
                  <img
                    src={benefit.img}
                    alt={`Benefit ${index + 1}`}
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <h3 className="uppercase nimbusL-bol text-xl text-start mb-2">
                  {benefit.title}
                </h3>
                <p className="pt-sans-regular text-start">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Benefits10X;
