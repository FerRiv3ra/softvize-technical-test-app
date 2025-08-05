import { combineReducers } from '@reduxjs/toolkit';

import appConfigReducer from './appConfig/appConfig';
import authReducer from './auth/authSlice';
import connectionsReducer from './connections/connectionsSlice';

const rootReducer = combineReducers({
  appConfig: appConfigReducer,
  auth: authReducer,
  connections: connectionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
