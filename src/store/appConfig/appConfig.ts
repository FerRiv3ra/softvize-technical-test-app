import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  AppConfigConfigurationState,
  AppConfigThemeType,
} from "./appConfigModel";
import * as configSelectors from "./appConfigSelectors";

let initialState: AppConfigConfigurationState = {
  theme: AppConfigThemeType.LIGHT, // Default theme
  isDarkMode: false, // Default dark mode state
};

const appConfigSlice = createSlice({
  name: "appConfig",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<AppConfigThemeType>) => {
      state.theme = action.payload;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const appConfigActions = {
  ...appConfigSlice.actions,
};

export const appConfigSelectors = {
  ...configSelectors,
};

export default appConfigSlice.reducer;
