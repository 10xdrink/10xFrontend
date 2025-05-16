// src/components/BlogCard.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // For navigation
import ChemicalReaction from "../assets/ChemicalReaction.png";
import BlogPlaceholder from "../assets/BlogPlaceholder.png";
import api from "../utils/api"; // Centralized API instance

const BlogCard = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For mobile "slider"
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch blog posts from the backend
  const fetchBlogPosts = async () => {
    try {
      const response = await api.get("/blogs", {
        params: { limit: 3, sort: "desc" },
      });
      setBlogPosts(response.data.data); // Adjust if your response structure differs
    } catch (err) {
      console.error("Error fetching blog posts:", err);
      setError("Failed to load blog posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  // Category gradient (used in desktop version below)
  const getCategoryGradient = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case "health":
        return "from-[#F2A93A] to-[#E38315]";
      case "technology":
        return "from-[#F2A93A] to-[#E38315]";
      case "science":
        return "from-[#F2A93A] to-[#E38315]";
      default:
        return "from-[#F2A93A] to-[#E38315]"; // Default gradient
    }
  };

  // Desktop: Render the three cards side by side
  const renderBlogCardsDesktop = () => {
    // Ensure there are exactly three blog posts (or placeholders)
    const posts = blogPosts.slice(0, 3);
    const columns = ["left-col", "center-col", "right-col"];

    return columns.map((colClass, index) => {
      const post = posts[index];

      if (!post) {
        // Placeholder if fewer than 3 posts
        return (
          <div key={index} className={`${colClass} w-1/3 blog-card-bg`}>
            <img
              className="w-full h-auto cursor-pointer"
              src={BlogPlaceholder}
              alt="Placeholder"
            />
            <div className="bottom-content p-12">
              <div className="blogMetaData">
                <div className="mete-data flex">
                  <button
                    className="bg-gradient-to-r from-[#CCCCCC] to-[#AAAAAA] px-8 py-2 pt-sans-regular"
                    type="button"
                    disabled
                  >
                    Uncategorized
                  </button>
                  <p className="px-4 py-2 pt-sans-regular">0 min read</p>
                </div>
                <h3 className="nimbusL-bol text-2xl mt-4 text-black uppercase">
                  No Title Available
                </h3>
                <p className="py-2 pt-sans-regular">No content available.</p>
                <div className="learn-more">
                  <button
                    className="quantico-bold-italic text-lg flex items-center text-blue-700 -ml-5"
                    type="button"
                    disabled
                  >
                    Read Now <i className="ml-2 fa-solid fa-angle-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }

      const categoryName =
        post.categories && post.categories.length > 0
          ? post.categories[0].name
          : "Uncategorized";
      const gradient = getCategoryGradient(categoryName);

      return (
        <div key={post._id} className={`${colClass} w-1/3 blog-card-bg`}>
          <Link to={`/blog/${post.slug}`}>
            <img
              className="w-full h-auto cursor-pointer"
              src={
                post.images && post.images.length > 0
                  ? post.images[0]
                  : BlogPlaceholder
              }
              alt={post.title}
            />
          </Link>
          <div className="bottom-content p-12">
            <div className="blogMetaData">
              <div className="mete-data flex">
                <button
                  className={`bg-gradient-to-r ${gradient} text-white px-8 py-2 pt-sans-regular`}
                  type="button"
                >
                  {categoryName}
                </button>
                <p className="px-4 py-2 pt-sans-regular">
                  {post.readTime ? `${post.readTime} min read` : "5 min read"}
                </p>
              </div>
              <h3 className="nimbusL-bol text-2xl mt-4 text-black uppercase">
                {post.title}
              </h3>
              <p className="py-2 pt-sans-regular">{post.excerpt}</p>
              <div className="learn-more">
                <button
                  to={`/blog/${post.slug}`}
                  className="quantico-bold-italic text-lg flex items-center text-blue-700 -ml-5"
                >
                  Read Now <i className="ml-2 fa-solid fa-angle-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  // Mobile: Return just 1 blog post at a time
  const renderSingleCardMobile = () => {
    // If still loading or error, handle it; otherwise show the single card:
    if (loading) {
      return (
        <div className="animate-pulse bg-gray-100 w-full p-6 text-center">
          Loading...
        </div>
      );
    }
    if (error) {
      return <div className="text-red-500 text-center w-full">{error}</div>;
    }
    if (!blogPosts || blogPosts.length === 0) {
      return <div className="text-center w-full">No blog posts found.</div>;
    }

    // Ensure currentIndex is within bounds
    const post = blogPosts[currentIndex] || null;
    if (!post) return null;

    const categoryName =
      post.categories && post.categories.length > 0
        ? post.categories[0].name
        : "Uncategorized";
    const readTime = post.readTime ? `${post.readTime} min read` : "5 min read";
    const postImage =
      post.images && post.images.length > 0 ? post.images[0] : BlogPlaceholder;

    return (
      <div className="w-full mx-auto">
        {/* Upper section: category + read time in one row (reaction icon removed) */}
        <div className="flex items-center justify-between mb-2">
          <button
            className="bg-gradient-to-r from-[#F4AE3F] to-[#E07A0C] text-white px-4 py-1 rounded text-sm"
            type="button"
          >
            {categoryName}
          </button>
          <p className="text-gray-600 text-sm">{readTime}</p>
        </div>

        {/* Image */}
        <img
          className="w-full h-auto rounded-md mb-4"
          src={postImage}
          alt={post.title}
        />

        {/* Title aligned left */}
        <h2 className="nimbusL-bol text-xl mt-4 text-black uppercase">
          {post.title}
        </h2>

        {/* Ensure excerpt is displayed properly (with fallback) */}
        <p className="py-2 pt-sans-regular">{post.excerpt || ""}</p>

        {/* Read More button */}
        <div className="learn-more mb-4">
          <button className="quantico-bold-italic text-lg flex items-center text-blue-700 -ml-5">
            <Link to={`/blog/${post.slug}`}>
              Read More <i className="ml-1 fa-solid fa-angle-right"></i>
            </Link>
          </button>
        </div>
      </div>
    );
  };

  // Handlers for the "slider" on mobile
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? blogPosts.length - 1 : prevIndex - 1
    );
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === blogPosts.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      {/* --------------------- DESKTOP VERSION (hidden on mobile) --------------------- */}
      <div className="hidden lg:block">
        <div className="main-div bg-gradient-to-r from-[#FFFFFF] to-[#E6E6E6] py-20">
          {/* Top Content */}
          <div className="top-content flex px-20 py-12">
            <div className="left-col w-1/2">
              <div className="txt-container w-1/2">
                <hr className="horizontal-carousel-hr border-0 bg-black w-64" />
                <h1 className="text-8xl font-bold uppercase tracking-wider text-black quantico-bold-italic">
                  Blog
                </h1>
                <hr className="horizontal-carousel-hr border-0 bg-black w-64 mb-8" />
                <p className="text-lg pt-sans-regular">
                  Stay informed with our latest blog posts.
                </p>
              </div>
            </div>
            <div className="right-col w-1/2 flex items-start justify-end">
              <img
                className="w-28"
                src={ChemicalReaction}
                alt="Chemical Reaction"
              />
            </div>
          </div>

          {/* Bottom Content (3 columns) */}
          <div className="bottom-content gap-8 flex px-20">
            {loading ? (
              // Loading State: Display three animated placeholders
              <>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className={
                      index === 0
                        ? "left-col w-1/3 blog-card-bg animate-pulse"
                        : index === 1
                        ? "center-col w-1/3 blog-card-bg animate-pulse"
                        : "right-col w-1/3 blog-card-bg animate-pulse"
                    }
                  >
                    <div className="w-full h-auto bg-gray-300 cursor-pointer"></div>
                    <div className="bottom-content p-12">
                      <div className="blogMetaData">
                        <div className="mete-data flex">
                          <div className="bg-gray-300 h-8 w-24 "></div>
                          <div className="bg-gray-300 h-6 w-16 ml-4 "></div>
                        </div>
                        <div className="bg-gray-300 h-6 w-3/4 mt-4"></div>
                        <div className="bg-gray-300 h-4 w-full mt-2"></div>
                        <div className="bg-gray-300 h-6 w-24 mt-4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : error ? (
              // Error State
              <div className="w-full text-red-500 text-center">{error}</div>
            ) : (
              // Actual Desktop Cards
              renderBlogCardsDesktop()
            )}
          </div>

          {/* "View All" Button */}
          <div className="learn-more px-20 mt-12">
            <Link to="/blog">
              <button
                className="shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-[#0821D2] quantico-bold-italic text-xl uppercase px-6 py-3 rounded hover:bg-[#0821D2] transition-colors duration-300"
                type="button"
              >
                View All
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* --------------------- MOBILE VERSION (hidden on desktop) --------------------- */}
      <div className="block lg:hidden bg-gradient-to-r from-[#FFFFFF] to-[#E6E6E6] py-12 px-6">
        {/* Mobile Top section: "BLOG" on the left, icon on the right */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <hr className="border-0 bg-black w-40 h-[6px]" />
            <h1 className="text-6xl font-bold uppercase tracking-wider text-black quantico-bold-italic">
              Blog
            </h1>
            <hr className="border-0 bg-black w-40 h-[6px] mb-3" />
            <p className="text-base pt-sans-regular">
              Stay informed with our latest blog posts.
            </p>
          </div>
          <img
            className="w-14 h-auto"
            src={ChemicalReaction}
            alt="Chemical Reaction"
          />
        </div>

        {/* Show single "slide" */}
        <div className="mb-6">{renderSingleCardMobile()}</div>

        {/* Arrows for mobile slider */}
        {blogPosts.length > 1 && (
          <div className="flex items-center justify-center space-x-4 mb-6">
            <button
              onClick={handlePrev}
              className="bg-transparent py-2 px-4 border text-[#9857F3] border-[#9857F3] hover:bg-[#9857F3] hover:text-white transition duration-300"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button
              onClick={handleNext}
              className="bg-transparent py-2 px-4 border text-[#9857F3] border-[#9857F3] hover:bg-[#9857F3] hover:text-white transition duration-300"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        )}

        {/* View All button */}
        <div className="text-center learn-more">
          <Link to="/blog">
            <button
              className="w-full shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-[#0821D2] quantico-bold-italic text-lg uppercase px-4 py-2 rounded hover:bg-[#0821D2] transition-colors duration-300"
              type="button"
            >
              View All
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
