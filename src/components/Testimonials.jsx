import React, { useRef, useState, useEffect } from "react";
import RelumeLogo from "../assets/RelumeLogo.png"; // Placeholder for Relume logo
import WebflowLogo from "../assets/WebflowLogo.png"; // Placeholder for Webflow logo
import BluePlainBackground from "../assets/Blue Plain Background.png";
import TestimonialBG from "../assets/TestimonialBG.png";
import avatar from "../assets/avatar.png";


const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Name Surname",
      position: "Position, Company name",
      companyLogo: RelumeLogo, // Use a relevant company logo here
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      img: avatar, // Use the testimonial person's image here
    },
    {
      id: 2,
      name: "Name Surname",
      position: "Position, Company name",
      companyLogo: RelumeLogo,
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      img: avatar,
    },
    {
      id: 3,
      name: "Name Surname",
      position: "Position, Company name",
      companyLogo: RelumeLogo,
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      img: avatar,
    },
    {
      id: 4,
      name: "Name Surname",
      position: "Position, Company name",
      companyLogo: RelumeLogo,
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      img: avatar,
    },
    {
      id: 5,
      name: "Name Surname",
      position: "Position, Company name",
      companyLogo: WebflowLogo,
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      img: avatar,
    },
    {
      id: 6,
      name: "Name Surname",
      position: "Position, Company name",
      companyLogo: RelumeLogo,
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      img: avatar,
    },
  ];

  // Group testimonials into chunks of 3
  const groupTestimonials = (items, groupSize) => {
    const groups = [];
    for (let i = 0; i < items.length; i += groupSize) {
      groups.push(items.slice(i, i + groupSize));
    }
    return groups;
  };

  const groupedTestimonials = groupTestimonials(testimonials, 3);

  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalGroups = groupedTestimonials.length;

  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: containerWidth * index,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % totalGroups;
    scrollToIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + totalGroups) % totalGroups;
    scrollToIndex(newIndex);
  };

  // Update currentIndex on scroll
  const handleScroll = () => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const newIndex = Math.round(carouselRef.current.scrollLeft / containerWidth);
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", handleScroll);
      return () => {
        carousel.removeEventListener("scroll", handleScroll);
      };
    }
  }, [currentIndex]);

  return (
    <div className="w-full mx-auto px-20 py-16 bg-[#EEEEEE]">
      {/* Top Content */}
      <div className="top-content flex px-20 py-12">
        <div className="left-content w-2/3">
          <hr className="horizontal-carousel-hr border-0 bg-black my-2 w-11/12" />
          <h1 className="text-8xl font-bold uppercase tracking-wider text-black quantico-bold-italic">
            Happy Customers
          </h1>
          <hr className="horizontal-carousel-hr border-0 my-2 bg-black w-11/12" />
        </div>

        <div className="right-content w-1/3 flex pr-12 justify-end items-start">
          <p className="text-lg pt-sans-regular">
            Hear what our satisfied <br /> customers have to say
          </p>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative px-12">
        {/* Testimonials Carousel */}
        <div
          ref={carouselRef}
          className="flex overflow-x-scroll scroll-smooth snap-x snap-mandatory scrollbar-hide"
          style={{ scrollBehavior: "smooth" }}
        >
          {groupedTestimonials.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="flex-shrink-0 w-full flex justify-center space-x-6 snap-start"
            >
              {group.map((testimonial) => (
                <div
                style={{
                    backgroundImage: `url(${TestimonialBG})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center", // Replace with your actual image URL
                  }}
                  key={testimonial.id}
                  className="w-1/3 bg-white px-8 py-20 shadow-lg "
                >
                  <p className="text-xl mb-4">"{testimonial.testimonial}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.img}
                      alt={testimonial.name}
                      className="w-16 h-16 mr-4"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-sm">{testimonial.position}</p>
                    </div>
                    <img
                      src={testimonial.companyLogo}
                      alt="Company Logo"
                      className="ml-auto h-10"
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Navigation Dots and Arrows */}
        <div className="flex justify-between items-center p-4">
          {/* Dots */}
          <div className="flex space-x-2">
            {groupedTestimonials.map((_, index) => (
              <span
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`cursor-pointer w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-purple-600" : "bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex space-x-4">
            <button
              onClick={prevSlide}
              className="bg-transparent py-2 px-4 border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition duration-300"
            >
              <i class="fa-solid fa-arrow-left"></i>
            </button>
            <button
              onClick={nextSlide}
              className="bg-transparent py-2 px-4 border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition duration-300"
            >
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
