import React from "react";
import { Helmet } from "react-helmet";
import HeroSection from "../components/HeroSection";
import AvailableAt from "../components/AvailableAt";
import Carousel from "../components/Carousel";
import Benefits10X from "../components/Benefits10X";
import TakeCharge from "../components/TakeCharge";
import About10x from "../components/About10x";
import DiscoverCollection from "../components/DiscoverCollection";
import BlogCard from "../components/BlogCard";
import FollowUs from "../components/FollowUs";
import Testimonials from "../components/Testimonials";
import Chatbot from "../components/ChatBot";
import MobileHero from "../components/MobileHero";
import BenefitMobile from "../components/BenefitMobile";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>10X Energy Drink | Premium Energy Drink for Maximum Performance</title>
        <meta name="description" content="10X Energy Drink provides maximum performance and focus with premium ingredients. Boost your energy and productivity with our specially formulated drinks." />
        <meta name="keywords" content="energy drink, 10X, premium energy, performance, focus, productivity" />
      </Helmet>
      <Chatbot/>
      <HeroSection />
      <MobileHero/>
      <AvailableAt />
      <Benefits10X />
      <TakeCharge />
      <BenefitMobile />
      <Carousel />
      <About10x />
      <Testimonials />
      <DiscoverCollection />
      <BlogCard />
      <FollowUs />
    </div>
  );
};

export default Home;
