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

  // Fetch blog posts from the backend
  const fetchBlogPosts = async () => {
    try {
      const response = await api.get("/blogs", { params: { limit: 3, sort: "desc" } }); // Adjust params as needed
      setBlogPosts(response.data.data); // Assuming the data is in response.data.data
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

  // Function to get category gradient based on category name
  const getCategoryGradient = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case "health":
        return "from-[#F4AE3F] to-[#E07A0C]";
      case "technology":
        return "from-[#A467F7] to-[#4C03CB]";
      case "science":
        return "from-[#D4FE4C] to-[#51A006]";
      default:
        return "from-[#CCCCCC] to-[#AAAAAA]"; // Default gradient
    }
  };

  // Function to render individual blog cards
  const renderBlogCards = () => {
    // Ensure there are exactly three blog posts
    const posts = blogPosts.slice(0, 3);
    const columns = ["left-col", "center-col", "right-col"];

    return columns.map((colClass, index) => {
      const post = posts[index];

      if (!post) {
        // If there are fewer than three posts, render a placeholder
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
                    className="quantico-bold-italic text-xl -ml-6 cursor-not-allowed"
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
                  className={`bg-gradient-to-r from-[#A467F7] to-[#4C03CB] text-white px-8 py-2 pt-sans-regular`}
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
                <button>

                <Link
                  to={`/blog/${post.slug}`}
                  className="quantico-bold-italic text-xl -ml-6 flex items-center"
                >
                  Read Now <i className="ml-2 fa-solid fa-angle-right"></i>
                </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
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
            <img className="w-28" src={ChemicalReaction} alt="Chemical Reaction" />
          </div>
        </div>

        {/* Bottom Content */}
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
            // Error State: Display error message
            <div className="w-full text-red-500 text-center">{error}</div>
          ) : (
            // Display Fetched Blog Posts
            renderBlogCards()
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
  );
};

export default BlogCard;
