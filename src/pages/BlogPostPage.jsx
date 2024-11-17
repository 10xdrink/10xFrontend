// src/pages/BlogPostPage.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from '../utils/api'; // Use the centralized API instance

const BlogPostPage = () => {
  const { slug } = useParams(); // Extract the blog post slug from the URL parameters
  const [post, setPost] = useState(null); // State to hold the blog post data
  const [loading, setLoading] = useState(true); // State to manage the loading indicator
  const [error, setError] = useState(null); // State to manage any errors during fetch

  useEffect(() => {
    console.log("Fetched slug:", slug); // Debugging statement
    console.log("Current URL:", window.location.href); // Additional debugging

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!slug) {
          throw new Error("No slug provided");
        }

        // Make an API call to fetch the blog post using the slug
        const response = await api.get(`/blogs/slug/${slug}`); // No `/api` prefix as it's handled by api.js

        // Check if the response contains the expected data
        if (response.data && response.data.data) {
          setPost(response.data.data);
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (err) {
        console.error("API Response Error:", err);

        // Determine the type of error and set an appropriate error message
        if (err.response) {
          // Server responded with a status other than 2xx
          setError(err.response.data.message || "An error occurred while fetching the blog post.");
        } else if (err.request) {
          // Request was made but no response received
          setError("No response from server. Please try again later.");
        } else {
          // Something happened in setting up the request
          setError(err.message || "An unexpected error occurred.");
        }
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
      }
    };

    if (slug) { // Ensure slug is defined before making the API call
      fetchPost();
    } else {
      setLoading(false);
      setError("Invalid blog post URL.");
    }
  }, [slug]); // Re-run the effect if the slug changes

  // Render a loading indicator while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  // Render an error message if an error occurred during fetch
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  // Render a message if no post was found
  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">No blog post found.</p>
      </div>
    );
  }

  // Destructure the necessary properties from the post object
  const { title, content, author, createdAt, updatedAt, images } = post;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Blog Post Title */}
      <h1 className="text-4xl font-bold mb-4">{title || 'Untitled Post'}</h1>

      {/* Blog Post Metadata */}
      <div className="text-gray-600 mb-6">
        <span>{createdAt ? new Date(createdAt).toLocaleDateString() : 'Unknown Date'}</span> |{" "}
        <span>{author?.name || 'Unknown Author'}</span>
      </div>

      {/* Blog Post Image */}
      <img
        src={Array.isArray(images) && images.length > 0 ? images[0] : "/default-image.jpg"} // Ensure default-image.jpg exists in the public folder
        alt={title || 'Blog Post Image'}
        className="w-full h-96 object-cover mb-6"
      />

      {/* Blog Post Content */}
      <div className="prose lg:prose-xl">
        {content ? (
          <p>{content}</p>
        ) : (
          <p>No content available for this blog post.</p>
        )}
      </div>

      {/* Blog Post Last Updated Information */}
      {updatedAt && (
        <p className="text-gray-500 mt-4">
          Last updated on {new Date(updatedAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default BlogPostPage;
