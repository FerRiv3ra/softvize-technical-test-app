import { combineReducers } from "@reduxjs/toolkit";

import appConfigReducer from "./appConfig/appConfig";
// import authReducer from './auth/authSlice';
// import propertiesReducer from './properties/propertiesSlice';
// import tenantReducer from './tenant/tenantSlice';

const rootReducer = combineReducers({
  appConfig: appConfigReducer,
  //   auth: authReducer,
  // connections:
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
