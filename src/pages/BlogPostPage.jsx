import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from '../utils/api'; // Use the centralized API instance

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        const response = await api.get(`/blogs/slug/${slug}`); // No `/api` here, as it’s handled by api.js

        setPost(response.data.data);
      } catch (err) {
        console.error("API Response Error:", err.response);
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
        setLoading(false);
      }
    };

    if (slug) { // Ensure slug is defined before making the API call
      fetchPost();
    } else {
      setLoading(false);
      setError("Invalid blog post URL.");
    }
  }, [slug]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600 mb-6">
        <span>{new Date(post.createdAt).toLocaleDateString()}</span> |{" "}
        <span>{post.author.name}</span>
      </div>
      <img
        src={post.images && post.images.length > 0 ? post.images[0] : "/default-image.jpg"} // Ensure default-image.jpg exists
        alt={post.title}
        className="w-full h-96 object-cover mb-6"
      />
      <div className="prose lg:prose-xl">
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default BlogPostPage;
