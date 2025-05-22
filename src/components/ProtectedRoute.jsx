// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    // Show a loading spinner or placeholder while auth state is being determined
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login, save current location to redirect back after login
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render the children (protected page)
  return children;
};

export default ProtectedRoute;
