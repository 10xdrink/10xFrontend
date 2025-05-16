import React from "react";
import { Helmet } from "react-helmet";
import BoostEnergy from "../components/BoostEnergy";
import Benefits10X from "../components/Benefits10X";
import Testimonials from "../components/Testimonials";
import Carousel from "../components/Carousel";
import FAQs from "../components/FAQs";
import Effective from "../components/Effective";
import ProductData from "../components/ProductData";

const ProductPage = () => {
  return (
    <div>
      <Helmet>
        <title>10X Energy Drink | Premium Performance Drink</title>
        <meta name="description" content="Discover the premium 10X energy drink designed to boost your performance and energy levels. Made with high-quality ingredients for maximum effectiveness." />
        <meta name="keywords" content="10X energy drink, premium energy drink, performance drink, energy booster, sports drink, workout supplement" />
      </Helmet>
      <ProductData/>
      <Effective/>
      <Benefits10X />
      <Testimonials />
      <BoostEnergy />
      <Carousel />
      <FAQs />
    </div>
  );
};

export default ProductPage;
