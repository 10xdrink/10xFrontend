import React from "react";
import RelumeLogo from "../assets/RelumeLogo.png"; // Placeholder for Relume logo
import WebflowLogo from "../assets/WebflowLogo.png"; // Placeholder for Webflow logo
import AvailableAtBG from "../assets/AvailableAtBG.png";

const AvailableAt = () => {
  return (
    <div
      className="logo-marquee-section py-16 md:py-24 bg-gray-100"
      style={{
        backgroundImage: `url(${AvailableAtBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-4xl md:text-6xl text-black font-bold text-center mb-8 quantico-bold-italic">
        AVAILABLE AT
      </h2>
      <div className="marquee overflow-hidden">
        <div className="marquee-inner flex animate-marquee">
          {/* Repeating logos */}
          <img
            src={RelumeLogo}
            alt="Relume"
            className="logo mx-4 md:mx-8 h-12 md:h-16"
          />
          <img
            src={WebflowLogo}
            alt="Webflow"
            className="logo mx-4 md:mx-8 h-12 md:h-16"
          />
          <img
            src={RelumeLogo}
            alt="Relume"
            className="logo mx-4 md:mx-8 h-12 md:h-16"
          />
          <img
            src={WebflowLogo}
            alt="Webflow"
            className="logo mx-4 md:mx-8 h-12 md:h-16"
          />
          <img
            src={RelumeLogo}
            alt="Relume"
            className="logo mx-4 md:mx-8 h-12 md:h-16"
          />
          <img
            src={WebflowLogo}
            alt="Webflow"
            className="logo mx-4 md:mx-8 h-12 md:h-16"
          />
          {/* Repeat logos to fill marquee */}
          <img
            src={RelumeLogo}
            alt="Relume"
            className="logo mx-4 md:mx-8 h-12 md:h-16"
          />
          <img
            src={WebflowLogo}
            alt="Webflow"
            className="logo mx-4 md:mx-8 h-12 md:h-16"
          />
        </div>
      </div>
    </div>
  );
};

export default AvailableAt;
