// src/components/FAQs.jsx

import React, { useState, useEffect } from "react";
import FaqUp from "../assets/FaqUp.png";
import FaqDown from "../assets/FaqDown.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import api from '../utils/api'; // Import the Axios instance

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await api.get('/faqs'); // Use Axios instance
        console.log('Full Response:', response);

        // Check if response data is in expected format
        if (response.data && response.data.success) {
          setFaqs(response.data.data);
        } else {
          throw new Error(response.data.message || 'Failed to fetch FAQs.');
        }
      } catch (err) {
        // Handle Axios errors
        if (err.response) {
          // Server responded with a status other than 2xx
          console.error('API Response Error:', err.response.status, err.response.data);
          setError(err.response.data.message || 'Failed to fetch FAQs.');
        } else if (err.request) {
          // Request was made but no response received
          console.error('No response received:', err.request);
          setError('No response from server. Please try again later.');
        } else {
          // Something else happened
          console.error('Error:', err.message);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  return (
    <div className="faq-component pt-28 pb-20 relative bg-cover bg-center">
      {/* Top Image */}
      <div className="-mb-20 absolute">
        <img src={FaqUp} alt="FAQ Top Decoration" className="w-full h-auto" />
      </div>

      {/* FAQ Content */}
      <div className="py-16 px-8 w-3/5 mx-auto rounded-md relative z-10">
        {/* FAQ Title */}
        <h1 className="text-6xl font-bold quantico-bold mb-8">FAQS</h1>
        <p className="text-lg mb-12 pt-sans-regular">
          Find answers to commonly asked questions about our product, its benefits, and usage.
        </p>

        {/* Loading State */}
        {loading && (
          <div className="text-center">
            <p className="text-xl">Loading FAQs...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center text-red-500">
            <p className="text-xl">Error: {error}</p>
          </div>
        )}

        {/* Accordion */}
        {!loading && !error && (
          <div className="space-y-4">
            {faqs.length === 0 ? (
              <p className="text-center text-lg">No FAQs available at the moment.</p>
            ) : (
              faqs.map((faq, index) => (
                <div
                  key={faq._id}
                  className="bg-white mt-2 p-5 rounded-lg border-b border-gray-300"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer py-4"
                    onClick={() => toggleAccordion(index)}
                  >
                    <h3 className="text-xl font-semibold pt-sans-bold">
                      {faq.question}
                    </h3>
                    <span className={`text-xl transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                      <FontAwesomeIcon icon={openIndex === index ? faChevronUp : faChevronDown} />
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      openIndex === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="pb-4 text-base">
                      <p>{faq.answer}</p>
                      {faq.categories && faq.categories.length > 0 && (
                        <div className="mt-2">
                          <span className="font-semibold">Categories:</span>
                          <ul className="list-disc list-inside">
                            {faq.categories.map((category) => (
                              <li key={category._id}>{category.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Still Have Questions Section */}
        <div className="mt-16 p-8 faq-hero text-white pt-24 pb-24 text-center">
          <h2 className="text-5xl font-bold mb-4 quantico-bold-italic">
            STILL HAVE QUESTIONS?
          </h2>
          <p className="mb-6 pt-sans-regular text-xl">
            Contact us for more information.
          </p>
          <button className="text-xl pr-8 bg-transparent quantico-bold-italic border border-white text-white font-bold rounded-sm focus:outline-none hover:shadow-lg shadow-[0px_2px_8px_rgba(255,255,255,0.8)] transition-shadow duration-300 ease-in-out py-3 px-8">
            CONTACT
          </button>
        </div>
      </div>

      {/* Bottom Image */}
      <div className="absolute bottom-0 right-0">
        <img src={FaqDown} alt="FAQ Bottom Decoration" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default FAQs;
