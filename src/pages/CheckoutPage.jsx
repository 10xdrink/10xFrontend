// src/components/CheckoutPage.jsx

import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { convertAndFormatPrice, convertUsdToInr } from '../utils/currencyUtils';
import { toast } from "react-hot-toast";
import { FaMoneyBill, FaCreditCard, FaPaypal } from "react-icons/fa";

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // Added phone field
    country: "",
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
  });

  const [errors, setErrors] = useState({});
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Select one...");
  const [countrySearchTerm, setCountrySearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentMethodOpen, setIsPaymentMethodOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod"); // Default to COD
  const [paymentMethodSearchTerm, setPaymentMethodSearchTerm] = useState("");

  // Coupon State
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  const finalTotal = cartTotal - discount;

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (formerly Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine State",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  // New State Variables for Saved Addresses
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedSavedAddressId, setSelectedSavedAddressId] = useState("");
  const [isSavedAddressOpen, setIsSavedAddressOpen] = useState(false);
  const [savedAddressSearchTerm, setSavedAddressSearchTerm] = useState("");
  const [saveAddress, setSaveAddress] = useState(false); // State to determine if address should be saved

  useEffect(() => {
    const fetchSavedAddresses = async () => {
      try {
        const response = await api.get("/users/addresses");
        if (response.data.success) {
          setSavedAddresses(response.data.data);
        } else {
          console.error("Failed to fetch saved addresses:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching saved addresses:", error);
      }
    };

    fetchSavedAddresses();
  }, []);

  const handleSelectSavedAddress = (addressId) => {
    const selectedAddress = savedAddresses.find((addr) => addr._id === addressId);
    if (selectedAddress) {
      setSelectedSavedAddressId(addressId);
      setFormData({
        ...formData,
        streetAddress: selectedAddress.street,
        city: selectedAddress.city,
        state: selectedAddress.state,
        zip: selectedAddress.zip,
        phone: selectedAddress.phone || formData.phone, // Include phone if available
      });
      setSelectedCountry(selectedAddress.country);
      setSelectedSavedAddressId(addressId);
      // Remove the reference to the undefined setIsUsingNewAddress
    }
  };

  const handleUseNewAddress = () => {
    setSelectedSavedAddressId("");
    setFormData({
      name: "",
      email: "",
      country: "",
      streetAddress: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
    });
    setSaveAddress(false); // Reset saveAddress when using a new address
  };

  const handleSaveAddressChange = (e) => {
    setSaveAddress(e.target.checked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // If user starts editing fields manually, deselect any selected saved address
    if (selectedSavedAddressId) {
      setSelectedSavedAddressId("");
    }
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setFormData((prev) => ({ ...prev, country }));
    setIsCountryOpen(false);
    setCountrySearchTerm("");
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    setIsPaymentMethodOpen(false);
    setPaymentMethodSearchTerm("");
  };

  const handleCouponApply = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code.");
      return;
    }

    if (cartTotal <= 0) {
      setCouponError(
        "Order total must be greater than zero to apply a coupon."
      );
      return;
    }

    setIsApplyingCoupon(true);
    setCouponError("");

    try {
      const response = await api.post("/coupons/apply", {
        code: couponCode.trim(),
        orderTotal: cartTotal,
      });

      if (response.data.success) {
        setDiscount(response.data.discount);
        setIsCouponApplied(true);
        alert("Coupon applied successfully!");
      } else {
        setCouponError(response.data.message || "Invalid coupon code.");
      }
    } catch (error) {
      console.error("Coupon Application Failed:", error);
      setCouponError(
        error.response?.data?.message ||
          "Failed to apply coupon. Please try again."
      );
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10,15}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.country || formData.country === "Select one...")
      newErrors.country = "Country is required.";
    if (!formData.streetAddress.trim())
      newErrors.streetAddress = "Street address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";

    // Update for Indian ZIP code validation (6-digit number)
    if (!/^\d{6}$/.test(formData.zip))
      newErrors.zip = "ZIP code must be a 6-digit number.";

    if (!selectedPaymentMethod)
      newErrors.paymentMethod = "Payment method is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        phone: formData.phone, // Add phone at top level
        shippingAddress: {
          street: formData.streetAddress,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: selectedCountry, // Use selectedCountry instead of formData.country
          phone: formData.phone, // Add phone to shipping address
        },
        billingAddress: {
          street: formData.streetAddress,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: selectedCountry, // Use selectedCountry instead of formData.country
          phone: formData.phone, // Add phone to billing address
        },
        paymentMethod: selectedPaymentMethod,
        couponCode: isCouponApplied ? couponCode.trim() : "",
        items: cartItems.map((item) => ({
          product:
            typeof item.product === "string"
              ? item.product
              : item.product._id,
          variant: item.variant,
          packaging: item.packaging,
          quantity: item.quantity,
        })),
      };

      console.log("Order Data:", orderData);

      const response = await api.post("/orders", orderData);

      if (response.data.success) {
        if (selectedPaymentMethod === "cod") {
          if (saveAddress) {
            // Save the new address
            await api.post("/users/addresses", {
              name: formData.name,
              email: formData.email,
              street: formData.streetAddress,
              city: formData.city,
              state: formData.state,
              zip: formData.zip,
              country: formData.country,
              phone: formData.phone,
            });
          }

          clearCart();
          navigate("/thank-you");
        } else if (selectedPaymentMethod === "billdesk") {
            // Get the order ID from the response
            const orderId = response.data.data._id || response.data.data.order?._id;
            
            if (!orderId) {
              console.error("Order ID not found in response:", response.data);
              alert("Could not retrieve order information. Please try again.");
              return;
            }
            
            // Save the address if requested
            if (saveAddress) {
              try {
                await api.post("/users/addresses", {
                  name: formData.name,
                  email: formData.email,
                  street: formData.streetAddress,
                  city: formData.city,
                  state: formData.state,
                  zip: formData.zip,
                  country: selectedCountry,
                  phone: formData.phone,
                });
              } catch (addressError) {
                console.error("Failed to save address:", addressError);
              }
            }
            
            // Initialize BillDesk payment
            try {
              const billDeskResponse = await api.post(`/payments/billdesk/initialize/${orderId}`);
              
              if (billDeskResponse.data.success) {
                const paymentData = billDeskResponse.data.data;
                console.log("BillDesk payment initialized successfully:", paymentData);
                
                // Create a form to submit to BillDesk
                console.log('Creating form for BillDesk payment...');
                
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = paymentData.paymentUrl;
                
                // Add the message parameter
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = 'msg';
                input.value = paymentData.msg;
                form.appendChild(input);
                
                // Add the form to the body
                document.body.appendChild(form);
                
                // Submit the form to redirect to BillDesk
                console.log('Submitting payment form to BillDesk...');
                console.log('Payment URL:', paymentData.paymentUrl);
                console.log('Message:', paymentData.msg);
                form.submit();
                
                // BillDesk will redirect back to our return URL after payment
              } else {
                alert("Failed to initialize payment. Please try again.");
              }
            } catch (paymentError) {
              console.error("Payment initialization failed:", paymentError);
              alert("Payment initialization failed. Please try again.");
            }
        }
      } else {
        console.error("Unexpected response structure:", response.data);
        alert("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Order Creation Failed:", error);
      if (error.response && error.response.data) {
        const serverMessage =
          error.response.data.message ||
          "An error occurred while placing the order.";
        alert(serverMessage);
      } else {
        console.error("Network or server error:", error.message);
        alert("A network error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(countrySearchTerm.toLowerCase())
  );

  const paymentMethods = [
    { id: "cod", name: "Cash on Delivery", icon: <FaMoneyBill /> },
    { id: "billdesk", name: "BillDesk", icon: <FaCreditCard /> },
  ];

  const filteredPaymentMethods = paymentMethods.filter((method) =>
    method.name.toLowerCase().includes(paymentMethodSearchTerm.toLowerCase())
  );

  // Geolocation and Reverse Geocoding
  const handleDetectLocation = async () => {
    if ("geolocation" in navigator) {
      setIsDetectingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const data = await getAddressFromCoordinates(latitude, longitude);

            // Update formData with the obtained address
            setFormData((prev) => ({
              ...prev,
              streetAddress: data.locality || data.principalSubdivision || "",
              city: data.city || "",
              state: data.principalSubdivision || "",
              zip: data.postcode || "",
              country: data.countryName || "",
            }));

            setSelectedCountry(data.countryName || "Select one...");
          } catch (error) {
            console.error("Reverse Geocoding Failed:", error);
            alert("Failed to retrieve address. Please try again.");
          } finally {
            setIsDetectingLocation(false);
          }
        },
        (error) => {
          console.error("Geolocation Error:", error);
          alert("Failed to retrieve location. Please allow location access.");
          setIsDetectingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  async function getAddressFromCoordinates(latitude, longitude) {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    const data = await response.json();
    return data;
  }

  const placeOrder = async () => {
    if (!validateForm()) {
      return;
    }

    // Prepare order data
    const orderData = {
      phone: formData.phone, // Add phone at top level
      shippingAddress: {
        street: formData.streetAddress,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: selectedCountry, // Use selectedCountry instead of formData.country
        phone: formData.phone, // Add phone to shipping address
      },
      billingAddress: {
        street: formData.streetAddress,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: selectedCountry, // Use selectedCountry instead of formData.country
        phone: formData.phone, // Add phone to billing address
      },
      paymentMethod: selectedPaymentMethod,
      couponCode: isCouponApplied ? couponCode.trim() : "",
      items: cartItems.map((item) => ({
        product:
          typeof item.product === "string"
            ? item.product
            : item.product._id,
        variant: item.variant,
        packaging: item.packaging,
        quantity: item.quantity,
      })),
    };

    try {
      setIsProcessing(true);
      console.log('Submitting order with data:', orderData);
      const response = await api.post('/orders', orderData);
      
      if (response.data.success) {
        // Save address if requested
        if (saveAddress) {
          try {
            await api.post("/users/addresses", {
              name: formData.name,
              email: formData.email,
              street: formData.streetAddress,
              city: formData.city,
              state: formData.state,
              zip: formData.zip,
              country: selectedCountry,
              phone: formData.phone,
            });
          } catch (addressError) {
            console.error("Failed to save address:", addressError);
          }
        }
        
        const orderId = response.data.data._id;
        
        // Handle different payment methods
        if (selectedPaymentMethod === 'billdesk') {
          // For BillDesk, navigate to the BillDesk payment component
          // DO NOT clear cart here - it will be cleared after successful payment
          navigate(`/payment/billdesk/${orderId}`);
        } else if (selectedPaymentMethod === 'cod') {
          // For Cash on Delivery, redirect to thank you page
          clearCart();
          toast.success('Order placed successfully!');
          navigate('/thank-you');
        }
      } else {
        toast.error(response.data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.response?.data?.message || 'Failed to process payment');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row px-20 py-20 bg-gray-100 min-h-screen">
      <Helmet>
        <title>Checkout | 10X Energy Drink</title>
        <meta name="description" content="Complete your purchase of 10X energy drinks. Secure checkout process with multiple payment options." />
        <meta name="keywords" content="checkout, payment, 10X purchase, secure payment, energy drink order" />
      </Helmet>
      <div className="md:w-1/2 pr-8">
        <h2 className="text-5xl font-bold mb-6 quantico-bold-italic uppercase text-black">
          Complete Your Order:
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {/* Name Field */}
          <div>
            <label className="block pt-sans-regular mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`w-full p-3 border outline-none pt-sans-regular ${
                errors.name ? "border-red-500" : "border-black"
              }`}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block pt-sans-regular mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full p-3 border outline-none pt-sans-regular ${
                errors.email ? "border-red-500" : "border-black"
              }`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="block pt-sans-regular mb-1" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={`w-full p-3 border outline-none pt-sans-regular ${
                errors.phone ? "border-red-500" : "border-black"
              }`}
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* ============================
              Saved Address Selection
              ============================ */}
          {savedAddresses.length > 0 && (
            <div className="mb-6">
              <label
                className="block pt-sans-regular mb-2"
                htmlFor="savedAddress"
              >
                Saved Addresses
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full bg-white border border-black text-black py-3 px-4 pr-8 leading-tight text-left"
                  onClick={() => setIsSavedAddressOpen(!isSavedAddressOpen)}
                >
                  {selectedSavedAddressId
                    ? "Selected Saved Address"
                    : "Select a saved address or add a new one"}
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <i className="fa-solid fa-chevron-down"></i>
                  </span>
                </button>
                {isSavedAddressOpen && (
                  <div className="absolute z-10 w-full bg-white shadow-lg rounded-b border p-4 border-t-0 border-black">
                    <input
                      type="text"
                      placeholder="Search saved addresses..."
                      className="w-full p-4 border border-black mb-2 outline-none pt-sans-regular"
                      value={savedAddressSearchTerm}
                      onChange={(e) => setSavedAddressSearchTerm(e.target.value)}
                    />
                    <ul className="max-h-40 overflow-y-auto">
                      {savedAddresses
                        .filter((address) =>
                          `${address.street}, ${address.city}, ${address.state}, ${address.zip}, ${address.country}`
                            .toLowerCase()
                            .includes(
                              savedAddressSearchTerm.toLowerCase()
                            )
                        )
                        .map((address) => (
                          <li
                            key={address._id}
                            onClick={() => handleSelectSavedAddress(address._id)}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                          >
                            {address.street}, {address.city}, {address.state},{" "}
                            {address.zip}, {address.country}
                          </li>
                        ))}
                      {savedAddresses.filter((address) =>
                        `${address.street}, ${address.city}, ${address.state}, ${address.zip}, ${address.country}`
                          .toLowerCase()
                          .includes(savedAddressSearchTerm.toLowerCase())
                      ).length === 0 && (
                        <li className="p-2 text-gray-500">
                          No saved addresses found.
                        </li>
                      )}
                      <li
                        onClick={handleUseNewAddress}
                        className="p-2 hover:bg-gray-200 cursor-pointer border-t mt-2"
                      >
                        + Add a new address
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* If no saved addresses, show a message */}
          {savedAddresses.length === 0 && (
            <div className="mb-6">
              <p className="text-gray-700 mb-2">
                You have no saved addresses. Please add a new address below.
              </p>
            </div>
          )}

          {/* Payment Method Selection */}
          <div className="mb-6">
            <label
              className="block pt-sans-regular mb-2"
              htmlFor="paymentMethod"
            >
              Payment Method
            </label>
            <div className="relative">
              <button
                type="button"
                className="w-full bg-white border border-black text-black py-3 px-4 pr-8 leading-tight text-left"
                onClick={() => setIsPaymentMethodOpen(!isPaymentMethodOpen)}
              >
                {paymentMethods.find(
                  (method) => method.id === selectedPaymentMethod
                )?.name || "Select Payment Method"}
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <i className="fa-solid fa-chevron-down"></i>
                </span>
              </button>
              {isPaymentMethodOpen && (
                <div className="absolute z-10 w-full bg-white shadow-lg rounded-b border p-4 border-t-0 border-black">
                  <input
                    type="text"
                    placeholder="Search payment method..."
                    className="w-full p-4 border border-black mb-2 outline-none pt-sans-regular"
                    value={paymentMethodSearchTerm}
                    onChange={(e) => setPaymentMethodSearchTerm(e.target.value)}
                  />
                  <ul className="max-h-40 overflow-y-auto">
                    {filteredPaymentMethods.map((method) => (
                      <li
                        key={method.id}
                        onClick={() => handlePaymentMethodChange(method.id)}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                      >
                        {method.name}
                      </li>
                    ))}
                    {filteredPaymentMethods.length === 0 && (
                      <li className="p-2 text-gray-500">
                        No payment methods found.
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm mt-1">
                {errors.paymentMethod}
              </p>
            )}
          </div>

          {/* ============================
              Save Address Checkbox
              ============================ */}
          {!selectedSavedAddressId && (
            <div className="mb-6">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={saveAddress}
                  onChange={handleSaveAddressChange}
                />
                <span className="ml-2 text-gray-700">
                  Save this address for future use
                </span>
              </label>
            </div>
          )}

          {/* Coupon Code Section */}
          <div className="mb-6">
            <label className="block pt-sans-regular mb-2" htmlFor="coupon">
              Coupon Code
            </label>
            <div className="flex learn-more">
              <input
                type="text"
                id="coupon"
                name="coupon"
                className={`w-full p-3 border outline-none pt-sans-regular ${
                  couponError ? "border-red-500" : "border-black"
                }`}
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter your coupon code"
                disabled={isCouponApplied}
              />
              <button
                type="button"
                className={`shadow-[0_4px_10px_rgba(0,0,0,0.3)] border ml-4 border-[#0821D2] quantico-bold-italic text-xl transition duration-300 ease-in-out ${
                  isApplyingCoupon || isCouponApplied
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
                onClick={handleCouponApply}
                disabled={isApplyingCoupon || isCouponApplied}
              >
                {isCouponApplied
                  ? "Applied"
                  : isApplyingCoupon
                  ? "Applying..."
                  : "Apply"}
              </button>
            </div>
            {couponError && (
              <p className="text-red-500 text-sm mt-1">{couponError}</p>
            )}
            {isCouponApplied && (
              <p className="text-green-500 text-sm mt-1">
                Coupon applied! You saved {convertAndFormatPrice(discount)}.
              </p>
            )}
          </div>

          {/* Address Fields */}
          <div className="mb-6">
            <label className="block pt-sans-regular mb-2" htmlFor="country">
              Country
            </label>
            <div className="relative">
              <button
                type="button"
                className="w-full bg-white border border-black text-black py-3 px-4 pr-8 leading-tight text-left"
                onClick={() => setIsCountryOpen(!isCountryOpen)}
              >
                {selectedCountry}
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <i className="fa-solid fa-chevron-down"></i>
                </span>
              </button>
              {isCountryOpen && (
                <div className="absolute z-10 w-full bg-white shadow-lg rounded-b border p-4 border-t-0 border-black">
                  <input
                    type="text"
                    placeholder="Search country..."
                    className="w-full p-4 border border-black mb-2 outline-none pt-sans-regular"
                    value={countrySearchTerm}
                    onChange={(e) => setCountrySearchTerm(e.target.value)}
                  />
                  <ul className="max-h-40 overflow-y-auto">
                    {filteredCountries.map((country) => (
                      <li
                        key={country}
                        onClick={() => handleCountryChange(country)}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                      >
                        {country}
                      </li>
                    ))}
                    {filteredCountries.length === 0 && (
                      <li className="p-2 text-gray-500">No countries found.</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>

          {/* Street Address */}
          <div>
            <label
              className="block pt-sans-regular mb-1"
              htmlFor="streetAddress"
            >
              Street Address
            </label>
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              className={`w-full p-3 border outline-none pt-sans-regular ${
                errors.streetAddress ? "border-red-500" : "border-black"
              }`}
              value={formData.streetAddress}
              onChange={handleChange}
            />
            {errors.streetAddress && (
              <p className="text-red-500 text-sm mt-1">
                {errors.streetAddress}
              </p>
            )}
          </div>

          {/* City, State, ZIP */}
          <div className="flex space-x-4">
            <div className="w-1/3">
              <label className="block pt-sans-regular mb-1" htmlFor="city">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className={`w-full p-3 border outline-none pt-sans-regular ${
                  errors.city ? "border-red-500" : "border-black"
                }`}
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>
            <div className="w-1/3">
              <label className="block pt-sans-regular mb-1" htmlFor="state">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                className={`w-full p-3 border outline-none pt-sans-regular ${
                  errors.state ? "border-red-500" : "border-black"
                }`}
                value={formData.state}
                onChange={handleChange}
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">{errors.state}</p>
              )}
            </div>
            <div className="w-1/3">
              <label className="block pt-sans-regular mb-1" htmlFor="zip">
                ZIP Code
              </label>
              <input
                type="text"
                id="zip"
                name="zip"
                maxLength="6"
                className={`w-full p-3 border outline-none pt-sans-regular ${
                  errors.zip ? "border-red-500" : "border-black"
                }`}
                value={formData.zip}
                onChange={handleChange}
              />
              {errors.zip && (
                <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={placeOrder}
              disabled={isProcessing || cartItems.length === 0}
              className={`mt-4 quantico-bold-italic text-xl bg-gradient-to-r from-black to-[#0821D2] text-white py-3 px-8 font-bold focus:outline-none hover:shadow-lg transition duration-300 ease-in-out ${
                isProcessing || cartItems.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isProcessing ? "Processing..." : "Complete Purchase"}
            </button>

            {/* Detect My Location Button */}
            <div className="learn-more">
              <button
                type="button"
                onClick={handleDetectLocation}
                className={`mt-4 shadow-[0_4px_10px_rgba(0,0,0,0.3)] border ml-4 border-[#0821D2] quantico-bold-italic text-xl transition duration-300 ease-in-out ${
                  isDetectingLocation ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isDetectingLocation}
              >
                {isDetectingLocation
                  ? "Detecting Location..."
                  : "Detect My Location"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Right Side Cart Summary */}
      <div className="md:w-1/2 pl-8">
        <h2 className="text-3xl font-bold mb-6"></h2>
        <div className="bg-white p-8 shadow-lg">
          {cartItems.length === 0 ? (
            <div className="text-center text-black pt-sans-regular p-8">
              Your cart is empty.
              <div className="flex justify-center items-center mb-6 mt-2">
                <Link to={"/products"}>
                  <button className="quantico-bold-italic text-xl bg-gradient-to-r from-black to-[#0821D2] text-white py-3 px-8 font-bold focus:outline-none hover:shadow-lg transition duration-300 ease-in-out">
                    GO TO SHOP
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <div
                  key={`${
                    typeof item.product === "string"
                      ? item.product
                      : item.product._id
                  }-${item.variant}-${item.packaging}-${index}`}
                  className="flex justify-between items-center mb-4"
                >
                  <div className="flex items-center">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-28 h-auto object-cover mr-4"
                    />
                    <div>
                      <h3 className="nimbusL-bol text-2xl uppercase text-black">
                        {item.title}
                      </h3>
                      <p className="text-black mt-2 pt-sans-regular">
                        {item.variant}{" "}
                        <i className="fa-solid fa-angle-right"></i>{" "}
                        {item.packaging}
                      </p>
                      <span className="text-black mt-2 pt-sans-regular">
                        Quantity: {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="quantico-bold text-black">
                    {convertAndFormatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}

              {/* Coupon Discount Display */}
              {isCouponApplied && (
                <div className="flex justify-between font-bold text-lg mt-4">
                  <span className="nimbusL-bol uppercase">Discount</span>
                  <span className="quantico-bold text-red-500">
                    -{convertAndFormatPrice(discount)}
                  </span>
                </div>
              )}

              {/* Total Calculation */}
              <div className="flex justify-between font-bold text-lg mt-2 border-t pt-4">
                <span className="nimbusL-bol uppercase">Total</span>
                <span className="quantico-bold text-black">
                  {convertAndFormatPrice(finalTotal)}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex justify-end mt-12">
                <Link to="/products" className="mr-4">
                  <div className="learn-more">
                    <button
                      className={`shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-[#0821D2] quantico-bold-italic text-xl transition duration-300 ease-in-out ${
                        cartItems.length === 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      type="button"
                      disabled={cartItems.length === 0}
                    >
                      Cancel
                    </button>
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
