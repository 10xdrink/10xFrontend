// src/components/BenefitMobile.jsx

import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api"; // Import the API utility
import { CartContext } from "../context/CartContext"; // Import CartContext
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import { ProductContext } from "../context/ProductContext";
import { convertAndFormatPrice } from "../utils/currencyUtils";
import Toast from "./Toast"; // Import the Toast component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import debounce from "lodash.debounce";

const BenefitMobile = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentScrollLeft, setCurrentScrollLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [productsPerSlide, setProductsPerSlide] = useState(3); // Default for desktop

  // Access addToCart and cartError from CartContext
  const { addToCart, error: cartError } = useContext(CartContext);

  // Access user from AuthContext
  const { user } = useContext(AuthContext);

  // Toast states
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success"); // 'success', 'error', 'info'

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

  // Determine the number of products per slide based on screen width
  useEffect(() => {
    const updateProductsPerSlide = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setProductsPerSlide(1); // Mobile
      } else if (width >= 640 && width < 1024) {
        setProductsPerSlide(2); // Tablet
      } else {
        setProductsPerSlide(3); // Desktop
      }
    };

    updateProductsPerSlide();

    const handleResize = debounce(() => {
      updateProductsPerSlide();
    }, 300);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate the number of slides based on products fetched and productsPerSlide
  const totalSlides = Math.ceil(products.length / productsPerSlide);

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
  }, [currentIndex, productsPerSlide]);

  // Handle mouse and touch events for dragging/swiping
  const handleDragStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX - carouselRef.current.offsetLeft);
    setCurrentScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    const x = clientX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust the scroll speed
    carouselRef.current.scrollLeft = currentScrollLeft - walk;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Snap to the nearest slide
    const width = carouselRef.current ? carouselRef.current.offsetWidth : 0;
    const newIndex = Math.round(carouselRef.current.scrollLeft / width);
    setCurrentIndex(newIndex);
  };

  // Mouse event handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    handleDragEnd();
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Handle Add to Cart with login check
  const handleAddToCart = (product) => {
    if (!user) {
      setToastMessage(
        "Make sure you are logged in to add the products to the cart."
      );
      setToastType("error");
      setToastVisible(true);
      return;
    }

    addToCart({
      id: product._id,
      title: product.title,
      price: product.variants[0].price,
      thumbnail: product.thumbnail,
      quantity: 1,
      variant: product.variants[0].size,
      packaging: "Bottle", // Adjust as needed
    });

    setToastMessage(`${product.title} has been added to your cart.`);
    setToastType("success");
    setToastVisible(true);
  };

  if (loading) {
    return (
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-20 py-16">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-20 py-16">
        <div className="text-center text-red-500">
          Failed to load products. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="block lg:hidden w-full mx-auto px-4 sm:px-6 lg:px-20 py-16">
      {/* Title and Description */}
      <div className="text-start mb-12 w-full flex flex-col sm:flex-row justify-between items-center">
        <div className="txt-container w-full sm:w-1/2 mb-6 sm:mb-0">
          <hr className="horizontal-carousel-hr border-0 bg-black my-2 w-[90%]" />
          <h1 className="text-6xl sm:text-9xl font-bold uppercase tracking-wider text-black quantico-bold-italic">
          benefits <br/>of 10X
          </h1>
          <hr className="horizontal-carousel-hr border-0 bg-black my-4 w-[90%]" />
          <p className="text-[18px] pt-sans-regular">
            Discover our range of energy-boosting supplements.
          </p>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Product Cards Carousel */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto w-full scrollbar-hide scroll-smooth gap-4 sm:gap-6"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {products.map((product) => (
            <div
              key={product._id}
              className="min-w-full sm:min-w-1/2 lg:min-w-1/3 flex-shrink-0 bg-white p-4 shadow-lg border border-gray-200 rounded-lg text-start"
            >
              <Link to={`/products/${product.slug}`}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="mb-4 w-full h-96 sm:h-56 lg:h-64 object-cover rounded"
                  loading="lazy"
                />
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <h2 className="font-bold text-lg sm:text-xl text-black">
                      {product.title}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-700">
                      {product.variants[0].size}
                    </p>
                  </div>
                  <p className="text-md sm:text-lg text-black pt-sans-bold">
                    {convertAndFormatPrice(product.variants[0].price)}
                  </p>
                </div>
              </Link>
              <div className="">
                <button
                  className="w-full mt-6 uppercase quantico-bold-italic text-lg md:text-xl bg-gradient-to-r from-black to-[#0821D2] text-white py-3 px-6 md:px-8 font-bold focus:outline-none hover:shadow-lg transition duration-300 ease-in-out "
                  type="button"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots and Arrows */}
        <div className="bottom-0 w-full flex items-center justify-between p-4 mt-4">
          {/* Dots */}
          <div className="flex space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <span
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`cursor-pointer w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
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
              className="bg-transparent py-2 px-4 border border-[#9857F3] text-[#9857F3] hover:bg-[#9857F3] hover:text-white transition duration-300"
              aria-label="Previous Slide"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              onClick={nextSlide}
              className="bg-transparent py-2 px-4 border border-[#9857F3] text-[#9857F3] hover:bg-[#9857F3] hover:text-white transition duration-300"
              aria-label="Next Slide"
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>

      <div className="btn-container w-full sm:w-full text-center sm:text-right">
        <div className="learn-more">
          <Link to="/products">
            <button
              className="w-full mt-8 shadow-md bg-transparent border border-[#0821D2] quantico-bold-italic text-lg sm:text-xl uppercase rounded hover:bg-[#0821D2] transition-colors duration-300"
              type="button"
            >
              View All
            </button>
          </Link>
        </div>
      </div>

      {/* Optional: Display error message from CartContext (if any) */}
      {cartError && (
        <div className="mt-4 text-center text-red-500">{cartError}</div>
      )}

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
        type={toastType}
        duration={3000} // Toast disappears after 3 seconds
      />
    </div>
  );
};

export default BenefitMobile;
