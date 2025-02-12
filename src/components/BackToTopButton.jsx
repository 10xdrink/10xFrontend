// BackToTopButton.jsx
import React, { useState, useEffect } from 'react';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle visibility based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll smoothly to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        style={styles.button}
        aria-label="Back to top"
      >
        <span style={styles.text}><i class="fa-regular fa-circle-up"></i></span>
      </button>
    )
  );
};

const styles = {
  button: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '5px 12px',
    fontSize: '24px',
    cursor: 'pointer',
    borderRadius: '50%',
    border: '1px solid #0821D2',
    background: 'linear-gradient(to right, #FFFFFF, #E6E6E6)',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.3s ease-in-out',
    textTransform: 'uppercase',
  },
  text: {
    color: '#0821D2',
    fontFamily: 'Quantico, sans-serif',
    fontWeight: 'bold',
    fontSize: '24px',
    display: 'block',
  },
};

export default BackToTopButton;
