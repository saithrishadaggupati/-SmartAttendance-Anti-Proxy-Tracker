import React from 'react';
import { Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles?: ('admin' | 'faculty' | 'student')[];
}

/**
 * Developer Bypass Route: Temporarily skips all Firebase auth checks
 * so you can log right into your student scanner or admin dash.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  // We completely skip authentication checks and let the layout render perfectly
  return <Outlet />;
};
