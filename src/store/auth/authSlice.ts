import { createSlice } from '@reduxjs/toolkit';

import { EmailAvailabilityEnum } from '@/src/api/types/authTypes';
import * as asyncAuthActions from './authActions';
import * as AuthSelectors from './authSelectors';
import { AuthSliceInitialStateType } from './authSlice.types';

const initialState: AuthSliceInitialStateType = {
  authRefreshStatus: 'idle',
  errorMessage: null,
  isEmailAvailable: EmailAvailabilityEnum.IDLE,
  loading: 'idle',
  isLogged: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    ResetIndifierValidation: state => {
      state.isEmailAvailable = EmailAvailabilityEnum.IDLE;
    },
    ClearAuthError: state => {
      state.errorMessage = null;
    },
    clearState: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder
      // Authentication actions
      .addCase(asyncAuthActions.UserLoginThunk.pending, state => {
        state.loading = 'loading';
      })
      .addCase(asyncAuthActions.UserLoginThunk.fulfilled, (state, action) => {
        state.loading = 'success';
        state.isLogged = true;
        state.user = action.payload;
        state.authRefreshStatus = 'success';
      })
      .addCase(asyncAuthActions.UserLoginThunk.rejected, (state, action) => {
        state.loading = 'error';
        state.errorMessage = (action.payload as string) || 'login.failed';
        state.isLogged = false;
        state.authRefreshStatus = 'error';
      })
      // Refresh session actions
      .addCase(asyncAuthActions.UserRefreshSessionThunk.pending, state => {
        state.authRefreshStatus = 'loading';
      })
      .addCase(asyncAuthActions.UserRefreshSessionThunk.fulfilled, state => {
        state.authRefreshStatus = 'success';
      })
      .addCase(
        asyncAuthActions.UserRefreshSessionThunk.rejected,
        (state, action) => {
          state.authRefreshStatus = 'error';
          state.errorMessage =
            (action.payload as string) || 'login.session_expired';
          state.isLogged = false;
        }
      )
      // Email verification actions
      .addCase(asyncAuthActions.UserVerifyEmailThunk.pending, state => {
        state.loading = 'loading';
      })
      .addCase(
        asyncAuthActions.UserVerifyEmailThunk.fulfilled,
        (state, action) => {
          state.loading = 'success';
          state.isEmailAvailable = action.payload;
        }
      )
      .addCase(
        asyncAuthActions.UserVerifyEmailThunk.rejected,
        (state, action) => {
          state.loading = 'error';
          state.errorMessage =
            (action.payload as string) || 'email.verification_failed';
        }
      )
      // Registration actions
      .addCase(asyncAuthActions.UserRegisterThunk.pending, state => {
        state.loading = 'loading';
      })
      .addCase(
        asyncAuthActions.UserRegisterThunk.fulfilled,
        (state, action) => {
          state.loading = 'success';
          state.isLogged = true;
          state.user = action.payload;
        }
      )
      .addCase(asyncAuthActions.UserRegisterThunk.rejected, (state, action) => {
        state.loading = 'error';
        state.errorMessage =
          (action.payload as string) || 'registration.failed';
        state.isLogged = false;
        state.user = null;
      });
  },
});

export const authActions = {
  ...authSlice.actions,
  ...asyncAuthActions,
};
export { AuthSelectors as authSelectors };

export default authSlice.reducer;
