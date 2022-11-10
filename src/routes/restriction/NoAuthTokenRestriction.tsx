import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Routes } from 'routes/routesConfig';
import { ACCESS_TOKEN, getAccessToken } from 'utils/authTokens';
import LocalStorage from 'utils/localStorageSingleton';

const NoAuthTokenRestriction: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isAuthorized, setIsAuthorized] = useState(!!getAccessToken());
  console.log(isAuthorized);
  useEffect(() => {
    const eventId = LocalStorage.subscribe((key: string, value: string) => {
      if (!value && key === ACCESS_TOKEN) {
        setIsAuthorized(false);
      }
    });

    return () => {
      LocalStorage.unsubscribe(eventId);
    };
  });

  return isAuthorized ? <>{children}</> : <Navigate to={Routes.Root} />;
};

export default NoAuthTokenRestriction;
