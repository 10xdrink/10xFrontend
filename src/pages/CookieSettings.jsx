import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

const CookieSettings = () => {
  // Initialize cookie consent state from localStorage if available
  const [cookieConsent, setCookieConsent] = useState({
    necessary: true, // Always required
    functional: localStorage.getItem('cookie_functional') === 'true',
    analytics: localStorage.getItem('cookie_analytics') === 'true',
    marketing: localStorage.getItem('cookie_marketing') === 'true',
  });

  // Save settings when they change
  useEffect(() => {
    // Necessary cookies are always enabled
    localStorage.setItem('cookie_necessary', 'true');
    localStorage.setItem('cookie_functional', cookieConsent.functional.toString());
    localStorage.setItem('cookie_analytics', cookieConsent.analytics.toString());
    localStorage.setItem('cookie_marketing', cookieConsent.marketing.toString());
  }, [cookieConsent]);

  const handleToggle = (type) => {
    if (type === 'necessary') return; // Cannot toggle necessary cookies
    setCookieConsent(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleAcceptAll = () => {
    setCookieConsent({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    });
  };

  const handleRejectAll = () => {
    setCookieConsent({
      necessary: true, // Always required
      functional: false,
      analytics: false,
      marketing: false
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Helmet>
        <title>Cookie Settings | 10X</title>
        <meta name="description" content="Manage your cookie preferences for the 10X website" />
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-6 text-center">Cookie Settings</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="mb-6">
          We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. 
          By clicking "Accept All", you consent to our use of cookies. You can manage your preferences below.
        </p>
        
        <div className="mb-8">
          <div className="flex justify-end space-x-4 mb-6">
            <button 
              onClick={handleRejectAll}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              Reject All
            </button>
            <button 
              onClick={handleAcceptAll}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Accept All
            </button>
          </div>
          
          {/* Cookie Type Toggles */}
          <div className="space-y-6">
            {/* Necessary Cookies */}
            <div className="p-4 border rounded-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">Necessary Cookies</h3>
                <div className="relative inline-block w-12 h-6 bg-gray-200 rounded-full cursor-not-allowed">
                  <div className="absolute left-1 top-1 bg-blue-600 w-4 h-4 rounded-full transition-transform transform translate-x-6"></div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                These cookies are essential for the website to function properly. They cannot be disabled.
              </p>
            </div>
            
            {/* Functional Cookies */}
            <div className="p-4 border rounded-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">Functional Cookies</h3>
                <button 
                  onClick={() => handleToggle('functional')}
                  className={`relative inline-block w-12 h-6 ${cookieConsent.functional ? 'bg-blue-600' : 'bg-gray-200'} rounded-full transition-colors`}
                >
                  <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform ${cookieConsent.functional ? 'translate-x-6' : ''}`}></div>
                </button>
              </div>
              <p className="text-sm text-gray-600">
                These cookies enable personalized features like remembering your preferences and settings.
              </p>
            </div>
            
            {/* Analytics Cookies */}
            <div className="p-4 border rounded-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">Analytics Cookies</h3>
                <button 
                  onClick={() => handleToggle('analytics')}
                  className={`relative inline-block w-12 h-6 ${cookieConsent.analytics ? 'bg-blue-600' : 'bg-gray-200'} rounded-full transition-colors`}
                >
                  <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform ${cookieConsent.analytics ? 'translate-x-6' : ''}`}></div>
                </button>
              </div>
              <p className="text-sm text-gray-600">
                These cookies help us understand how visitors interact with our website, helping us improve our site and services.
              </p>
            </div>
            
            {/* Marketing Cookies */}
            <div className="p-4 border rounded-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">Marketing Cookies</h3>
                <button 
                  onClick={() => handleToggle('marketing')}
                  className={`relative inline-block w-12 h-6 ${cookieConsent.marketing ? 'bg-blue-600' : 'bg-gray-200'} rounded-full transition-colors`}
                >
                  <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform ${cookieConsent.marketing ? 'translate-x-6' : ''}`}></div>
                </button>
              </div>
              <p className="text-sm text-gray-600">
                These cookies are used to track visitors across websites to display relevant advertisements.
              </p>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">More Information</h2>
        <p className="mb-4">
          For more detailed information about the cookies we use, please see our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>.
        </p>
        <p className="mb-4">
          If you have any questions about our cookie policy, please contact us at privacy@10xdrink.com.
        </p>
      </div>
    </div>
  );
};

export default CookieSettings;
