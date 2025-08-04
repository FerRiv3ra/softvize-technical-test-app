import React from "react";
import { View } from "react-native";

import { Image } from "expo-image";

import { CustomButton } from "@/src/components/atoms/CustomButton";
import { useOnboardingScreen } from "@/src/hooks/useOnboardingScreen";
import { AppLogo } from "@/src/utils/constants/Images";

export const OnboardingScreen = () => {
  const { memoStyles, onPressGetStarted } = useOnboardingScreen();

  return (
    <View style={memoStyles.container}>
      <Image source={AppLogo} style={memoStyles.logo} />

      <CustomButton variant="primary" onPress={onPressGetStarted}>
        Get Started
      </CustomButton>
    </View>
  );
};
