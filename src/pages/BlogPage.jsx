// src/components/BlogPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import api from '../utils/api';
import EnlargedX from "../assets/EnlargedX.png";
import StayInformed from "../components/StayInformed";
import Takechargeinform from "../components/Takechargeinform";

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("View all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState(["View all"]);
  const [totalPages, setTotalPages] = useState(1);

  // Meta information for the page
  const pageTitle = "Blog | 10X Energy Drink";
  const pageDescription = "Stay informed with the latest articles, tips, and news about 10X energy drinks, health, wellness, and performance optimization.";
  const pageKeywords = "10X blog, energy drink articles, health tips, wellness advice, performance optimization";


  // Fetch all categories from the backend
  const fetchAllCategories = async () => {
    try {
      const response = await api.get("/categories"); // Removed '/api' from path
      const fetchedCategories = response.data.data.map(cat => cat.name);
      setCategories(["View all", ...fetchedCategories]);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories.");
    }
  };

  // Fetch blog posts from the backend
  const fetchBlogPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page: currentPage,
        limit: 9,
      };

      if (selectedCategory !== "View all") {
        params.category = selectedCategory;
      }

      const response = await api.get("/blogs", { params }); // Removed '/api' from path

      const { data, total } = response.data;

      setBlogPosts(data);
      setTotalPages(Math.ceil(total / 9));
    } catch (err) {
      console.error("Error fetching blog posts:", err);
      setError(err.response?.data?.message || "An error occurred while fetching blog posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCategories();
    fetchBlogPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, currentPage]);

  const nextSlide = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevSlide = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const scrollToIndex = (index) => {
    setCurrentPage(index + 1);
  };

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
      </Helmet>
      {/* Shimmer Effect Styles */}
      <style jsx="true">{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .shimmer {
          animation: shimmer 2s infinite;
          background: linear-gradient(
            to right,
            #f6f7f8 0%,
            #edeef1 20%,
            #f6f7f8 40%,
            #f6f7f8 100%
          );
          background-size: 2000px 100%;
        }
      `}</style>

      {/* Header */}
      <div className="main-div bg-gradient-to-r from-[#13EAED] to-[#0AA3A5] flex">
        <div className="left-col px-20 py-28 w-1/2">
          <h1 className="text-9xl quantico-bold-italic text-black uppercase">
            OUR BLOG
          </h1>
        </div>
        <div className="right-col w-1/2 h-[400px] overflow-hidden flex items-center justify-center">
          <img
            className="w-[360px] object-cover transition-transform duration-[2000ms] ease-in-out transform hover:-translate-y-96"
            src={EnlargedX}
            alt="Enlarged"
          />
        </div>
      </div>

      {/* Blog Listing Section */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-20 py-10 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 quantico-bold-italic uppercase">
          Explore Our Latest Posts
        </h2>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 border transition-colors duration-300 mr-8 ${
                selectedCategory === category
                  ? "bg-yellow-400 text-black"
                  : "bg-transparent text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1); // Reset to first page on category change
              }}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading Animation (Shimmer Effect) */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                {/* Image Placeholder */}
                <div className="w-full h-48 shimmer"></div>
                <div className="p-6">
                  {/* Category Placeholder */}
                  <div className="w-24 h-4 bg-gray-300 shimmer mb-2"></div>
                  {/* Date and Author Placeholder */}
                  <div className="w-32 h-3 bg-gray-300 shimmer mb-4"></div>
                  {/* Title Placeholder */}
                  <div className="w-3/4 h-6 bg-gray-300 shimmer mb-2"></div>
                  {/* Excerpt Placeholder */}
                  <div className="w-full h-4 bg-gray-300 shimmer mb-4"></div>
                  {/* Read More Placeholder */}
                  <div className="w-24 h-4 bg-gray-300 shimmer"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : blogPosts.length === 0 ? (
          <div className="text-gray-500 text-center">No blog posts found.</div>
        ) : (
          /* Blog Posts Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={
                    post.images && post.images.length > 0
                      ? post.images[0]
                      : "/default-image.jpg" // Replace with actual default image path
                  }
                  alt={post.title}
                  className="w-full h-[300px] object-cover"
                  loading="lazy"
                />
                <div className="p-6 bg-[#FFFFFF]">
                  <span className="text-sm text-black bg-gradient-to-r from-[#F4AE3F] to-[#E07A0C] py-2 px-4 rounded">
                    {post.categories && post.categories.length > 0
                      ? post.categories[0].name
                      : "Uncategorized"}
                  </span>
                  <p className="text-black text-xs sm:text-sm mt-4 font-bold ">
                    <i className="fa-solid fa-user text-[#A467F7]"></i>{" "}
                    {post.author && post.author.name}
                  </p>
                  <h3 className="text-xl font-bold uppercase text-black mt-2 nimbusL-bol">
                    {post.title}
                  </h3>
                  <p className="text-black pt-sans-regular mt-2">
                    {post.excerpt}
                  </p>
                  <div className="learn-more p-0 -ml-6 mt-4">
                    <button>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="quantico-bold-italic text-xl uppercase flex items-center"
                    >
                      LEARN MORE <i className="fa-solid fa-angle-right ml-4"></i>
                    </Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-8">
            {/* Navigation Dots */}
            <div className="flex space-x-2 mb-4 sm:mb-0">
              {Array.from({ length: totalPages }).map((_, index) => (
                <span
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`cursor-pointer w-3 h-3 rounded-full ${
                    index + 1 === currentPage
                      ? "bg-gradient-to-r from-[#9857F3] to-[#5A10D4]"
                      : "bg-[#D8C6F1]"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex space-x-4">
              <button
                onClick={prevSlide}
                className={`py-2 px-4 border rounded ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-transparent text-[#9857F3] border-[#9857F3] hover:bg-[#9857F3] hover:text-white transition-colors duration-300"
                }`}
                aria-label="Previous Page"
                disabled={currentPage === 1}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <button
                onClick={nextSlide}
                className={`py-2 px-4 border rounded ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-transparent text-[#9857F3] border-[#9857F3] hover:bg-[#9857F3] hover:text-white transition-colors duration-300"
                }`}
                aria-label="Next Page"
                disabled={currentPage === totalPages}
              >
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>

      <StayInformed />
      <Takechargeinform />
    </div>
  );
};

export default BlogPage;
