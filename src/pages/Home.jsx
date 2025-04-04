import React from "react";
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
