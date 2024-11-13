// src/components/ProductData.jsx

import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api"; // Import the API utility
import ProductPageBG from "../assets/ProductPageBG.png"; // Default background for not found
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import Toast from "./Toast"; // Import the Toast component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faChevronUp, faChevronDown, faQuestion, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const ProductData = () => {
  const { slug } = useParams(); // Get slug from URL
  const [product, setProduct] = useState(null);
  const { addToCart, error: cartError } = useContext(CartContext); // Extract cartError
  const { user } = useContext(AuthContext); // Access the user from AuthContext
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPackaging, setSelectedPackaging] = useState("Bottle");
  const [accordionOpen, setAccordionOpen] = useState(null); // Initialize to null
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPackagingOpen, setIsPackagingOpen] = useState(false);
  const [zoomStyle, setZoomStyle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Toast states
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success"); // 'success', 'error', 'info'

  // Fetch product details on component mount or when slug changes
  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/products/slug/${slug}`);
        if (response.data.success) {
          setProduct(response.data.data);
          // Initialize selected variant
          if (response.data.data.variants && response.data.data.variants.length > 0) {
            setSelectedVariant(response.data.data.variants[0]);
          }
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("An error occurred while fetching product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [slug]);

  // Handle Cart Context Errors
  useEffect(() => {
    if (cartError) {
      setToastMessage(cartError);
      setToastType("error");
      setToastVisible(true);
    }
  }, [cartError]);

  if (loading) {
    return (
      <div className="loading-spinner flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div
        style={{
          backgroundImage: `url(${ProductPageBG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="main-not-found py-48 text-black quantico-bold-italic items-center justify-center flex">
          <h1 className="text-5xl text-center">
            {error || "Product Not Found"} <i className="fa-solid fa-question"></i>
            <div className="button flex justify-center mt-8">
              <Link to={"/products"}>
                <button className="flex justify-center items-center quantico-bold-italic text-xl bg-gradient-to-r from-black to-[#0821D2] text-white py-3 px-8 font-bold focus:outline-none hover:shadow-lg transition duration-300 ease-in-out">
                  GO TO SHOP
                </button>
              </Link>
            </div>
          </h1>
        </div>
      </div>
    );
  }

  // Destructure product details
  const {
    title,
    description,
    category,
    tags,
    discountPercentage,
    brand,
    accordion,
    images,
    thumbnail,
    variants,
    productBG,
    rating,
  } = product;

  // Combine thumbnail with other images
  const imagesList = images && images.length > 0 ? [thumbnail, ...images] : [thumbnail];

  const handleAddToCart = () => {
    if (!selectedVariant) {
      setToastMessage("Please select a variant.");
      setToastType("error");
      setToastVisible(true);
      return;
    }

    if (user) {
      try {
        addToCart({
          id: product._id, // Use backend's unique ID
          title: product.title,
          price: selectedVariant.price,
          thumbnail: product.thumbnail,
          quantity,
          variant: selectedVariant.size,
          packaging: selectedPackaging,
        });

        setToastMessage(`${product.title} has been added to your cart.`);
        setToastType("success");
        setToastVisible(true);
      } catch (err) {
        console.error("Add to cart failed:", err);
        setToastMessage("Failed to add product to cart. Please try again.");
        setToastType("error");
        setToastVisible(true);
      }
    } else {
      setToastMessage("Make sure you are logged in to add the products to the cart.");
      setToastType("error");
      setToastVisible(true);
    }
  };

  const toggleAccordion = (section) => {
    setAccordionOpen(accordionOpen === section ? null : section);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % imagesList.length);
  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length);

  const handlePackagingChange = (value) => {
    setSelectedPackaging(value);
    setIsPackagingOpen(false);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomStyle({
      backgroundPosition: `${x}% ${y}%`,
      backgroundImage: `url(${imagesList[currentImageIndex]})`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle(null);
  };

  return (
    <div
      className="mx-auto px-36 py-24"
      style={{
        backgroundImage: `url(${productBG})`, // Use productBG from backend
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-wrap">
        {/* Product Images Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div
            className="w-[85%] h-auto mb-4 overflow-hidden relative cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              backgroundSize: "200%", // Adjust for zoom level
              ...zoomStyle,
            }}
          >
            <img
              src={imagesList[currentImageIndex]}
              alt={title}
              className="object-cover w-full h-full"
              style={{
                visibility: zoomStyle ? "hidden" : "visible",
              }}
            />
          </div>
          <div className="flex justify-start space-x-6 mb-4 w-full px-16">
            {imagesList.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-24 h-auto object-cover cursor-pointer ${
                  index === currentImageIndex ? "border-2 border-[#0821D2]" : ""
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
          <div className="flex justify-between items-center w-full mt-4 px-16">
            <div className="flex space-x-2">
              {[...Array(imagesList.length)].map((_, index) => (
                <span
                  key={index}
                  className={`h-3 w-3 rounded-full ${
                    index === currentImageIndex ? "bg-gray-200" : "bg-white"
                  }`}
                ></span>
              ))}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={prevImage}
                className="px-4 py-2 border border-white text-white"
                aria-label="Previous Image"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <button
                onClick={nextImage}
                className="px-4 py-2 border border-white text-white"
                aria-label="Next Image"
              >
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="w-full md:w-1/2 p-10 bg-white bg-opacity-90">
          <h1 className="text-[54px] quantico-bold-italic mb-4">
            {title}
          </h1>
          <p className="text-xl pt-sans-bold text-black mb-2">
            ${selectedVariant ? selectedVariant.price.toFixed(2) : "0.00"}
          </p>
          <div className="flex items-center mb-4 text-yellow-500 space-x-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={
                  i < Math.round(rating)
                    ? "text-[#0821D2]"
                    : "text-gray-300"
                }
              >
                <i className="fa-solid fa-star"></i>
              </span>
            ))}
            <span className="text-black pt-sans-regular ml-2">
              ({rating} stars)
            </span>
          </div>
          <p className="text-base text-black pt-sans-regular mb-6">
            {description}
          </p>

          {/* Tags Section */}
          {tags && tags.length > 0 && (
            <div className="tags mb-4">
              <h3 className="text-lg font-semibold">Tags:</h3>
              <ul className="flex space-x-2">
                {tags.map(tag => (
                  <li key={tag._id} className="bg-gray-200 px-2 py-1 rounded">
                    {tag.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Packaging Selection */}
          <div className="mb-6">
            <label className="block pt-sans-bold text-black mb-2">
              Packaging
            </label>
            <div className="relative">
              <button
                type="button"
                className="w-full bg-white border border-black text-black pt-sans-regular py-3 px-4 pr-8 leading-tight text-left"
                onClick={() => setIsPackagingOpen(!isPackagingOpen)}
              >
                {selectedPackaging}
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <i className={`fa-solid fa-chevron-${isPackagingOpen ? "up" : "down"}`}></i>
                </span>
              </button>
              {isPackagingOpen && (
                <div className="absolute z-10 w-full bg-white shadow-lg rounded-b border border-t-0 border-black">
                  {["Bottle", "Box", "Canister"].map((option) => (
                    <div
                      key={option}
                      className="pt-sans-regular cursor-pointer p-3 hover:bg-gray-100 text-left"
                      onClick={() => handlePackagingChange(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Variant and Quantity Selection */}
          <div className="flex justify-between items-center mb-12 mt-12">
            {/* Variant Selection */}
            <div>
              <label className="block pt-sans-bold text-black mb-2">
                Variant
              </label>
              <div className="flex gap-2">
                {variants.map((variant) => (
                  <button
                    key={variant._id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`py-2 px-8 border ${
                      selectedVariant && selectedVariant._id === variant._id
                        ? "bg-gradient-to-r from-[#A467F7] to-[#4C03CB] text-white pt-sans-bold"
                        : "border-black text-black pt-sans-regular"
                    }`}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div>
              <label className="block pt-sans-bold text-black mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={decrementQuantity}
                  className="px-4 py-2 border border-purple-500 text-purple-500"
                  aria-label="Decrease Quantity"
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
                <span className="quantico-bold-italic px-8 py-2 border border-purple-500 text-center">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="px-4 py-2 border border-purple-500 text-purple-500"
                  aria-label="Increase Quantity"
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              className="uppercase w-full quantico-bold-italic text-xl bg-gradient-to-r from-black to-[#0821D2] text-white py-3 px-8 font-bold focus:outline-none hover:shadow-lg transition duration-300 ease-in-out"
            >
              Add to Cart
            </button>
          </div>
          <p className="text-sm text-center mt-2 pt-sans-regular">
            Free shipping over $50
          </p>

          {/* Accordion Sections */}
          <div className="mt-8">
            {["Details", "Shipping", "Returns"].map((section, index) => (
              <div key={index} className="mb-4 border-t border-black">
                <div
                  className="flex justify-between items-center cursor-pointer py-4"
                  onClick={() => toggleAccordion(section)}
                >
                  <h3 className="text-lg font-semibold pt-sans-bold">
                    {section}
                  </h3>
                  <span>
                    {accordionOpen === section ? (
                      <i className="fa-solid fa-chevron-up"></i>
                    ) : (
                      <i className="fa-solid fa-chevron-down"></i>
                    )}
                  </span>
                </div>
                {accordionOpen === section && (
                  <p className="text-base pb-4 pt-sans-regular">
                    {accordion[section.toLowerCase()]} {/* Assuming accordion has details, shipping, returns */}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

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

export default ProductData;
