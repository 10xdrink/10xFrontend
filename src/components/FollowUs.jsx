import React, { useRef, useState, useEffect } from "react";
import VD1 from "../assets/VD1.png";
import VD2 from "../assets/VD2.png";
import LimeImageButton from "../assets/LimeImage.png";

const FollowUs = () => {
  const images = [
    VD1,
    VD2,
    VD1,
    VD2,
    VD1,
    VD2,
    VD1,
    VD2,
    VD1,
    // Add more images as needed
  ];

  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const slidesPerView = 3; // Number of images visible at once

  const scrollToIndex = (index) => {
    const width = carouselRef.current
      ? carouselRef.current.offsetWidth / slidesPerView
      : 0;
    setCurrentIndex(index);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: width * index, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const width = carouselRef.current
      ? carouselRef.current.offsetWidth / slidesPerView
      : 0;
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: width * currentIndex,
        behavior: "smooth",
      });
    }
  }, [currentIndex, slidesPerView]);

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % Math.ceil(images.length / slidesPerView)
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + Math.ceil(images.length / slidesPerView)) %
        Math.ceil(images.length / slidesPerView)
    );
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust the multiplier for sensitivity
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    // Add `hidden md:flex` to hide on mobile and show on medium+ screens
    <div className="main-div hidden md:flex bg-[#EEEEEE] py-12">
      <div className="left-col w-1/2">
        {/* Title and Description */}
        <div className="text-start mb-12 w-full px-20 py-12">
          <div className="txt-container">
            <hr className="horizontal-carousel-hr border-0 bg-black my-2 w-[80%]" />
            <h1 className="text-7xl font-bold uppercase tracking-wider text-black quantico-bold-italic">
              follow us <br /> on socials
            </h1>
            <hr className="horizontal-carousel-hr border-0 my-2 bg-black w-[80%]" />
            <p className="text-lg pt-sans-regular mt-4">
              Take a look at our expansive collection.
            </p>
          </div>

          <div className="mt-12">
            <div className="learn-more mt-8">
              <button
                className="shadow-[0_4px_10px_rgba(0,0,0,0.3)] uppercase border border-[#0821D2] quantico-bold-italic text-xl"
                type="button"
              >
                check out our socials
              </button>
            </div>
            <img
              className="w-28 h-18 -mt-24 -ml-16"
              src={LimeImageButton}
              alt="Lime Button"
            />
          </div>
        </div>
      </div>

      {/* right-col */}
      <div className="right-col w-[75%]">
        <div className="w-full mx-auto px-20 py-16">
          {/* Carousel Container */}
          <div className="relative">
            {/* Image Carousel */}
            <div
              ref={carouselRef}
              className="flex overflow-x-auto w-full scrollbar-hide scroll-smooth gap-6"
              style={{ scrollBehavior: "smooth" }}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {images.map((img, index) => (
                <div
                  key={index}
                  className="w-1/3 flex-shrink-0 bg-white shadow-lg border border-gray-200 rounded-lg"
                >
                  <img
                    src={img}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-auto object-cover rounded"
                  />
                </div>
              ))}
            </div>

            {/* Navigation Dots and Arrows */}
            <div className="bottom-0 w-full flex items-center justify-between mt-8">
              {/* Dots */}
              <div className="flex space-x-2">
                {Array.from({
                  length: Math.ceil(images.length / slidesPerView),
                }).map((_, index) => (
                  <span
                    key={index}
                    onClick={() => scrollToIndex(index)}
                    className={`cursor-pointer w-3 h-3 rounded-full ${
                      index === currentIndex
                        ? "bg-gradient-to-r from-[#9857F3] to-[#5A10D4]"
                        : "bg-[#D8C6F1]"
                    }`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={prevSlide}
                  className="bg-transparent py-2 px-4 border text-[#9857F3] border-[#9857F3] hover:bg-[#9857F3] hover:text-white transition duration-300"
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                <button
                  onClick={nextSlide}
                  className="bg-transparent py-2 px-4 border text-[#9857F3] border-[#9857F3] hover:bg-[#9857F3] hover:text-white transition duration-300"
                >
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUs;
