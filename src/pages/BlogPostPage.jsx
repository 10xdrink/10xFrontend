// src/components/BlogPostPage.jsx

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import DOMPurify from "dompurify";

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define default values for variables
  const [category, setCategory] = useState("Health");
  const [readTime, setReadTime] = useState("5 min read");
  const [title, setTitle] = useState("Blog Title Goes Here");
  const [author, setAuthor] = useState("John Doe");
  const [publishDate, setPublishDate] = useState("15 March 2022");
  const [imageUrl, setImageUrl] = useState("/api/placeholder/800/400");

  useEffect(() => {
    console.log("Fetched slug:", slug);
    console.log("Current URL:", window.location.href);

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!slug) {
          throw new Error("No slug provided");
        }

        const response = await api.get(`/blogs/slug/${slug}`);

        if (response.data && response.data.data) {
          const postData = response.data.data;
          setPost(postData);
          // Update state variables with fetched data
          setCategory(postData.category || "Health");
          setTitle(postData.title || "Blog Title Goes Here");
          setAuthor(postData.author?.name || "John Doe");
          setPublishDate(
            new Date(postData.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            }) || "15 March 2022"
          );
          setImageUrl(postData.images?.[0] || "https://via.placeholder.com/800x400");
          // Calculate read time based on content length
          setReadTime(calculateReadTime(postData.content) || "5 min read");
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (err) {
        console.error("API Response Error:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "An unexpected error occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    } else {
      setLoading(false);
      setError("Invalid blog post URL.");
    }
  }, [slug]);

  // Helper function to calculate read time
  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content?.split(/\s+/)?.length || 0;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl roboto-regular">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-xl text-red-500 mb-4 roboto-regular">
          Error: {error}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition roboto-medium"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-xl roboto-regular">No blog post found.</p>
        <Link
          to="/blog"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition roboto-medium"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Navigation */}
      <div className="flex items-center gap-2 mb-6">
        <Link to="/blog" className="flex items-center text-gray-600 hover:text-gray-800 roboto-regular">
          <svg
            className="w-5 h-5 mr-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back to Latest Posts</span>
        </Link>
      </div>

      {/* Category and Read Time */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <span className="bg-orange-400 text-black px-3 py-1 rounded-full text-sm roboto-medium">
          {category}
        </span>
        <span className="text-gray-600 text-sm roboto-regular">{readTime}</span>
        <span className="text-gray-600 text-sm roboto-regular">
          Published on {publishDate}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl quantico-bold mb-6 text-gray-900 roboto-bold">
        {title}
      </h1>

      {/* Main Image without Title Overlay */}
      <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden shadow-lg">
        <img
          src={imageUrl}
          alt="Blog post cover"
          className="w-full h-full object-cover"
        />
        {/* Removed the title overlay div */}
      </div>

      {/* Author Info and Social Share */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        {/* Author Info */}
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          {/* Replaced author image with the provided URL */}
          <img
            src="https://res.cloudinary.com/dvbbsgj1u/image/upload/v1733558594/gzfxxmkrowqxetk90ft9.png"
            alt={author}
            className="w-12 h-12 rounded-full object-cover roboto-regular"
          />
          <div>
            <p className="text-gray-800 font-semibold roboto-medium">
              {author}
            </p>
            <p className="text-gray-500 text-sm roboto-regular">
              Published on {publishDate}
            </p>
          </div>
        </div>

        {/* Social Share Icons */}
        <div className="flex items-center space-x-4">
          <a
            href={`https://twitter.com/share?url=${encodeURIComponent(
              window.location.href
            )}&text=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 transition roboto-regular"
            aria-label="Share on Twitter"
          >
            <i className="fab fa-twitter fa-lg"></i>
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              window.location.href
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-700 transition roboto-regular"
            aria-label="Share on Facebook"
          >
            <i className="fab fa-facebook fa-lg"></i>
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
              window.location.href
            )}&title=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition roboto-regular"
            aria-label="Share on LinkedIn"
          >
            <i className="fab fa-linkedin fa-lg"></i>
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(
              title
            )}&body=Check out this blog post: ${encodeURIComponent(
              window.location.href
            )}`}
            className="text-gray-600 hover:text-red-500 transition roboto-regular"
            aria-label="Share via Email"
          >
            <i className="fas fa-envelope fa-lg"></i>
          </a>
        </div>
      </div>

      {/* Blog Content */}
      <div className="prose lg:prose-xl max-w-none mb-8 roboto-regular">
        {post.content ? (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content),
            }}
          />
        ) : (
          <p>No content available for this blog post.</p>
        )}
      </div>

      {/* Last Updated Information */}
      {post.updatedAt && (
        <p className="text-gray-500 text-sm roboto-regular">
          Last updated on{" "}
          {new Date(post.updatedAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}

      {/* Related Posts Section (Optional) */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 roboto-bold">
            Related Posts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {post.relatedPosts.map((related) => (
              <Link
                to={`/blog/${related.slug}`}
                key={related._id}
                className="block border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 roboto-regular"
              >
                <img
                  src={related.images?.[0] || "https://via.placeholder.com/400x200"}
                  alt={related.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 roboto-medium">
                    {related.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2 roboto-regular">
                    {related.excerpt || "Read more..."}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostPage;
