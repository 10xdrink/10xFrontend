import React from 'react'
import BluePlainBackground from '../assets/Blue Plain Background.png'
import DiscoverColl from '../assets/DiscoverColl.png'

const DiscoverCollection = () => {
  return (
    <div>
          <div>
      <div className="main-div flex w-full">
        <div
          className="left-column w-1/2 pt-28 pl-20 pr-20 pb-28 flex flex-col justify-center"
          style={{
            backgroundImage: `url(${BluePlainBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* <hr className="horizontal-carousel-hr border-0 bg-white my-2 w-full" /> */}
          <h1 className="text-8xl font-bold  uppercase tracking-wider text-white quantico-bold-italic">
          Discover Our <br/>Collection of <br/>Products
          </h1>
          {/* <hr className="horizontal-carousel-hr border-0 bg-white my-2 w-full" /> */}
          <p className="text-xl pt-sans-regular text-white mt-10">
          Experience the 10X difference with our expansive range. 
          </p>

          <div className="button-divs mt-12">
            <button className="pt-4 pb-4 pl-8 text-xl pr-8 bg-transparent quantico-bold-italic border border-white text-white font-bold rounded-sm focus:outline-none  hover:shadow-lg shadow-[0px_2px_8px_rgba(255,255,255,0.8)] transition-shadow duration-300 ease-in-out">
              SHOP NOW
            </button>

            <button className="uppercase pt-4 pb-4 pl-8 text-xl pr-8 bg-transparent quantico-bold-italic bordder-0 text-white font-bold rounded-sm focus:outline-none  ">
              see all <i class="ml-2 fa-solid fa-angle-right"></i>
            </button>
          </div>
        </div>

        <div className="right-column w-1/2">
          <img className="w-full" src={DiscoverColl} alt="" srcset="" />
          {/* <img className="-mt-56 -ml-36" src={About10XBottom} alt="" /> */}
        </div>
      </div>
    </div>
    </div>
  )
}

export default DiscoverCollection
