import React from "react";
import EnlargedX from "../assets/EnlargedX.png";
import ProductList from '../components/ProductList';
import FollowUs from "../components/FollowUs";
import Testimoals from "../components/Testimonials";
import DiscoverCollection from "../components/DiscoverCollection";

const ProductListingPage = () => {
  return (
    <div>
      <div className="main-div bg-gradient-to-r from-[#A467F7] to-[#4C03CB] flex">
        <div className="left-col px-20 py-28 w-1/2">
          <h1 className="text-9xl quantico-bold-italic text-white">
            OUR RANGE
          </h1>
          <p className="text-white pt-sans-regular text-xl">
            Experience the power of 10X with our unique collection.
          </p>
        </div>
        <div className="right-col w-1/2 h-[400px] overflow-hidden flex items-center justify-center">
          <img
            className="w-[360px] object-cover transition-transform duration-[2000ms] ease-in-out transform hover:-translate-y-96"
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
