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
      name: "Emily Johnson",
      position: "Marketing Manager, TechSolutions Inc.",
      companyLogo: RelumeLogo, // Use a relevant company logo here
      testimonial:
        "Relume has transformed our digital presence. Their team's expertise in web design and user experience has significantly increased our online engagement and lead generation.",
      img: avatar, // Use the testimonial person's image here
    },
    {
      id: 2,
      name: "Michael Smith",
      position: "CEO, InnovateX",
      companyLogo: WebflowLogo,
      testimonial:
        "Working with Relume was a game-changer for InnovateX. Their strategic approach and attention to detail ensured that our new website not only looks great but also performs exceptionally well.",
      img: avatar,
    },
    {
      id: 3,
      name: "Sophia Martinez",
      position: "Product Designer, CreativeHub",
      companyLogo: RelumeLogo,
      testimonial:
        "The design team at Relume truly understands the needs of modern businesses. They delivered a sleek, user-friendly interface that has received fantastic feedback from our clients.",
      img: avatar,
    },
    {
      id: 4,
      name: "James Lee",
      position: "Head of Development, NextGen Apps",
      companyLogo: RelumeLogo,
      testimonial:
        "Relume's expertise in responsive design and performance optimization has greatly improved our application's usability across all devices. Their support has been invaluable.",
      img: avatar,
    },
    {
      id: 5,
      name: "Olivia Brown",
      position: "Founder, GreenEarth Initiatives",
      companyLogo: WebflowLogo,
      testimonial:
        "As a non-profit, we needed a website that could effectively communicate our mission and engage donors. Relume delivered a beautiful and functional site that exceeded our expectations.",
      img: avatar,
    },
    {
      id: 6,
      name: "Daniel Wilson",
      position: "Operations Manager, UrbanFit Gym",
      companyLogo: RelumeLogo,
      testimonial:
        "Relume revamped our online booking system, making it more intuitive for our members. The project was completed on time and within budget, and the results speak for themselves.",
      img: avatar,
    },
  ];

  // State to manage the number of testimonials per group based on screen size
  const [groupSize, setGroupSize] = useState(3);

  // Function to determine group size based on window width
  const determineGroupSize = () => {
    const width = window.innerWidth;
    if (width < 640) return 1; // Mobile
    if (width >= 640 && width < 1024) return 2; // Tablet
    return 3; // Desktop
  };

  // Update group size on initial render and window resize
  useEffect(() => {
    const updateGroupSize = () => {
      setGroupSize(determineGroupSize());
    };

    updateGroupSize(); // Set initial group size

    window.addEventListener("resize", updateGroupSize);
    return () => window.removeEventListener("resize", updateGroupSize);
  }, []);

  // Function to group testimonials based on current group size
  const groupTestimonials = (items, groupSize) => {
    const groups = [];
    for (let i = 0; i < items.length; i += groupSize) {
      groups.push(items.slice(i, i + groupSize));
    }
    return groups;
  };

  const groupedTestimonials = groupTestimonials(testimonials, groupSize);

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
      const newIndex = Math.round(
        carouselRef.current.scrollLeft / containerWidth
      );
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
    <div className="w-full mx-auto px-4 py-8 bg-[#EEEEEE] sm:px-6 md:px-12 lg:px-20 lg:py-16">
      {/* Top Content */}
      <div className="top-content flex flex-col sm:flex-row px-4 sm:px-20 sm:py-12">
        <div className="left-content sm:w-2/3">
          <hr className="horizontal-carousel-hr border-0 bg-black my-2 w-11/12" />
          <h1 className="text-6xl sm:text-6xl lg:text-[85px] font-bold uppercase tracking-wider text-black quantico-bold-italic">
            Happy Customers
          </h1>
          <hr className="horizontal-carousel-hr border-0 my-2 bg-black w-11/12" />
        </div>

        <div className="left-content mt-4 sm:mt-0 sm:w-1/3 flex pr-0 sm:pr-12  items-start mb-4">
          <p className="text-[18px] sm:text-lg pt-sans-regular">
            Hear what our satisfied <br className="hidden sm:block" /> customers
            have to say
          </p>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative px-4 sm:px-6 md:px-12 lg:px-12">
        {/* Testimonials Carousel */}
        <div
          ref={carouselRef}
          className="flex overflow-x-scroll scroll-smooth snap-x snap-mandatory scrollbar-hide"
          style={{ scrollBehavior: "smooth" }}
        >
          {groupedTestimonials.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="flex-shrink-0 w-full flex justify-center space-x-4 sm:space-x-6 lg:space-x-8 snap-start"
            >
              {group.map((testimonial) => (
                <div
                  key={testimonial.id}
                  style={{
                    backgroundImage: `url(${TestimonialBG})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="w-full sm:w-1/2 lg:w-1/3 bg-white px-4 sm:px-8 py-8 sm:py-20 shadow-lg "
                >
                  <p className="text-base sm:text-xl mb-4">
                    "{testimonial.testimonial}"
                  </p>
                  <div className="flex items-center mt-4">
                    <img
                      src={testimonial.img}
                      alt={testimonial.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 mr-3 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-sm sm:text-lg">
                        {testimonial.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {testimonial.position}
                      </p>
                    </div>
                    <img
                      src={testimonial.companyLogo}
                      alt="Company Logo"
                      className="ml-auto h-6 sm:h-10 object-contain"
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
                className={`cursor-pointer w-2 h-2 sm:w-4 sm:h-4 rounded-full ${
                  index === currentIndex ? "bg-purple-600" : "bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex space-x-2 sm:space-x-4">
            <button
              onClick={prevSlide}
              className="bg-transparent py-2 sm:py-2 px-4 sm:px-4 border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition duration-300 "
            >
              <i className="fa-solid fa-arrow-left text-sm sm:text-base"></i>
            </button>
            <button
              onClick={nextSlide}
              className="bg-transparent py-2 sm:py-2 px-4 sm:px-4 border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition duration-300 "
            >
              <i className="fa-solid fa-arrow-right text-sm sm:text-base"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
