import React from 'react';
import { LayoutRouteProps, Route } from 'react-router-dom';
import { NotFoundPage } from 'pages/NotFoundPage';

type ProtectedRouteProps = LayoutRouteProps & {
  isAuthed: boolean;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element: RenderedPage,
  isAuthed,
  ...rest
}) => <Route {...rest} element={isAuthed ? RenderedPage : <NotFoundPage />} />;

export default ProtectedRoute;
