// src/pages/DeleteAccountSuccessPage.jsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SuccessBG from "../assets/LoginBG.png"; // Ensure this image exists or reuse LoginBG

const DeleteAccountSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page after a short delay
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${SuccessBG})` }} // Replace with your image path or use a default background
    >
      <div className="bg-white shadow-lg rounded-lg p-16 max-w-lg w-full h-auto min-h-[400px] text-center">
        <h2 className="text-4xl font-bold mb-4 quantico-bold-italic">
          Account Deleted
        </h2>
        <p className="mb-8 text-lg pt-sans-regular">
          Your account has been successfully deleted. We're sorry to see you go.
        </p>
        <p className="mb-8 text-lg pt-sans-regular">
          You will be redirected to the home page shortly.
        </p>
        <button
          onClick={() => navigate("/")}
          className="w-full text-lg py-3 bg-gradient-to-r from-black to-[#0821D2] text-white font-bold quantico-bold-italic hover:bg-gray-800 transition duration-300 rounded"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountSuccessPage;
