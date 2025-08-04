import { createAsyncThunk } from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthService from '@/src/api/services/AuthService';
import { RegisterUserType } from '@/src/api/types/authTypes';
import { logAppError, logAppEvent } from '@/src/utils/helpers/Logger';

type UserInfo = {
  email: string;
  password: string;
};

export const UserLoginThunk = createAsyncThunk(
  'auth/userLogin',
  async (userData: UserInfo, { rejectWithValue }) => {
    try {
      const { email, password } = userData;

      logAppEvent('UserLogin', email);

      const response = await AuthService.login(email, password);

      logAppEvent('UserLoginSuccess', email);

      return response;
    } catch (error) {
      logAppError('UserLoginError', error);
      return rejectWithValue('Failed to log in');
    }
  }
);

export const UserRefreshSessionThunk = createAsyncThunk(
  'auth/userRefreshSession',
  async (_, { rejectWithValue }) => {
    try {
      logAppEvent('UserRefreshSession');
      const token = await AsyncStorage.getItem('refreshToken');
      if (!token) {
        throw new Error('No refresh token found');
      }

      const response = await AuthService.refreshToken();
      logAppEvent('UserRefreshSessionSuccess');

      return response;
    } catch (error) {
      logAppError('UserRefreshSessionError', error);
      return rejectWithValue('login.session_expired');
    }
  }
);

export const UserVerifyEmailThunk = createAsyncThunk(
  'auth/userVerifyEmail',
  async (email: string, { rejectWithValue }) => {
    try {
      logAppEvent('UserVerifyEmail', email);
      const response = await AuthService.verifyEmail(email);

      return response;
    } catch (error) {
      logAppError('UserVerifyEmailError', error);
      return rejectWithValue('email.verification_failed');
    }
  }
);

export const UserRegisterThunk = createAsyncThunk(
  'auth/userRegister',
  async (userData: RegisterUserType, { rejectWithValue }) => {
    try {
      logAppEvent('UserRegister', userData.email);
      const response = await AuthService.register(userData);

      logAppEvent('UserRegisterSuccess', userData.email);
      return response;
    } catch (error) {
      logAppError('UserRegisterError', error);
      return rejectWithValue('registration.failed');
    }
  }
);
