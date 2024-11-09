// src/components/ProfileModal.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit, faUpload } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import FocusTrap from 'focus-trap-react';
import Toast from './Toast'; // Import the custom Toast component

const DEFAULT_PROFILE_PICTURE = "https://steelpersonaltraining.com/wp-content/uploads/2024/11/Profile-Pic-Placeholder.png";

// Define standard file size and image dimensions (in bytes and pixels)
const STANDARD_FILE_SIZE = 1 * 1024 * 1024; // 1 MB
const STANDARD_WIDTH = 300;
const STANDARD_HEIGHT = 300;

// Allowed file types
const VALID_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

const ProfileModal = ({ user, onClose, onLogout, onSave }) => {
  // State to manage edit mode and form values
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedEmail, setEditedEmail] = useState(user?.email || '');

  // State for profile picture
  const [profilePic, setProfilePic] = useState(user?.profilePicture || DEFAULT_PROFILE_PICTURE);
  const [selectedFile, setSelectedFile] = useState(null); // File object of new profile picture
  const [previewURL, setPreviewURL] = useState(null); // Preview URL for the selected image

  // States for saving status
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Ref for the first input element
  const firstInputRef = useRef(null);

  // State for Toast
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // 'success' or 'error'

  // Sync profilePic with user prop changes
  useEffect(() => {
    setProfilePic(user?.profilePicture || DEFAULT_PROFILE_PICTURE);
    setEditedName(user?.name || '');
    setEditedEmail(user?.email || '');
    setSelectedFile(null);
    setPreviewURL(null);
    setIsEditing(false);
    setIsSaved(false);
    setToastVisible(false);
  }, [user]);

  // Handle Save with enhanced error handling and notifications
  const handleSave = async () => {
    setIsSaving(true);
    setIsSaved(false);
    try {
      const updatedData = {
        name: editedName,
        email: editedEmail,
      };

      // If a new profile picture is selected, append it to the data
      if (selectedFile) {
        const formData = new FormData();
        formData.append('name', editedName);
        formData.append('email', editedEmail);
        formData.append('profilePicture', selectedFile);

        const response = await onSave(formData, true);
        if (response?.success) {
          setToastMessage('Profile updated successfully');
          setToastType('success');
          setToastVisible(true);
          setIsEditing(false);
          setSelectedFile(null);
          setPreviewURL(null);
          setProfilePic(response.data.profilePicture || profilePic);
          setIsSaved(true);
        } else {
          throw new Error(response?.message || 'Unknown error');
        }
      } else {
        const response = await onSave(updatedData, false);
        if (response?.success) {
          setToastMessage('Profile updated successfully');
          setToastType('success');
          setToastVisible(true);
          setIsEditing(false);
          setIsSaved(true);
        } else {
          throw new Error(response?.message || 'Unknown error');
        }
      }
    } catch (error) {
      setToastMessage('Failed to update profile. Please try again.');
      setToastType('error');
      setToastVisible(true);
      console.error('Profile update error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Cancel Edit
  const handleCancel = () => {
    setEditedName(user?.name || '');
    setEditedEmail(user?.email || '');
    setSelectedFile(null);
    setPreviewURL(null);
    setIsEditing(false);
    setIsSaved(false); // Reset save status on cancel
  };

  // Auto-focus on the first input when entering edit mode
  useEffect(() => {
    if (isEditing && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [isEditing]);

  // Handle file selection with validation and resizing
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!VALID_TYPES.includes(file.type)) {
        setToastMessage('Please select a valid image file (JPEG, PNG, GIF)');
        setToastType('error');
        setToastVisible(true);
        return;
      }

      // Validate file size
      if (file.size > STANDARD_FILE_SIZE) {
        setToastMessage('Image is too large. Maximum size is 1 MB.');
        setToastType('error');
        setToastVisible(true);
        return;
      }

      // Create a preview URL immediately upon file selection
      const objectURL = URL.createObjectURL(file);
      setPreviewURL(objectURL); // Set the preview URL for immediate feedback

      // Validate image dimensions
      const img = new Image();
      img.src = objectURL;
      img.onload = async () => {
        const { width, height } = img;

        // Only resize if dimensions are not as expected
        if (width !== STANDARD_WIDTH || height !== STANDARD_HEIGHT) {
          try {
            const resizedFile = await resizeAndCropImage(file, STANDARD_WIDTH, STANDARD_HEIGHT);
            if (resizedFile.size > STANDARD_FILE_SIZE) {
              setToastMessage('Resized image exceeds maximum size of 1 MB.');
              setToastType('error');
              setToastVisible(true);
              return;
            }
            setSelectedFile(resizedFile);
            setPreviewURL(URL.createObjectURL(resizedFile));
            setToastMessage('Image resized to standard 300x300 pixels.');
            setToastType('success');
            setToastVisible(true);
          } catch (error) {
            setToastMessage('Failed to process the image.');
            setToastType('error');
            setToastVisible(true);
          }
        } else {
          setSelectedFile(file); // Set the selected file for upload
        }
      };
      img.onerror = () => {
        setToastMessage('Failed to load the image. Please try another file.');
        setToastType('error');
        setToastVisible(true);
      };
    }
  };

  // Cleanup the preview URL when component unmounts or when a new file is selected
  useEffect(() => {
    return () => {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [previewURL]);

  // Function to resize and crop image using Canvas
  const resizeAndCropImage = (file, targetWidth, targetHeight) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.src = url;
      img.onload = () => {
        // Calculate aspect ratios
        const aspectRatio = img.width / img.height;
        const targetAspectRatio = targetWidth / targetHeight;

        let canvasWidth, canvasHeight, offsetX, offsetY;

        if (aspectRatio > targetAspectRatio) {
          // Image is wider than target aspect ratio
          canvasHeight = targetHeight;
          canvasWidth = img.width * (targetHeight / img.height);
          offsetX = -(canvasWidth - targetWidth) / 2;
          offsetY = 0;
        } else {
          // Image is taller than target aspect ratio
          canvasWidth = targetWidth;
          canvasHeight = img.height * (targetWidth / img.width);
          offsetX = 0;
          offsetY = -(canvasHeight - targetHeight) / 2;
        }

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(img, offsetX, offsetY, canvasWidth, canvasHeight);

        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(url); // Clean up the object URL
            if (blob) {
              resolve(new File([blob], file.name, { type: blob.type }));
            } else {
              reject(new Error('Canvas is empty'));
            }
          },
          file.type,
          0.9 // Compression quality
        );
      };
      img.onerror = () => {
        URL.revokeObjectURL(url); // Clean up the object URL
        reject(new Error('Failed to load image'));
      };
    });
  };

  // Modal animation variants
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: { y: "0", opacity: 1, transition: { delay: 0.2, duration: 0.5 } },
    exit: { y: "100vh", opacity: 0, transition: { ease: 'easeInOut', duration: 0.5 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto"
        aria-modal="true"
        role="dialog"
        aria-labelledby="profile-modal-title"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
      >
        <FocusTrap>
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-16 w-11/12 max-w-5xl shadow-lg relative max-h-screen overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white bg-gradient-to-r from-black to-[#0821D2] hover:text-white px-8 py-3 dark:text-gray-300 dark:hover:text-white focus:outline-none rounded-full"
              aria-label="Close Profile Modal"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>

            <h2 id="profile-modal-title" className="text-4xl font-semibold text-black quantico-bold-italic dark:text-gray-100 mb-10">
              Profile Information
            </h2>

            {/* User Information */}
            <div className="space-y-10">
              {/* Profile Picture Section */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src={previewURL || profilePic || DEFAULT_PROFILE_PICTURE}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                  />
                  {isEditing && (
                    <label htmlFor="profilePicture" className="absolute bottom-0 right-0 bg-gradient-to-r from-black to-[#0821D2] text-white rounded-full p-2 cursor-pointer">
                      <FontAwesomeIcon icon={faUpload} />
                    </label>
                  )}
                  {isEditing && (
                    <input
                      type="file"
                      id="profilePicture"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  )}
                </div>
                {isEditing && selectedFile && (
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewURL(null);
                      // Optionally, you can also clear the file input value here
                      document.getElementById('profilePicture').value = '';
                    }}
                    className="text-red-500 hover:underline focus:outline-none"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-black dark:text-gray-300 font-medium mb-4 roboto-black">
                  Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="name"
                    ref={firstInputRef}
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="pt-sans-regular w-full px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#061AA5] dark:bg-gray-700 dark:text-gray-100 text-lg"
                  />
                ) : (
                  <p className="text-black pt-sans-regular dark:text-gray-200 text-lg">{editedName}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-gray-600 dark:text-gray-300 font-medium mb-4 roboto-black">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    id="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    className="pt-sans-regular w-full px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#061AA5] dark:bg-gray-700 dark:text-gray-100 text-lg"
                  />
                ) : (
                  <p className="text-black pt-sans-regular dark:text-gray-200 text-lg">{editedEmail}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-16 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-8 sm:space-y-0 sm:space-x-12">
              {/* Edit / Save and Cancel Buttons */}
              <div className="flex space-x-6">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className={`quantico-bold-italic text-lg bg-gradient-to-r from-black to-[#0821D2] text-white py-3 px-10 font-bold focus:outline-none hover:shadow-lg transition duration-300 ease-in-out rounded ${
                        (isSaving || isSaved) ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                      disabled={isSaving || isSaved}
                    >
                      {isSaving ? 'Saving...' : isSaved ? 'Saved' : 'Save'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="quantico-bold-italic text-lg shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-[#0821D2] py-3 px-10 focus:outline-none hover:bg-gray-100 transition duration-300 ease-in-out rounded"
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setIsSaved(false); // Reset save status when editing starts
                    }}
                    className="quantico-bold-italic text-lg bg-gradient-to-r from-black to-[#0821D2] text-white py-3 px-10 font-bold focus:outline-none hover:shadow-lg transition duration-300 ease-in-out rounded flex items-center"
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
                  </button>
                )}
              </div>

              {/* Reset Password and Logout Links */}
              <div className="flex space-x-6">
                <Link
                  to="/forgot-password"
                  className="quantico-bold-italic text-lg bg-gradient-to-r from-black to-[#0821D2] text-white py-3 px-10 font-bold focus:outline-none hover:shadow-lg transition duration-300 ease-in-out rounded text-center"
                >
                  Reset Password
                </Link>
                <button
                  onClick={onLogout}
                  className="quantico-bold-italic text-lg shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-[#0821D2] py-3 px-10 focus:outline-none hover:bg-gray-100 transition duration-300 ease-in-out rounded"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Custom Toast Notification */}
            <Toast
              message={toastMessage}
              isVisible={toastVisible}
              onClose={() => setToastVisible(false)}
              type={toastType}
            />
          </motion.div>
        </FocusTrap>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileModal;
