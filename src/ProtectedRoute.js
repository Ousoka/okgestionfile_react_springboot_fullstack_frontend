// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const OKData = localStorage.getItem('OKData'); // Check for user data

    return OKData ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
