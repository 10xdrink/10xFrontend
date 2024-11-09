import React from "react";
import RelumeLogo from "../assets/RelumeLogo.png"; // Placeholder for Relume logo
import WebflowLogo from "../assets/WebflowLogo.png"; // Placeholder for Webflow logo
import AvailableAtBG from "../assets/AvailableAtBG.png";


const AvailableAt = () => {
  return (
    <div className="logo-marquee-section py-24 bg-gray-100"
    style={{
        backgroundImage: `url(${AvailableAtBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <h2 className="text-6xl text-black font-bold text-center mb-8 quantico-bold-italic">AVAILABLE AT</h2>
      <div className="marquee">
        <div className="marquee-inner">
          {/* Repeating logos */}
          <img src={RelumeLogo} alt="Relume" className="logo" />
          <img src={WebflowLogo} alt="Webflow" className="logo" />
          <img src={RelumeLogo} alt="Relume" className="logo" />
          <img src={WebflowLogo} alt="Webflow" className="logo" />
          <img src={RelumeLogo} alt="Relume" className="logo" />
          <img src={WebflowLogo} alt="Webflow" className="logo" />
          {/* Repeat logos to fill marquee */}
          <img src={RelumeLogo} alt="Relume" className="logo" />
          <img src={WebflowLogo} alt="Webflow" className="logo" />
        </div>
      </div>
    </div>
  );
};

export default AvailableAt;
