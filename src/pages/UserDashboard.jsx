// src/pages/UserDashboard.jsx

import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import AvailableAtBG from "../assets/AvailableAtBG.png";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ProfileModal from '../components/ProfileModal';
import CommunicationsModal from '../components/CommunicationsModal';
import api from '../utils/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DEFAULT_PROFILE_PICTURE = "https://steelpersonaltraining.com/wp-content/uploads/2024/11/Profile-Pic-Placeholder.png";

const UserDashboard = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isCommunicationsModalOpen, setCommunicationsModalOpen] = useState(false);
  const { user, logout, setUser } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || DEFAULT_PROFILE_PICTURE);


  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && setUser) {
      const formData = new FormData();
      formData.append('profilePicture', file);

      try {
        const response = await api.put('/auth/update-profile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.success) {
          setUser(response.data.data); // Update user data in context
          setProfilePicture(response.data.data.profilePicture || DEFAULT_PROFILE_PICTURE);
          toast.success('Profile picture updated successfully!');
        } else {
          throw new Error(response.data.message || 'Profile picture update failed');
        }
      } catch (error) {
        toast.error('Failed to update profile picture. Please try again.');
      }
    } else {
      toast.error('User context is not available.');
    }
  };

  const handleSave = async (updatedData, isFormData = false) => {
    try {
      let response;

      if (isFormData) {
        response = await api.put('/auth/update-profile', updatedData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        response = await api.put('/auth/update-profile', updatedData);
      }

      if (response.data.success) {
        if (setUser) {
          setUser(response.data.data);
          toast.success('Profile updated successfully!');
        } else {
          toast.error('User context is not available.');
        }
        return response.data;
      } else {
        throw new Error(response.data.message || 'Profile update failed');
      }
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
      throw error;
    }
  };

  const cards = [
    { title: "PROFILE", description: "View or edit your personal details", onClick: () => setProfileModalOpen(true) },
    { title: "ADDRESSES", description: "Manage your delivery addresses", onClick: () => toast.info("Addresses feature is under development.") },
    { title: "COMMUNICATIONS", description: "Get in touch with us – your direct line to 10x Private Limited.", onClick: () => setCommunicationsModalOpen(true) },
    { title: "LOGIN & SECURITY", description: "Manage your account password and security settings", onClick: () => toast.info("Login & Security feature is under development.") },
    { title: "TRACK YOUR ORDER", description: "Real-time updates on your order status", onClick: () => toast.info("Order Tracking feature is under development.") },
  ];

  return (
    <div
      className="bg-gray-100 pt-24 pb-24 pl-24 pr-24 flex flex-col justify-center py-4"
      style={{
        backgroundImage: `url(${AvailableAtBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Profile Picture Upload Section */}
      <div className="flex items-center mb-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200">
          <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
          {/* Edit Icon Overlay */}
          <label
            htmlFor="fileInput"
            className="absolute bottom-0 right-0 bg-gray-700 text-white p-1 rounded-full cursor-pointer"
            style={{ fontSize: '0.75rem' }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        <h1 className="ml-4 text-5xl font-bold quantico-bold-italic uppercase">
          HELLO, {user?.name || "NAME"}
        </h1>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 w-full">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-md py-12 px-8 rounded-md border border-gray-200 relative transition-transform transform hover:scale-105 cursor-pointer"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={card.onClick}
          >
            <h2 className="text-4xl font-bold mb-4 flex items-center quantico-bold-italic">
              {card.title}
              {hoverIndex === index && (
                <FontAwesomeIcon
                  icon={faEdit}
                  className="ml-2 text-[#0820CA] cursor-pointer"
                />
              )}
            </h2>
            <p className="text-gray-700 pt-sans-regular">{card.description}</p>
          </div>
        ))}
      </div>

      {/* Bottom Buttons */}
      <div className="flex space-x-4 justify-start">
        <Link to="/shop">
          <button className="quantico-bold-italic text-xl bg-gradient-to-r from-black to-[#0821D2] text-white py-3 px-8 font-bold focus:outline-none hover:shadow-lg transition duration-300 ease-in-out rounded">
            GO TO SHOP
          </button>
        </Link>
        <div className="learn-more">
          <Link to="/order-history">
            <button
              className="shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-[#0821D2] quantico-bold-italic text-xl py-3 px-8 focus:outline-none hover:bg-gray-100 transition duration-300 ease-in-out rounded"
              type="button"
            >
              ORDER HISTORY
            </button>
          </Link>
        </div>
      </div>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <ProfileModal
          user={user}
          onClose={() => setProfileModalOpen(false)}
          onLogout={logout}
          onSave={handleSave}
        />
      )}

      {/* Communications Modal */}
      {isCommunicationsModalOpen && (
        <CommunicationsModal
          onClose={() => setCommunicationsModalOpen(false)}
        />
      )}

      {/* Removed ToastContainer to prevent multiple instances */}
    </div>
  );
};

export default UserDashboard;
