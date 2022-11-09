import React from 'react';
import { LayoutRouteProps, Navigate, Outlet } from 'react-router-dom';

type ProtectedRouteProps = LayoutRouteProps & {
  isAuthed: boolean;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthed }) =>
  isAuthed ? <Outlet /> : <Navigate to="*" />;

export default ProtectedRoute;
