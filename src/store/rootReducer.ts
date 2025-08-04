import { combineReducers } from '@reduxjs/toolkit';

import appConfigReducer from './appConfig/appConfig';
import authReducer from './auth/authSlice';

const rootReducer = combineReducers({
  appConfig: appConfigReducer,
  auth: authReducer,
  // connections:
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
