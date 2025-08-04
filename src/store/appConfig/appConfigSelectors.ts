import { RootState } from "../store";

export const isDarkMode = (state: RootState) => state.appConfig.isDarkMode;
export const selectTheme = (state: RootState) => state.appConfig.theme;
