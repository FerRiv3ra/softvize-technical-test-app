import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

// Tracks the loading state of authentication ('idle', 'pending', 'succeeded', 'failed')
export const selectAuthLoading = (state: RootState) => state.auth.loading;
// Retrieves the current user object from the authentication state
export const selectCurrentUser = (state: RootState) => state.auth.user;
// Checks if the user is authenticated
export const selectIsAuthenticated = (state: RootState) => state.auth.isLogged;
// Retrieves the error message from the authentication state
export const selectAuthErrorMessage = (state: RootState) =>
  state.auth.errorMessage;
// Checks if the email is available
export const selectIsEmailAvailable = (state: RootState) =>
  state.auth.isEmailAvailable;
// Retrieves the authentication refresh status
export const selectAuthRefreshStatus = (state: RootState) =>
  state.auth.authRefreshStatus;

// Convenience selector for checking if authentication is currently loading
export const isAuthLoading = createSelector(
  [selectAuthLoading],
  loading => loading === 'loading'
);
