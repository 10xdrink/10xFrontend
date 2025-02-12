import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Optional: Add more detailed logging for debugging
  useEffect(() => {
    console.log('ProtectedRoute - User State:', user);
  }, [user]);

  // Enhanced loading state (add your custom loader here)
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div> {/* Replace with a spinner or animation */}
      </div>
    );
  }

  // Token validation logic if needed
  const token = localStorage.getItem('authToken');
  if (requireAuth && (!user || !token)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!requireAuth && user) {
    return <Navigate to="/user-dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
