// src/components/UserDashboard.jsx

import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSpinner } from "@fortawesome/free-solid-svg-icons";
import AvailableAtBG from "../assets/AvailableAtBG.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ProfileModal from "../components/ProfileModal";
import CommunicationsModal from "../components/CommunicationsModal";
import api from "../utils/api";
import Toast from "../components/Toast";

const DEFAULT_PROFILE_PICTURE =
  "https://steelpersonaltraining.com/wp-content/uploads/2024/11/Profile-Pic-Placeholder.png";

const UserDashboard = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isCommunicationsModalOpen, setCommunicationsModalOpen] = useState(false);
  const { user, logout, setUser } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState(
    user?.profilePicture || DEFAULT_PROFILE_PICTURE
  );

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && setUser) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("profilePicture", file);

      try {
        const response = await api.put("/auth/update-profile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.success) {
          setUser(response.data.data);
          setProfilePicture(
            response.data.data.profilePicture || DEFAULT_PROFILE_PICTURE
          );
          setToastMessage("Profile picture updated successfully!");
          setToastType("success");
          setToastVisible(true);
        } else {
          throw new Error(
            response.data.message || "Profile picture update failed"
          );
        }
      } catch (error) {
        setToastMessage("Failed to update profile picture. Please try again.");
        setToastType("error");
        setToastVisible(true);
      } finally {
        setIsUploading(false);
      }
    } else {
      setToastMessage("User context is not available.");
      setToastType("error");
      setToastVisible(true);
    }
  };

  const handleSave = async (updatedData, isFormData = false) => {
    try {
      let response;

      if (isFormData) {
        response = await api.put("/auth/update-profile", updatedData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await api.put("/auth/update-profile", updatedData);
      }

      if (response.data.success) {
        if (setUser) {
          setUser(response.data.data);
          setProfilePicture(
            response.data.data.profilePicture || DEFAULT_PROFILE_PICTURE
          );
          setToastMessage("Profile updated successfully!");
          setToastType("success");
          setToastVisible(true);
        } else {
          setToastMessage("User context is not available.");
          setToastType("error");
          setToastVisible(true);
        }
        return response.data;
      } else {
        throw new Error(response.data.message || "Profile update failed");
      }
    } catch (error) {
      setToastMessage("Failed to update profile. Please try again.");
      setToastType("error");
      setToastVisible(true);
      throw error;
    }
  };

  const cards = [
    {
      title: "PROFILE",
      description: "View or edit your personal details",
      onClick: () => setProfileModalOpen(true),
    },
    {
      title: "ADDRESSES",
      description: "Manage your delivery addresses",
      onClick: () => navigate('/edit-address'), // Navigate to Add Address page
    },
    {
      title: "COMMUNICATIONS",
      description:
        "Get in touch with us – your direct line to 10x Private Limited.",
      onClick: () => setCommunicationsModalOpen(true),
    },
    {
      title: "YOUR FEEDBACK", // Updated Title
      description: "Your feedback helps us improve our products", // Updated Description
      onClick: () => navigate('/user-review'), // Navigate to /user-review
    },
    {
      title: "TRACK YOUR ORDER",
      description: "Real-time updates on your order status",
      onClick: () => navigate('/my-orders'),
    },
    {
      title: "DELETE ACCOUNT", // New Card Title
      description: "See how to permanently delete your account", // New Card Description
      onClick: () => navigate('/delete-account'), // Navigate to /delete-account
    },
  ];

  useEffect(() => {
    if (toastMessage) {
      setToastVisible(true);
    }
  }, [toastMessage]);

  return (
    <div
      className="bg-gray-100 pt-12 pb-12 px-6 md:pt-24 md:pb-24 md:px-24 flex flex-col justify-center"
      style={{
        backgroundImage: `url(${AvailableAtBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Profile Picture Upload Section */}
      <div className="flex items-center mb-6 md:mb-8">
        <div className="relative w-20 h-20 md:w-24 md:h-24">
          <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <label
            htmlFor="fileInput"
            className="absolute bottom-0 right-0 bg-gradient-to-r from-black to-[#0821D2] text-white p-2 md:p-4 rounded-full cursor-pointer flex items-center justify-center"
            style={{
              fontSize: "0.75rem",
              transform: "translate(25%, 25%)",
              zIndex: 10,
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </label>

          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {isUploading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-full">
              <FontAwesomeIcon icon={faSpinner} spin size="2x" className="text-gray-800" />
            </div>
          )}
        </div>

        <h1 className="ml-4 text-2xl md:text-5xl font-bold quantico-bold-italic uppercase">
          HELLO, {user?.name || "NAME"}
        </h1>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8 w-full">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-md py-8 px-6 md:py-12 md:px-8 rounded-md border border-gray-200 relative transition-transform transform hover:scale-105 cursor-pointer"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              card.onClick();
              if (
                card.title === "ADDRESSES" ||
                card.title === "YOUR FEEDBACK" || // Updated condition
                card.title === "YOUR REVIEWS" // If necessary
              ) {
                setToastType("info");
              }
            }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4 flex items-center quantico-bold-italic">
              {card.title}
              {hoverIndex === index && (
                <FontAwesomeIcon
                  icon={faEdit}
                  className="ml-2 text-[#0820CA] cursor-pointer"
                />
              )}
            </h2>
            <p className="text-sm md:text-base text-gray-700 pt-sans-regular">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom Buttons */}
      <div className="flex flex-row space-x-4 justify-start">
        <Link to="/products">
          <button className="quantico-bold-italic text-lg md:text-xl bg-gradient-to-r from-black to-[#0821D2] text-white py-3 px-6 md:px-8 font-bold focus:outline-none hover:shadow-lg transition duration-300 ease-in-out rounded">
            GO TO SHOP
          </button>
        </Link>
        <div className="learn-more">
          <Link to="/my-orders">
            <button
              className="shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-[#0821D2] quantico-bold-italic text-lg md:text-xl py-3 px-6 md:px-8 focus:outline-none hover:bg-gray-100 transition duration-300 ease-in-out rounded"
              type="button"
            >
              ORDER HISTORY
            </button>
          </Link>
        </div>
      </div>

      {isProfileModalOpen && (
        <ProfileModal
          user={user}
          onClose={() => setProfileModalOpen(false)}
          onLogout={logout}
          onSave={handleSave}
        />
      )}

      {isCommunicationsModalOpen && (
        <CommunicationsModal
          onClose={() => setCommunicationsModalOpen(false)}
        />
      )}

      <Toast
        message={toastMessage}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
        type={toastType}
      />
    </div>
  );
};

export default UserDashboard;
