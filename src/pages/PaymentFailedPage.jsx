import React, { useEffect, useState } from "react";
import AvailableAtBG from "../assets/AvailableAtBG.png";
import About10XBottom from "../assets/About10X-Bottom.png";
import BluePlainBackground from "../assets/Blue Plain Background.png";
import About10XTop from "../assets/About10X-Top.png";
import About10XIcon1 from "../assets/About10XIcon1.png";
import About10XIcon2 from "../assets/About10XIcon2.png";
import { Link, useSearchParams } from "react-router-dom";

const PaymentFailedPage = () => {
  const [searchParams] = useSearchParams();
  const [transactionDetails, setTransactionDetails] = useState({
    orderId: null,
    message: null
  });

  useEffect(() => {
    const orderId = searchParams.get('orderId');
    const message = searchParams.get('message');
    
    setTransactionDetails({
      orderId: orderId || null,
      message: message || 'Your payment could not be processed. Please try again or choose a different payment method.'
    });
  }, [searchParams]);

  return (
    <div>
      {/* 
        ---------------------------------------------------
        DESKTOP VERSION (Visible on PC and Laptop, Hidden on Mobile)
        ---------------------------------------------------
      */}
      <div className="hidden md:block">
        {/* First Section */}
        <div
          className="w-full bg-cover bg-center p-28 flex flex-col "
          style={{
            backgroundImage: `url(${AvailableAtBG})`,
          }}
        >
          <h1 className="text-9xl quantico-bold-italic">Payment Failed</h1>
          <p className="text-xl text-black pt-sans-regular mt-4 ">
            {transactionDetails.message}
          </p>
          {transactionDetails.orderId && (
            <p className="text-base text-gray-700 pt-sans-regular mt-2">
              Order ID: <span className="font-semibold">{transactionDetails.orderId}</span>
            </p>
          )}
          {/* Bottom Buttons */}
          <div className="flex space-x-4  mt-8">
            <Link to={"/checkout"}>
              <button className="uppercase quantico-bold-italic text-xl bg-gradient-to-r from-black to-[#0821D2] text-white py-3 px-8 font-bold focus:outline-none hover:shadow-lg transition duration-300 ease-in-out">
                Try Again
              </button>
            </Link>
            <div className="learn-more">
              <Link to={"/products"}>
                <button
                  className="shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-[#0821D2] quantico-bold-italic text-xl uppercase px-6 py-3"
                  type="button"
                >
                  Shop More
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Second Section */}
        <div className="main-div flex w-full">
          <div
            className="left-column w-1/2 pt-28 pl-20 pr-20 pb-28 flex flex-col justify-center"
            style={{
              backgroundImage: `url(${BluePlainBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h1 className="text-5xl font-bold uppercase tracking-wider text-white quantico-bold-italic">
              Experience the <br />
              Incredible Benefits <br />
              of 10X Products Today
            </h1>
            <p className="text-xl pt-sans-regular text-white mt-10">
              Our carefully crafted formulas combine ancient Ayurvedic herbs and
              modern neuroscience to deliver unparalleled benefits for your body
              and mind.
            </p>

            <div className="icon-divs flex mt-12 text-white gap-4">
              <div className="left">
                <img className="w-1/3" src={About10XIcon2} alt="Enhanced Energy" />
                <h3 className="nimbusL-bol text-2xl uppercase">
                  Enhanced Energy
                </h3>
                <p className="mt-4 pt-sans-regular text-base">
                  Feel a surge of energy that lasts throughout the day, keeping
                  you focused and productive.
                </p>
              </div>
              <div className="right">
                <img className="w-1/3" src={About10XIcon1} alt="Optimal Performance" />
                <h3 className="nimbusL-bol text-2xl uppercase">
                  Optimal Performance
                </h3>
                <p className="mt-4 pt-sans-regular text-base">
                  Unlock your full potential and perform at your best in every
                  aspect of life.
                </p>
              </div>
            </div>
            <div className="button-divs mt-12">
              <Link to={"/products"}>
                <button className="pt-4 pb-4 pl-8 text-xl pr-8 bg-transparent quantico-bold-italic border border-white text-white font-bold rounded-sm focus:outline-none hover:shadow-lg shadow-[0px_2px_8px_rgba(255,255,255,0.8)] transition-shadow duration-300 ease-in-out">
                  SHOP NOW
                </button>
              </Link>
              <Link to={"/products"}>
                <button className="uppercase ml-4 pt-4 pb-4 pl-8 text-xl pr-8 bg-transparent quantico-bold-italic border-0 text-white font-bold rounded-sm focus:outline-none">
                  See All <i className="ml-4 fa-solid fa-angle-right"></i>
                </button>
              </Link>
            </div>
          </div>

          <div className="right-column w-1/2">
            <img className="w-full h-auto" src={About10XTop} alt="About10XTop" />
            <img className="-mt-48 -ml-36" src={About10XBottom} alt="About10XBottom" />
          </div>
        </div>
      </div>

      {/* 
        ---------------------------------------------------
        MOBILE VERSION (Visible on Mobile, Hidden on PC and Laptop)
        ---------------------------------------------------
      */}
      <div className="block md:hidden">
        {/* First Section - Mobile */}
        <div
          className="w-full bg-cover bg-center py-12 px-6 flex flex-col "
          style={{
            backgroundImage: `url(${AvailableAtBG})`,
          }}
        >
          <h1 className="text-8xl quantico-bold-italic ">Payment <br/>Failed</h1>
          <p className="text-xl text-black pt-sans-regular mt-4 ">
            {transactionDetails.message}
          </p>
          {transactionDetails.orderId && (
            <p className="text-base text-gray-700 pt-sans-regular mt-2">
              Order ID: <span className="font-semibold">{transactionDetails.orderId}</span>
            </p>
          )}
          {/* Bottom Buttons */}
          <div className="flex    mt-6">
            <Link to={"/checkout"}>
              <button className="uppercase quantico-bold-italic text-lg bg-gradient-to-r from-black to-[#0821D2] text-white py-[13px] px-4 font-bold focus:outline-none hover:shadow-lg transition duration-300 ease-in-out">
                Try Again
              </button>
            </Link>
            <div className="learn-more">
              <Link to={"/products"}>
                <button
                  className="ml-5 shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-[#0821D2] quantico-bold-italic text-lg uppercase px-6 py-3"
                  type="button"
                >
                  Shop More
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Second Section - Experience the Incredible Benefits (Exact Match) */}
        <div className="w-full">
          <div
            className="pt-16 pb-16 px-4 flex flex-col justify-center"
            style={{
              backgroundImage: `url(${BluePlainBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h1 className="text-3xl font-bold uppercase tracking-wider text-white quantico-bold-italic ">
              Experience the Incredible Benefits of 10X Products Today
            </h1>
            <p className="text-base pt-sans-regular text-white mt-4 ">
              Our carefully crafted formulas combine ancient Ayurvedic herbs and
              modern neuroscience to deliver unparalleled benefits for your body
              and mind.
            </p>

            <div className="icon-divs flex flex-col mt-6 text-white gap-4">
              <div className="flex items-center">
                <img className="w-16" src={About10XIcon2} alt="Enhanced Energy" />
                <div className="ml-4">
                  <h3 className="nimbusL-bol text-lg uppercase">
                    Enhanced Energy
                  </h3>
                  <p className="mt-2 pt-sans-regular text-sm">
                    Feel a surge of energy that lasts throughout the day, keeping
                    you focused and productive.
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-4">
                <img className="w-16" src={About10XIcon1} alt="Optimal Performance" />
                <div className="ml-4">
                  <h3 className="nimbusL-bol text-lg uppercase">
                    Optimal Performance
                  </h3>
                  <p className="mt-2 pt-sans-regular text-sm">
                    Unlock your full potential and perform at your best in every
                    aspect of life.
                  </p>
                </div>
              </div>
            </div>
            <div className="button-divs mt-10 flex  ">
              <Link to={"/products"}>
                <button className="pt-3 pb-3 px-6 bg-transparent quantico-bold-italic border border-white text-white font-bold rounded-sm focus:outline-none hover:shadow-lg shadow-[0px_2px_8px_rgba(255,255,255,0.8)] transition-shadow duration-300 ease-in-out">
                  SHOP NOW
                </button>
              </Link>
              <Link to={"/products"}>
                <button className="uppercase ml-4 pt-3 pb-3 px-6 bg-transparent quantico-bold-italic border-0 text-white font-bold rounded-sm focus:outline-none">
                  See All <i className="ml-4 fa-solid fa-angle-right"></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
