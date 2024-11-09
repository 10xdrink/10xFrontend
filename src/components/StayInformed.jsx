import React from "react";
import StayInformedImage from "../assets/StayInformed.png";

const StayInformed = () => {
  return (
    <div>
      <div className="main-div flex mt-24 bg-gradient-to-r from-[#FFFFFF] to-[#E6E6E6]">
        <div className="left w-1/2 flex justify-start items-center px-12">
          <div className="heading">
            <h1 className="text-7xl font-bold uppercase tracking-wider text-black quantico-bold-italic">
              Stay Informed <br />
              with Our <br />
              Newsletter
            </h1>

            <div className="description mt-4">
              <p className="text-xl pt-sans-regular mb-8">
                Subscribe to our newsletter for the latest blog posts and
                exclusive <br />
                content.
              </p>
            </div>

            <div className="input-box flex">
              <div className="input-email">
                <input
                  type="email"
                  name="email-address"
                  aria-label="Email address"
                  className="w-[359px] px-4 py-[10px] border-2 rounded-none outline-none pt-sans-regular border-black"
                  placeholder="Enter email address"
                />

                <button
                  className="uppercase ml-4 quantico-bold-italic text-xl bg-gradient-to-r from-black to-[#0821D2] text-white py-[10px] px-8 font-bold focus:outline-none hover:shadow-lg transition duration-300 ease-in-out"
                  aria-label="Join now"
                >
                  join now
                </button>
              </div>
            </div>
            <div className="paragraph">
              <p className="text-base pt-sans-regular mt-2">
                By joining, you agree to our{" "}
                <a href="#" className="text-blue-600 underline">
                  Terms and Conditions
                </a>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="right-div w-1/2">
          {StayInformedImage && (
            <img
              className="w-full"
              src={StayInformedImage}
              alt="Stay Informed"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StayInformed;
