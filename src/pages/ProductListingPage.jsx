import React from "react";
import { Helmet } from "react-helmet";
import EnlargedX from "../assets/EnlargedX.png";
import ProductList from '../components/ProductList';
import FollowUs from "../components/FollowUs";
import Testimoals from "../components/Testimonials";
import DiscoverCollection from "../components/DiscoverCollection";

const ProductListingPage = () => {
  return (
    <div>
      <Helmet>
        <title>Our Products | 10X Energy Drink Collection</title>
        <meta name="description" content="Explore our range of premium 10X energy drinks designed to boost your performance and focus. Find the perfect energy drink for your lifestyle." />
        <meta name="keywords" content="10X products, energy drinks, performance drinks, focus drinks, premium beverages" />
      </Helmet>
      <div className="main-div bg-gradient-to-r from-[#A467F7] to-[#4C03CB] flex flex-col md:flex-row items-center">
        <div className="left-col px-6 py-12 md:px-20 md:py-28 w-full md:w-1/2 flex flex-col items-center md:items-start">
          <h1 className="text-6xl md:text-8xl lg:text-[90px] quantico-bold-italic text-white text-center md:text-left">
          OUR RANGE
          </h1>
          <p className="text-white pt-sans-regular text-lg md:text-lg mt-4 text-center md:text-left">
          Experience the power of 10X with our unique collection.
          </p>
        </div>
        <div className="right-col hidden md:flex w-full md:w-1/2 h-48 md:h-[400px] overflow-hidden items-center justify-center mt-6 md:mt-0">
          <img
            className="w-44 md:w-[360px] object-cover transition-transform duration-[2000ms] ease-in-out transform hover:-translate-y-20 md:hover:-translate-y-96"
            src={EnlargedX}
            alt="Enlarged"
          />
        </div>
      </div>
      <ProductList />
      <Testimoals />
      <DiscoverCollection />
      <FollowUs />
    </div>
  );
};

export default ProductListingPage;
