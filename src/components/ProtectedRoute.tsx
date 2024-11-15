// src/components/ProtectedRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const authData = localStorage.getItem('authData');

  if (!authData) {
    return <Navigate to="/se-connecter" />;
  }

  return children;
};

export default ProtectedRoute;
