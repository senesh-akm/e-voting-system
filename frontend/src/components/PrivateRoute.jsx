import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles, userRole }) => {
  // Check if the user's role matches any allowed roles for this route
  if (allowedRoles.includes(userRole)) {
    return children;
  } else {
    // Redirect to login or unauthorized page if the role does not match
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
