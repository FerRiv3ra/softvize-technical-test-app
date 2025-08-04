export enum AppScreens {
  // Auth screens
  ONBOARDING_SCREEN = "OnboardingScreen",
  LOGIN_SCREEN = "LoginScreen",
  REGISTER_SCREEN = "RegisterScreen",

  // App screens
  PROFILE_SCREEN = "ProfileScreen",
  CAMERA_SCREEN = "CameraScreen",
  CONNECTIONS_SCREEN = "ConnectionsScreen",
}

export type AuthScreenProps = {
  [AppScreens.ONBOARDING_SCREEN]: undefined;
  [AppScreens.LOGIN_SCREEN]: undefined;
  [AppScreens.REGISTER_SCREEN]: undefined;
};

export type AppScreenProps = {
  [AppScreens.PROFILE_SCREEN]: undefined;
  [AppScreens.CAMERA_SCREEN]: undefined;
  [AppScreens.CONNECTIONS_SCREEN]: undefined;
};

export type AppScreensParamList = AuthScreenProps & AppScreenProps;
