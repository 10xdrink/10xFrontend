// src/pages/ErrorPage.jsx

import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BluePlainBackground from "../assets/Blue Plain Background.png";
import axios from "axios"; // Import axios for API calls

const ErrorPage = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // Add state to hold fetched products
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [fetchError, setFetchError] = useState(null); // Error state
  const backendURL = import.meta.env.VITE_API_URL;


  // Fetch latest 4 products from the backend
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await axios.get(`${backendURL}/products`, {
          params: { sort: 'createdAt', order: 'desc', limit: 4 },
        });

        if (response.data.success) {
          setLatestProducts(response.data.products);
        } else {
          setFetchError('Failed to fetch latest products.');
        }
      } catch (err) {
        console.error('Error fetching latest products:', err);
        setFetchError('An error occurred while fetching latest products.');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  const scrollToIndex = (index) => {
    const width = carouselRef.current ? carouselRef.current.offsetWidth : 0;
    setCurrentIndex(index);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: width * index, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const width = carouselRef.current ? carouselRef.current.offsetWidth : 0;
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: width * currentIndex,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % latestProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + latestProducts.length) % latestProducts.length
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
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="main-div flex">
      {/* Left Section with Background and Buttons */}
      <div
        className="left w-[70%] px-12 pt-36 pb-36"
        style={{
          backgroundImage: `url(${BluePlainBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-9xl text-white uppercase quantico-bold-italic">
          Oops! <br />
          wrong <br />
          battery
        </h1>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed pt-sans-regular mt-4 text-white">
          We couldn't find the page you're looking for. Please check the <br />
          URL or go back to the homepage.
        </p>
        <div className="buttons flex gap-8 mt-8">
          <div className="learn-more bg-white">
            <Link to="/">
              <button className="quantico-bold-italic text-xl uppercase" type="button">
                home
              </button>
            </Link>
          </div>
          <div className="contact-us">
            <Link to="/contact">
              <button
                className="text-xl pr-8 bg-transparent quantico-bold-italic border border-white text-white font-bold rounded-sm focus:outline-none hover:shadow-lg shadow-[0px_2px_8px_rgba(255,255,255,0.8)] transition-shadow duration-300 ease-in-out uppercase"
                type="button"
              >
                contact
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Section with Carousel */}
      <div className="right w-[30%] m-0 p-0">
        <div className="relative">
          {/* Product Cards Carousel */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto w-full scrollbar-hide scroll-smooth"
            style={{ scrollBehavior: "smooth" }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
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
                    className="mb-4 w-full h-auto object-cover"
                  />
                  <div className="mb-2 p-8">
                    <h2 className="font-bold text-2xl text-black nimbusL-bol">
                      {product.title}
                    </h2>
                    <p className="text-base text-black">
                      {product.description}
                    </p>
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
          <div className="bottom-0 w-full flex items-center justify-between p-8">
            {/* Dots */}
            <div className="flex space-x-2">
              {/* Render dots only if there are products */}
              {!loading && !fetchError && latestProducts.length > 0 && (
                Array.from({ length: latestProducts.length }).map((_, index) => (
                  <span
                    key={index}
                    onClick={() => scrollToIndex(index)}
                    className={`cursor-pointer w-3 h-3 rounded-full ${
                      index === currentIndex
                        ? "bg-gradient-to-r from-[#9857F3] to-[#5A10D4]"
                        : "bg-[#D8C6F1]"
                    }`}
                  />
                ))
              )}
            </div>

            {/* Arrows */}
            <div className="flex space-x-4 p-2">
              {/* Render arrows only if there are products */}
              {!loading && !fetchError && latestProducts.length > 0 && (
                <>
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
