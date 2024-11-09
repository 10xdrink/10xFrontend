import React from "react";
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
