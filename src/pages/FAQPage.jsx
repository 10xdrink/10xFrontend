import React from "react";
import FAQs from "../components/FAQs";


const FAQPage = () => {
  return (
    <div>
      {/* FAQ-Hero  Section*/}
      <div className="py-36 px-20 w-full flex faq-hero">
        <div className="title-section w-1/2">
          <h1 className="text-white quantico-bold-italic text-9xl">FAQS</h1>
        </div>

        <div className="left-content w-1/2">
          <p className="text-white pt-sans-regular text-xl">Got questions? We’ll gladly answer them for you.</p>
          <div className="buttons flex gap-8 mt-8">
            <div className="learn-more bg-white">
            <button className="quantico-bold-italic text-xl" type="button">LEARN MORE</button>
            </div>
            <div className="contact-us">
            <button className="text-xl pr-8 bg-transparent quantico-bold-italic border border-white text-white font-bold rounded-sm focus:outline-none  hover:shadow-lg shadow-[0px_2px_8px_rgba(255,255,255,0.8)] transition-shadow duration-300 ease-in-out" type="button">CONTACT US</button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ-Section */}
      <FAQs/>
    </div>
  );
};

export default FAQPage;
