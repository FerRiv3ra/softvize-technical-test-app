import React, { useMemo } from 'react';

import { useSelector } from 'react-redux';

import { authSelectors } from '../store/auth/authSlice';
import MainNavigator from './app/AppNavigator';
import AuthNavigator from './app/AuthNavigator';

export default function AppNavigation() {
  const isAuthenticated = useSelector(authSelectors.selectIsAuthenticated);
  const user = useSelector(authSelectors.selectCurrentUser);
  const refreshStatus = useSelector(authSelectors.selectAuthRefreshStatus);

  const verifyAuth = useMemo(() => {
    if (!isAuthenticated) return false;
    if (!user) return false;
    if (refreshStatus === 'error') return false;

    return true;
  }, [isAuthenticated, user, refreshStatus]);

  if (verifyAuth) {
    return <MainNavigator />;
  }

  return <AuthNavigator />;
}
