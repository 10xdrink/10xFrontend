// src/components/Carousel.jsx

import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api"; // Import the API utility
import { CartContext } from "../context/CartContext"; // Import CartContext

const Carousel = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Access addToCart and cartError from CartContext
  const { addToCart, error: cartError } = useContext(CartContext);

  // Fetch products from the backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products", {
          params: { limit: 9 }, // Adjust the limit as needed for the carousel
        });
        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          console.error("Failed to fetch products:", response.data.message);
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Calculate the number of slides based on products fetched
  const totalSlides = Math.ceil(products.length / 3); // Assuming 3 products per slide

  // Scroll to a specific slide index
  const scrollToIndex = (index) => {
    const width = carouselRef.current ? carouselRef.current.offsetWidth : 0;
    setCurrentIndex(index);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: width * index, behavior: "smooth" });
    }
  };

  // Handle slide navigation
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < totalSlides ? prevIndex + 1 : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : totalSlides - 1
    );
  };

  // Sync scrolling with currentIndex
  useEffect(() => {
    const width = carouselRef.current ? carouselRef.current.offsetWidth : 0;
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: width * currentIndex,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  // Handle mouse events for dragging
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
    const walk = (x - startX) * 2; // Adjust the scroll speed
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  if (loading) {
    return (
      <div className="w-full mx-auto px-20 py-16">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full mx-auto px-20 py-16">
        <div className="text-center text-red-500">
          Failed to load products. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-20 py-16">
      {/* Title and Description */}
      <div className="text-start mb-12 w-full flex justify-between items-center">
        <div className="txt-container w-1/2">
          <hr className="horizontal-carousel-hr border-0 bg-black my-4 w-96" />
          <h1 className="text-6xl font-bold uppercase tracking-wider text-black quantico-bold-italic">
            Collection
          </h1>
          <hr className="horizontal-carousel-hr border-0 bg-black my-4 w-96" />
          <p className="text-lg pt-sans-regular">
            Take a look at our expansive collection.
          </p>
        </div>
        <div className="btn-container w-1/2 text-right">
          <div className="learn-more">
            <Link to="/products">
              <button
                className="shadow-[0_4px_10px_rgba(0,0,0,0.3)] bg-transparent border border-[#0821D2] quantico-bold-italic text-xl uppercase mt-5"
                type="button"
              >
                View All
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Product Cards Carousel */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto w-full scrollbar-hide scroll-smooth gap-6"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {products.map((product) => (
            <div
              key={product._id}
              className="w-1/3 flex-shrink-0 bg-white p-4 shadow-lg border border-gray-200 rounded-lg text-start"
            >
              <Link to={`/products/${product.slug}`}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="mb-4 w-full h-auto object-cover rounded"
                />
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <h2 className="font-bold text-xl text-black">
                      {product.title}
                    </h2>
                    <p className="text-sm text-gray-900">
                      {product.variants[0].size}
                    </p>
                  </div>
                  <p className="text-lg text-black pt-sans-bold">
                    ${product.variants[0].price.toFixed(2)}
                  </p>
                </div>
              </Link>
              <div className="learn-more">
                <button
                  className="shadow-[0_4px_10px_rgba(0,0,0,0.3)] bg-transparent border border-[#0821D2] quantico-bold-italic text-xl w-full uppercase mt-5"
                  type="button"
                  onClick={() =>
                    addToCart({
                      id: product._id,
                      title: product.title,
                      price: product.variants[0].price,
                      thumbnail: product.thumbnail,
                      quantity: 1,
                      variant: product.variants[0].size,
                      packaging: "Bottle", // Adjust as needed
                    })
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots and Arrows */}
        <div className="bottom-0 w-full flex items-center justify-between p-4">
          {/* Dots */}
          <div className="flex space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
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
          <div className="flex space-x-4">
            <button
              onClick={prevSlide}
              className="bg-transparent py-2 px-4 border text-[#9857F3] border-[#9857F3] hover:bg-[#9857F3] hover:text-white transition duration-300"
              aria-label="Previous Slide"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button
              onClick={nextSlide}
              className="bg-transparent py-2 px-4 border text-[#9857F3] border-[#9857F3] hover:bg-[#9857F3] hover:text-white transition duration-300"
              aria-label="Next Slide"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Optional: Display error message from CartContext */}
      {cartError && (
        <div className="mt-4 text-center text-red-500">
          {cartError}
        </div>
      )}
    </div>
  );
};

export default Carousel;
