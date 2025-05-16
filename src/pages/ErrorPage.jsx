// src/pages/ErrorPage.jsx

import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BluePlainBackground from "../assets/Blue Plain Background.png";
import axios from "axios"; // Import axios for API calls

const ErrorPage = () => {
  // Refs for Desktop and Mobile Carousels
  const desktopCarouselRef = useRef(null);
  const mobileCarouselRef = useRef(null);

  // States for Desktop Carousel
  const [currentIndexDesktop, setCurrentIndexDesktop] = useState(0);
  const [isDraggingDesktop, setIsDraggingDesktop] = useState(false);
  const [startXDesktop, setStartXDesktop] = useState(0);
  const [scrollLeftDesktop, setScrollLeftDesktop] = useState(0);

  // States for Mobile Carousel
  const [currentIndexMobile, setCurrentIndexMobile] = useState(0);
  const [isDraggingMobile, setIsDraggingMobile] = useState(false);
  const [startXMobile, setStartXMobile] = useState(0);
  const [scrollLeftMobile, setScrollLeftMobile] = useState(0);

  // State to hold fetched products
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [fetchError, setFetchError] = useState(null); // Error state
  const backendURL = import.meta.env.VITE_API_URL;

  // Fetch latest 4 products from the backend
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await axios.get(`${backendURL}/products`, {
          params: { sort: "createdAt", order: "desc", limit: 4 },
        });

        if (response.data.success) {
          setLatestProducts(response.data.products);
        } else {
          setFetchError("Failed to fetch latest products.");
        }
      } catch (err) {
        console.error("Error fetching latest products:", err);
        setFetchError("An error occurred while fetching latest products.");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  // Desktop Carousel Functions
  const scrollToIndexDesktop = (index) => {
    const width = desktopCarouselRef.current
      ? desktopCarouselRef.current.offsetWidth
      : 0;
    setCurrentIndexDesktop(index);
    if (desktopCarouselRef.current) {
      desktopCarouselRef.current.scrollTo({
        left: width * index,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const width = desktopCarouselRef.current
      ? desktopCarouselRef.current.offsetWidth
      : 0;
    if (desktopCarouselRef.current) {
      desktopCarouselRef.current.scrollTo({
        left: width * currentIndexDesktop,
        behavior: "smooth",
      });
    }
  }, [currentIndexDesktop]);

  const nextSlideDesktop = () => {
    setCurrentIndexDesktop(
      (prevIndex) => (prevIndex + 1) % latestProducts.length
    );
  };

  const prevSlideDesktop = () => {
    setCurrentIndexDesktop(
      (prevIndex) =>
        (prevIndex - 1 + latestProducts.length) % latestProducts.length
    );
  };

  const handleMouseDownDesktop = (e) => {
    setIsDraggingDesktop(true);
    setStartXDesktop(e.pageX - desktopCarouselRef.current.offsetLeft);
    setScrollLeftDesktop(desktopCarouselRef.current.scrollLeft);
  };

  const handleMouseLeaveDesktop = () => {
    setIsDraggingDesktop(false);
  };

  const handleMouseUpDesktop = () => {
    setIsDraggingDesktop(false);
  };

  const handleMouseMoveDesktop = (e) => {
    if (!isDraggingDesktop) return;
    e.preventDefault();
    const x = e.pageX - desktopCarouselRef.current.offsetLeft;
    const walk = (x - startXDesktop) * 2;
    desktopCarouselRef.current.scrollLeft = scrollLeftDesktop - walk;
  };

  // Mobile Carousel Functions
  const scrollToIndexMobile = (index) => {
    const width = mobileCarouselRef.current
      ? mobileCarouselRef.current.offsetWidth
      : 0;
    setCurrentIndexMobile(index);
    if (mobileCarouselRef.current) {
      mobileCarouselRef.current.scrollTo({
        left: width * index,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const width = mobileCarouselRef.current
      ? mobileCarouselRef.current.offsetWidth
      : 0;
    if (mobileCarouselRef.current) {
      mobileCarouselRef.current.scrollTo({
        left: width * currentIndexMobile,
        behavior: "smooth",
      });
    }
  }, [currentIndexMobile]);

  const nextSlideMobile = () => {
    setCurrentIndexMobile(
      (prevIndex) => (prevIndex + 1) % latestProducts.length
    );
  };

  const prevSlideMobile = () => {
    setCurrentIndexMobile(
      (prevIndex) =>
        (prevIndex - 1 + latestProducts.length) % latestProducts.length
    );
  };

  const handleMouseDownMobile = (e) => {
    setIsDraggingMobile(true);
    setStartXMobile(e.pageX - mobileCarouselRef.current.offsetLeft);
    setScrollLeftMobile(mobileCarouselRef.current.scrollLeft);
  };

  const handleMouseLeaveMobile = () => {
    setIsDraggingMobile(false);
  };

  const handleMouseUpMobile = () => {
    setIsDraggingMobile(false);
  };

  const handleMouseMoveMobile = (e) => {
    if (!isDraggingMobile) return;
    e.preventDefault();
    const x = e.pageX - mobileCarouselRef.current.offsetLeft;
    const walk = (x - startXMobile) * 2;
    mobileCarouselRef.current.scrollLeft = scrollLeftMobile - walk;
  };

  return (
    <div className="main-div flex flex-col md:flex-row">
      {/* Left Section with Background and Buttons */}
      <div
        className="left w-full md:w-[70%] px-6 md:px-12 pt-20 md:pt-36 pb-20 md:pb-36"
        style={{
          backgroundImage: `url(${BluePlainBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-8xl md:text-9xl text-white uppercase quantico-bold-italic">
          Oops! <br />
          wrong <br />
          battery
        </h1>
        <p className="text-lg sm:text-base lg:text-lg leading-relaxed pt-sans-regular mt-4 text-white">
          We couldn't find the page you're looking for. Please check the 
          URL or go back to the homepage.
        </p>
        <div className="buttons flex gap-4 sm:gap-8 mt-8">
          <div className="learn-more bg-white">
            <Link to="/">
              <button
                className="quantico-bold-italic text-xl uppercase px-4 py-2"
                type="button"
              >
                Home
              </button>
            </Link>
          </div>
          <div className="contact-us">
            <Link to="/contact">
              <button
                className="text-xl pr-8 bg-transparent quantico-bold-italic border border-white text-white font-bold rounded-sm focus:outline-none hover:shadow-lg shadow-[0px_2px_8px_rgba(255,255,255,0.8)] transition-shadow duration-300 ease-in-out uppercase px-4 py-2"
                type="button"
              >
                Contact
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Section with Carousel - Visible on PC and Laptop */}
      <div className="right w-full md:w-[30%] m-0 p-0 hidden md:block">
        <div className="relative h-full">
          {/* Product Cards Carousel */}
          <div
            ref={desktopCarouselRef}
            className="flex overflow-x-auto w-full scrollbar-hide scroll-smooth"
            style={{ scrollBehavior: "smooth" }}
            onMouseDown={handleMouseDownDesktop}
            onMouseLeave={handleMouseLeaveDesktop}
            onMouseUp={handleMouseUpDesktop}
            onMouseMove={handleMouseMoveDesktop}
          >
            {/* Handle Loading and Error States */}
            {loading ? (
              <div className="flex items-center justify-center w-full">
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : fetchError ? (
              <div className="flex items-center justify-center w-full">
                <p className="text-red-500">{fetchError}</p>
              </div>
            ) : latestProducts.length > 0 ? (
              latestProducts.map((product) => (
                <div
                  key={product._id}
                  className="w-full flex-shrink-0 bg-white shadow-lg border border-gray-200 rounded-lg text-start"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="mb-4 w-full h-[570px] object-cover rounded-t-lg"
                  />
                  <div className="mb-2 p-4">
                    <h2 className="font-bold text-xl text-black nimbusL-bol">
                      {product.title}
                    </h2>
                    <p className="text-base text-black">{product.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center w-full">
                <p className="text-gray-500">No products available.</p>
              </div>
            )}
          </div>

          {/* Navigation Dots and Arrows */}
          <div className="bottom-0 w-full flex items-center justify-between p-4">
            {/* Dots */}
            <div className="flex space-x-2">
              {/* Render dots only if there are products */}
              {!loading && !fetchError && latestProducts.length > 0 &&
                latestProducts.map((_, index) => (
                  <span
                    key={index}
                    onClick={() => scrollToIndexDesktop(index)}
                    className={`cursor-pointer w-3 h-3 rounded-full ${
                      index === currentIndexDesktop
                        ? "bg-gradient-to-r from-[#9857F3] to-[#5A10D4]"
                        : "bg-[#D8C6F1]"
                    }`}
                  />
                ))}
            </div>

            {/* Arrows */}
            <div className="flex space-x-4 p-2">
              {/* Render arrows only if there are products */}
              {!loading && !fetchError && latestProducts.length > 0 && (
                <>
                  <button
                    onClick={prevSlideDesktop}
                    className="bg-transparent py-2 px-4 border text-[#9857F3] border-[#9857F3] hover:bg-[#9857F3] hover:text-white transition duration-300"
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                  <button
                    onClick={nextSlideDesktop}
                    className="bg-transparent py-2 px-4 border text-[#9857F3] border-[#9857F3] hover:bg-[#9857F3] hover:text-white transition duration-300"
                  >
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section with Carousel - Visible on Mobile */}
      <div className="right-mobile w-full md:hidden p-4">
        <div className="relative">
          {/* Product Cards Carousel */}
          <div
            ref={mobileCarouselRef}
            className="flex overflow-x-auto w-full scrollbar-hide scroll-smooth space-x-4"
            style={{ scrollBehavior: "smooth" }}
            onMouseDown={handleMouseDownMobile}
            onMouseLeave={handleMouseLeaveMobile}
            onMouseUp={handleMouseUpMobile}
            onMouseMove={handleMouseMoveMobile}
          >
            {/* Handle Loading and Error States */}
            {loading ? (
              <div className="flex items-center justify-center w-full">
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : fetchError ? (
              <div className="flex items-center justify-center w-full">
                <p className="text-red-500">{fetchError}</p>
              </div>
            ) : latestProducts.length > 0 ? (
              latestProducts.map((product) => (
                <div
                  key={product._id}
                  className="min-w-[80%] bg-white shadow-lg border border-gray-200 rounded-lg text-start"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="mb-4 w-full h-96 object-cover rounded-t-lg"
                  />
                  <div className="mb-2 p-4">
                    <h2 className="font-bold text-lg text-black nimbusL-bol">
                      {product.title}
                    </h2>
                    <p className="text-sm text-black">{product.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center w-full">
                <p className="text-gray-500">No products available.</p>
              </div>
            )}
          </div>

          {/* Navigation Dots and Arrows */}
          <div className="bottom-0 w-full flex items-center justify-between p-4 mt-4">
            {/* Dots */}
            <div className="flex space-x-2">
              {/* Render dots only if there are products */}
              {!loading && !fetchError && latestProducts.length > 0 &&
                latestProducts.map((_, index) => (
                  <span
                    key={index}
                    onClick={() => scrollToIndexMobile(index)}
                    className={`cursor-pointer w-3 h-3 rounded-full ${
                      index === currentIndexMobile
                        ? "bg-gradient-to-r from-[#9857F3] to-[#5A10D4]"
                        : "bg-[#D8C6F1]"
                    }`}
                  />
                ))}
            </div>

            {/* Arrows */}
            <div className="flex space-x-2">
              {/* Render arrows only if there are products */}
              {!loading && !fetchError && latestProducts.length > 0 && (
                <>
                  <button
                    onClick={prevSlideMobile}
                    className="bg-transparent py-2 px-4 border text-[#9857F3] border-[#9857F3] hover:bg-[#9857F3] hover:text-white transition duration-300 "
                  >
                    <i className="fa-solid fa-arrow-left text-sm"></i>
                  </button>
                  <button
                    onClick={nextSlideMobile}
                    className="bg-transparent py-2 px-4 border text-[#9857F3] border-[#9857F3] hover:bg-[#9857F3] hover:text-white transition duration-300 "
                  >
                    <i className="fa-solid fa-arrow-right text-sm"></i>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Ensure the export is at the top level, outside of the component function
export default ErrorPage;
