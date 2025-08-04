import { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppScreens } from "../screens/AppScreens";
import { scale } from "../utils/helpers/scale";
import { useAppNavigation } from "./useAppNavigation";
import { useThemeColor } from "./useThemeColor";

export const useOnboardingScreen = () => {
  const { top } = useSafeAreaInsets();
  const colors = useThemeColor();
  const navigation = useAppNavigation();

  const memoStyles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
        gap: scale(16),
        paddingHorizontal: scale(16),
        backgroundColor: colors.background,
        paddingTop: top,
      },
      logo: {
        width: scale(400),
        height: scale(400),
        alignSelf: "center",
      },
    });
  }, [colors]);

  const onPressGetStarted = useCallback(() => {
    navigation.navigate(AppScreens.LOGIN_SCREEN);
  }, []);

  return {
    memoStyles,
    onPressGetStarted,
  };
};
