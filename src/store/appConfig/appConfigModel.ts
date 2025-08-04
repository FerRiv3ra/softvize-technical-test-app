export enum AppConfigThemeType {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system",
}

export type AppConfigConfigurationState = {
  theme: AppConfigThemeType;
  isDarkMode: boolean;
};
