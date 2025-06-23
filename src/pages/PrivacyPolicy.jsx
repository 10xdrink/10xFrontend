import React from 'react';
import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | 10X Energy Drink</title>
        <meta name="description" content="Read our privacy policy to understand how we collect, use, and protect your personal information when you interact with 10X energy drink products and services." />
        <meta name="keywords" content="10X privacy policy, data protection, privacy terms, personal information, cookie policy" />
      </Helmet>
      {/* FAQ-Hero Section*/}
      <div className="py-36 px-20 w-full flex faq-hero">
        <div className="title-section w-1/2">
          <h1 className="text-white quantico-bold-italic text-7xl uppercase">Privacy <br></br>Policy</h1>
        </div>

        <div className="left-content w-1/2">
          <p className="text-white pt-sans-regular text-xl">Privacy policy for 10X products and services</p>
          <div className="buttons flex gap-8 mt-8">
            <div className="learn-more bg-white">
              <button className="quantico-bold-italic text-xl uppercase" type="button">Continue</button>
            </div>
            <div className="contact-us">
              <button className="text-xl pr-8 bg-transparent quantico-bold-italic border border-white text-white font-bold rounded-sm focus:outline-none hover:shadow-lg shadow-[0px_2px_8px_rgba(255,255,255,0.8)] transition-shadow duration-300 ease-in-out uppercase" type="button">Back</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Helmet>
        <title>Privacy Policy | 10X</title>
        <meta name="description" content="Privacy policy for 10X website and services" />
      </Helmet>
      
      
      
      <div className="prose prose-lg max-w-none pt-sans-regular">
        
        <h2 className="text-2xl quantico-bold-italic mt-8 mb-4 uppercase">Privacy Policy</h2>
        <p className="mb-4 pt-sans-regular">
          This Privacy Policy applies to all of the products, services and websites offered by 10X. Sometimes, we may post product specific privacy notices or Help Centre materials to explain our products in more detail.
        </p>
        
        <p className="mb-4 pt-sans-regular">
          If you have any questions about this Privacy Policy, please feel free to contact us through our website or write to us at
        </p>
        
        <h2 className="text-2xl quantico-bold-italic mt-8 mb-4 uppercase">Information we collect and how we use it for our 10X</h2>
        
        <h2 className="text-2xl quantico-bold-italic mt-8 mb-4 uppercase">Changes to our Privacy Policy</h2>
        <p className="mb-4 pt-sans-regular">
          10X reserves the entire right to modify/amend/remove this privacy statement anytime and without any reason. Nothing contained herein creates or is intended to create a contract/agreement between 10X and any user visiting the 10X website or providing identifying information of any kind.
        </p>
        
        <h2 className="text-2xl quantico-bold-italic mt-8 mb-4 uppercase">DND Policy</h2>
        <p className="mb-4 pt-sans-regular">
          If you wish to stop any further sms/email alerts/contacts from our side, all you need to do is to send an email:-test@test.com with your mobile numbers and you will be excluded from the alerts list.
        </p>
        
        <h2 className="text-2xl quantico-bold-italic mt-8 mb-4 uppercase">Contact Details</h2>
        <p className="mb-4 pt-sans-regular">
          Email: <span className="font-bold">info@10xdrink.com</span>
        </p>
        <p className="mb-4 pt-sans-regular">
          Product & Pricing: <span className="font-bold roboto-regular">₹299</span>
        </p>
        


      </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
