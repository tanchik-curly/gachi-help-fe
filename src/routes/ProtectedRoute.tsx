import React from 'react';
import { LayoutRouteProps, Navigate, Outlet, Route } from 'react-router-dom';
import { NotFoundPage } from 'pages/NotFoundPage';

type ProtectedRouteProps = LayoutRouteProps & {
  isAuthed: boolean;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthed }) =>
  isAuthed ? <Outlet /> : <Navigate to="*" />;

export default ProtectedRoute;
