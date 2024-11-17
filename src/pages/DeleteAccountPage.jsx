// Frontend/src/pages/DeleteAccountPage.jsx

import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import DeleteBG from "../assets/LoginBG.png"; // Ensure this image exists or reuse LoginBG
import { useNavigate } from "react-router-dom";

const DeleteAccountPage = () => {
  const { deleteAccount } = useContext(AuthContext); // Utilize the deleteAccount function from AuthContext
  const navigate = useNavigate();

  // Error and success messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle delete account action
  const handleDeleteAccount = async () => {
    setError("");
    setSuccess("");
    const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmation) {
      return;
    }

    const response = await deleteAccount();
    if (response.success) {
      setSuccess(response.message);
      // Clear authentication tokens
      localStorage.removeItem("authToken"); // Adjust based on your implementation
      // Optionally, reset AuthContext state
      // setUser(null); // If you have a setUser function in context
      // Redirect to a confirmation page after a delay
      setTimeout(() => {
        navigate("/delete-account-success");
      }, 3000); // 3 seconds delay
    } else {
      setError(response.message || "Account deletion failed.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${DeleteBG})` }}
    >
      <div className="bg-white shadow-lg rounded-lg p-16 max-w-lg w-full h-auto min-h-[400px] text-center">
        <h2 className="text-4xl font-bold mb-4 quantico-bold-italic">
          Delete Account
        </h2>
        <p className="mb-8 text-lg pt-sans-regular">
          Are you sure you want to delete your account? This action cannot be undone.
        </p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 mb-4">
            {success} Redirecting...
          </p>
        )}
        <button
          onClick={handleDeleteAccount}
          className="w-full text-lg py-3 bg-gradient-to-r from-black to-[#0821D2] text-white font-bold quantico-bold-italic hover:bg-gray-800 transition duration-300 rounded"
        >
          DELETE ACCOUNT
        </button>
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => navigate("/user-dashboard")}
            className="text-sm font-bold hover:underline pt-sans-regular"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountPage;
