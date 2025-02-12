// src/pages/ReviewsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router
import { toast } from 'react-toastify'; // Optional: For notifications

const ReviewsPage = () => {
  const { productId } = useParams(); // Assuming the route is /reviews/:productId
  const [currentReview, setCurrentReview] = useState(null); // If the user has already submitted a review

  useEffect(() => {
    const fetchUserReview = async () => {
      try {
        const res = await axios.get(`/api/reviews/product/${productId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust as per your auth setup
          },
        });
        const userReview = res.data.data.find(
          (review) => review.user._id === JSON.parse(localStorage.getItem('user'))._id
        );
        if (userReview) {
          setCurrentReview(userReview);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleReviewSubmit = (newReview) => {
    if (currentReview) {
      setCurrentReview(newReview);
    } else {
      setCurrentReview(newReview);
    }
    toast.success('Review submitted successfully.');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ReviewForm
        productId={productId}
        existingReview={currentReview}
        onReviewSubmit={handleReviewSubmit}
      />
      <ReviewList productId={productId} />
    </div>
  );
};

export default ReviewsPage;
