import React from "react";
import EffectiveProduct from "../assets/EffectiveProduct.png";
import mango from "../assets/mango.png";

const Effective = () => {
  return (
    <div>
      <div
        className="main-div bg-cover bg-center py-20 px-20 flex"
        style={{
          backgroundImage: `url(${EffectiveProduct})`, // Replace with your actual image URL
        }}
      >
        <div className="left-col w-1/2">
          <img className="w-[70%] shuttle-light" src={mango} alt="Mango Bottle" />
        </div>

        <div className="right-col w-1/2">
          <div className="top">
            <h1 className="text-5xl quantico-bold-italic mt-10 uppercase">
              100% safe. <br />
              100% effective
            </h1>
            <p className="pt-sans-regular text-base mt-4 ">
              10X boosts your day without the jitters or crash, promoting a flow
              state <br /> that provides a sense of mental freshness and alertness,
              helping you start <br /> your day on the right foot.
            </p>
            <div className="learn-more">
              <button
                className="quantico-bold-italic text-xl -ml-6 uppercase"
                type="button"
              >
                see the whole collection{" "}
                <i className="ml-2 fa-solid fa-angle-right"></i>
              </button>
            </div>
          </div>

          <div className="bottom">
            <h1 className="text-5xl quantico-bold-italic mt-10 uppercase">
              Delivery within 1 <br />
              hour of purchase!
            </h1>
            <p className="pt-sans-regular text-base mt-4 ">
              When you purchase any product from us, we guarantee that you’ll
              receive <br /> your order within 60 minutes of purchasing! Simply fill
              in your details at <br /> checkout and get ready to boost your day.
            </p>
            <div className="learn-more">
              <button
                className="quantico-bold-italic text-xl -ml-6 uppercase"
                type="button"
              >
                shipping info <i className="ml-2 fa-solid fa-angle-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Effective;
