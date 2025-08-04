import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppScreens, AuthScreenProps } from "@/src/screens/AppScreens";
import { LoginScreen } from "@/src/screens/auth/LoginScreen";
import { OnboardingScreen } from "@/src/screens/auth/OnboardingScreen";
import { RegisterScreen } from "@/src/screens/auth/RegisterScreen";

const Stack = createNativeStackNavigator<AuthScreenProps>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={AppScreens.ONBOARDING_SCREEN}
      screenOptions={{
        headerShown: false,
        contentStyle: {
          //   backgroundColor: theme.background.get(),
        },
      }}
    >
      <Stack.Screen
        name={AppScreens.ONBOARDING_SCREEN}
        component={OnboardingScreen}
      />
      <Stack.Screen
        name={AppScreens.LOGIN_SCREEN}
        options={{
          animationTypeForReplace: "push",
        }}
        component={LoginScreen}
      />
      <Stack.Screen
        name={AppScreens.REGISTER_SCREEN}
        options={{
          animationTypeForReplace: "push",
        }}
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
}
