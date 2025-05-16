import React from 'react';
import { Helmet } from 'react-helmet';

const RefundCancellationPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Refund & Cancellation Policy | 10X Energy Drink</title>
        <meta name="description" content="Learn about our refund and cancellation policies for 10X energy drinks. Information on returns, exchanges, and order cancellations." />
        <meta name="keywords" content="10X refund policy, cancellation policy, return policy, energy drink returns, order cancellation" />
      </Helmet>
      {/* FAQ-Hero Section*/}
      <div className="py-36 px-20 w-full flex faq-hero">
        <div className="title-section w-1/2">
          <h1 className="text-white quantico-bold-italic text-7xl uppercase">Refund & <br></br>Cancellation</h1>
        </div>

        <div className="left-content w-1/2">
          <p className="text-white pt-sans-regular text-xl">Refund and cancellation policy for 10X products</p>
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
        <title>Refund & Cancellation Policy | 10X</title>
        <meta name="description" content="Refund and cancellation policy for 10X products and services" />
      </Helmet>
      
      
      
      <div className="prose prose-lg max-w-none pt-sans-regular">
        
        <h2 className="text-2xl quantico-bold-italic mt-8 mb-4 uppercase">Refund Policy & Cancellation Policy</h2>
        
        <ul className="list-disc pl-6 mb-6 pt-sans-regular">
          <li className="mb-3 pt-sans-regular">
            If the Customer leaves the 10X before they complete their service period, there shall be no entitlement to a refund of paid service fees.
          </li>
          <li className="mb-3 pt-sans-regular">
            Refunds, if applicable, at the discretion of the Management, will only be made to the debit/credit card used for the original transaction. For the avoidance of doubt nothing in this Policy shall require the 10X to refund the Fees (or part thereof) unless such Fees (or part thereof) have previously been paid.
          </li>
        </ul>
      </div>
      </div>
    </>
  );
};

export default RefundCancellationPolicy;
