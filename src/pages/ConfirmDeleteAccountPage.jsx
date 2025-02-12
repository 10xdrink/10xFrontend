// Frontend/src/pages/ConfirmDeleteAccountPage.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api"; // Pre-configured Axios instance
import LoadingSpinner from "../components/LoadingSpinner"; // Ensure this component exists
// import logger from "../utils/logger"; // Ensure you have a logger utility

const ConfirmDeleteAccountPage = () => {
  const { token } = useParams(); // Extract the token from the URL
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // Possible values: loading, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const confirmDeletion = async () => {
      try {
        // Send a GET request to the backend to confirm account deletion
        const response = await api.get(`/auth/confirm-delete/${token}`);

        if (response.status === 200) {
          setStatus("success");
          setMessage("Your account has been successfully deleted.");
          // Optionally, redirect to the home page after a delay
          setTimeout(() => {
            navigate("/delete-account-success");
          }, 3000); // 3 seconds delay
        } else {
          throw new Error("Unexpected response from the server.");
        }
      } catch (error) {
        logger.error("Confirm Delete Account Error:", error);
        setStatus("error");
        if (error.response && error.response.data && error.response.data.message) {
          setMessage(error.response.data.message);
        } else {
          setMessage("An unexpected error occurred. Please try again later.");
        }
      }
    };

    if (token) {
      confirmDeletion();
    } else {
      setStatus("error");
      setMessage("Invalid or missing token.");
    }
  }, [token, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${"/path-to-your-background-image.jpg"})` }} // Replace with your image path or use a default background
    >
      <div className="bg-white shadow-lg rounded-lg p-16 max-w-lg w-full h-auto min-h-[400px] text-center">
        {status === "loading" && (
          <div>
            <LoadingSpinner />
            <p className="mt-4 text-lg">Processing your request...</p>
          </div>
        )}
        {status === "success" && (
          <div>
            <h2 className="text-4xl font-bold mb-4">Account Deleted</h2>
            <p className="mb-8 text-lg">
              {message} Redirecting to the home page...
            </p>
            <button
              onClick={() => navigate("/")}
              className="w-full text-lg py-3 bg-gradient-to-r from-black to-[#0821D2] text-white font-bold hover:bg-gray-800 transition duration-300 rounded"
            >
              Return to Home
            </button>
          </div>
        )}
        {status === "error" && (
          <div>
            <h2 className="text-4xl font-bold mb-4 text-red-500">Error</h2>
            <p className="mb-8 text-lg">{message}</p>
            <button
              onClick={() => navigate("/user-dashboard")}
              className="w-full text-lg py-3 bg-gray-500 text-white font-bold hover:bg-gray-700 transition duration-300 rounded"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmDeleteAccountPage;
