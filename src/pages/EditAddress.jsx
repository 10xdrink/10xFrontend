// src/components/EditAddress.jsx

import React, { useState, useEffect, useContext } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import address from "../assets/address.png"; // Ensure this path is correct
import Toast from "../components/Toast"; // Import the Toast component

const EditAddress = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddressId, setCurrentAddressId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState("");

  // Toast state
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success", // 'success', 'error', 'info'
  });

  useEffect(() => {
    if (!authLoading && user) {
      fetchAddresses();
    }
    // eslint-disable-next-line
  }, [user, authLoading]);

  const fetchAddresses = async () => {
    try {
      const response = await api.get("/users/addresses");
      console.log("Fetch Addresses Response:", response.data); // Debug
      if (response.data.success) {
        setAddresses(response.data.data);
      } else {
        setFetchError(response.data.message || "Failed to fetch addresses.");
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setFetchError(
        error.response?.data?.message ||
          "An error occurred while fetching addresses."
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Removed the logic that cancels editing when user types in the form
    // This ensures that editing mode remains active while modifying form fields
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.street.trim()) newErrors.street = "Street is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";
    if (!formData.zip.trim()) newErrors.zip = "ZIP code is required.";
    else if (!/^[A-Za-z0-9\s-]{3,10}$/.test(formData.zip))
      newErrors.zip =
        "ZIP code must be between 3 and 10 characters and contain only letters, numbers, spaces, and hyphens.";
    if (!formData.country.trim()) newErrors.country = "Country is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showToast = (message, type = "success") => {
    setToast({
      isVisible: true,
      message,
      type,
    });
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await api.post("/users/addresses", formData);
      console.log("Add Address Response:", response.data); // Debug
      if (response.data.success) {
        setAddresses([...addresses, response.data.data]);
        setFormData({
          street: "",
          city: "",
          state: "",
          zip: "",
          country: "",
        });
        showToast("Address added successfully.", "success");
      } else {
        showToast(response.data.message || "Failed to add address.", "error");
      }
    } catch (error) {
      console.error("Error adding address:", error);
      showToast(
        error.response?.data?.message ||
          "An error occurred while adding the address.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (address) => {
    console.log("Editing Address:", address); // Debug
    setIsEditing(true);
    setCurrentAddressId(address._id || address.id); // Handle both _id and id
    setFormData({
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country,
    });
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!currentAddressId) {
      showToast("Invalid address ID.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("Updating Address ID:", currentAddressId); // Debug
      console.log("Updating Address Data:", formData); // Debug

      const response = await api.put(
        `/users/addresses/${currentAddressId}`,
        formData
      );
      console.log("Update Address Response:", response.data); // Debug

      if (response.data.success) {
        setAddresses(
          addresses.map((addr) =>
            addr._id === currentAddressId || addr.id === currentAddressId
              ? response.data.data
              : addr
          )
        );
        setIsEditing(false);
        setCurrentAddressId(null);
        setFormData({
          street: "",
          city: "",
          state: "",
          zip: "",
          country: "",
        });
        showToast("Address updated successfully.", "success");
      } else {
        showToast(
          response.data.message || "Failed to update address.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating address:", error);
      showToast(
        error.response?.data?.message ||
          "An error occurred while updating the address.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?"))
      return;

    if (!id) {
      showToast("Invalid address ID.", "error");
      return;
    }

    try {
      const response = await api.delete(`/users/addresses/${id}`);
      console.log("Delete Address Response:", response.data); // Debug
      if (response.data.success) {
        setAddresses(
          addresses.filter((addr) => addr._id !== id && addr.id !== id)
        );
        showToast("Address deleted successfully.", "success");
      } else {
        showToast(
          response.data.message || "Failed to delete address.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      showToast(
        error.response?.data?.message ||
          "An error occurred while deleting the address.",
        "error"
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row px-6 sm:px-8 lg:px-20 py-6 sm:py-8 lg:py-20 bg-gray-100 min-h-screen">
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
        type={toast.type}
        duration={5000}
      />

      {/* Left Column: Add/Edit Address Form & List of Saved Addresses */}
      <div className="md:w-1/2 pr-0 md:pr-8">
        {/* Add/Edit Address Form */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 quantico-bold-italic uppercase text-black">
          {isEditing ? "Edit Address" : "Add New Address"}
        </h2>

        <form
          className="space-y-6"
          onSubmit={isEditing ? handleUpdateAddress : handleAddAddress}
          noValidate
        >
          {/* Street Address */}
          <div>
            <label
              className="block pt-sans-regular mb-2 text-sm sm:text-base"
              htmlFor="street"
            >
              Street Address
            </label>
            <input
              type="text"
              id="street"
              name="street"
              className={`w-full p-3 border outline-none pt-sans-regular rounded ${
                errors.street ? "border-red-500" : "border-black"
              } focus:ring-2 focus:ring-[#0821D2] transition`}
              value={formData.street}
              onChange={handleChange}
              placeholder="Enter street address"
            />
            {errors.street && (
              <p className="text-red-500 text-sm mt-1">{errors.street}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label
              className="block pt-sans-regular mb-2 text-sm sm:text-base"
              htmlFor="city"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className={`w-full p-3 border outline-none pt-sans-regular rounded ${
                errors.city ? "border-red-500" : "border-black"
              } focus:ring-2 focus:ring-[#0821D2] transition`}
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label
              className="block pt-sans-regular mb-2 text-sm sm:text-base"
              htmlFor="state"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className={`w-full p-3 border outline-none pt-sans-regular rounded ${
                errors.state ? "border-red-500" : "border-black"
              } focus:ring-2 focus:ring-[#0821D2] transition`}
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state}</p>
            )}
          </div>

          {/* ZIP Code */}
          <div>
            <label
              className="block pt-sans-regular mb-2 text-sm sm:text-base"
              htmlFor="zip"
            >
              ZIP Code
            </label>
            <input
              type="text"
              id="zip"
              name="zip"
              maxLength="10"
              className={`w-full p-3 border outline-none pt-sans-regular rounded ${
                errors.zip ? "border-red-500" : "border-black"
              } focus:ring-2 focus:ring-[#0821D2] transition`}
              value={formData.zip}
              onChange={handleChange}
              placeholder="Enter ZIP code"
            />
            {errors.zip && (
              <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
            )}
          </div>

          {/* Country */}
          <div>
            <label
              className="block pt-sans-regular mb-2 text-sm sm:text-base"
              htmlFor="country"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              className={`w-full p-3 border outline-none pt-sans-regular rounded ${
                errors.country ? "border-red-500" : "border-black"
              } focus:ring-2 focus:ring-[#0821D2] transition`}
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter country"
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row sm:justify-end space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-[#0821D2] quantico-bold-italic text-xl transition duration-300 ease-in-out px-6 py-3 rounded ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-gradient-to-r from-black to-[#0821D2] text-white hover:shadow-lg"
              }`}
            >
              {isSubmitting
                ? isEditing
                  ? "Updating..."
                  : "Adding..."
                : isEditing
                ? "Update Address"
                : "Add Address"}
            </button>
            {isEditing && (
              <button
                type="button"
                className="shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-[#0821D2] quantico-bold-italic text-xl transition duration-300 ease-in-out px-6 py-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentAddressId(null);
                  setFormData({
                    street: "",
                    city: "",
                    state: "",
                    zip: "",
                    country: "",
                  });
                  setErrors({});
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Divider */}
        <div className="my-8 border-t"></div>

        {/* List of Saved Addresses */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 quantico-bold-italic uppercase text-black">
            Your Saved Addresses
          </h3>
          {fetchError && <p className="text-red-500 mb-4">{fetchError}</p>}
          {addresses.length === 0 ? (
            <div className="text-black pt-sans-regular">
              You have no saved addresses.
              <div className="flex justify-center items-center mt-4">
                <Link to="/products">
                  <button className="quantico-bold-italic text-xl bg-gradient-to-r from-black to-[#0821D2] text-white py-3 px-6 sm:px-8 lg:px-10 font-bold focus:outline-none hover:shadow-lg transition duration-300 ease-in-out rounded">
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <ul className="space-y-6">
              {addresses.map((addressItem, index) => {
                // Ensure _id or id exists; fallback to index if necessary
                const key =
                  addressItem._id || addressItem.id || `address-${index}`;
                return (
                  <li
                    key={key}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center border p-4 rounded bg-white shadow-md"
                  >
                    <div className="space-y-2">
                      <p className="pt-sans-regular">
                        <span className="font-semibold">Street:</span>{" "}
                        {addressItem.street}
                      </p>
                      <p className="pt-sans-regular">
                        <span className="font-semibold">City:</span>{" "}
                        {addressItem.city}
                      </p>
                      <p className="pt-sans-regular">
                        <span className="font-semibold">State:</span>{" "}
                        {addressItem.state}
                      </p>
                      <p className="pt-sans-regular">
                        <span className="font-semibold">ZIP:</span>{" "}
                        {addressItem.zip}
                      </p>
                      <p className="pt-sans-regular">
                        <span className="font-semibold">Country:</span>{" "}
                        {addressItem.country}
                      </p>
                    </div>
                    <div className="flex flex-row space-x-4 mt-4 sm:mt-0">
                      <button
                        onClick={() => handleEditClick(addressItem)}
                        className="quantico-bold-italic text-lg bg-gradient-to-r from-black to-[#0821D2] text-white py-2 px-4 sm:px-6 px-6 rounded hover:shadow-lg transition duration-300 ease-in-out"
                      >
                        Edit
                      </button>
                      <div className="learn-more">
                        <button
                          onClick={() =>
                            handleDeleteAddress(
                              addressItem._id || addressItem.id
                            )
                          }
                          className="shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-[#0821D2] quantico-bold-italic text-lg transition duration-300 ease-in-out py-2 px-4 sm:px-6 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                          disabled={!addressItem._id && !addressItem.id}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Right Column: Image Placeholder */}
      <div className="md:w-1/2 mt-8 md:mt-0 flex items-center justify-center">
        <img
          src={address}
          alt="Address Illustration"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain rounded shadow-lg"
        />
      </div>
    </div>
  );
};

export default EditAddress;
