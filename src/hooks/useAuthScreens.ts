import { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppScreens } from "../screens/AppScreens";
import { scale } from "../utils/helpers/scale";
import { useAppNavigation } from "./useAppNavigation";
import { useForm } from "./useForm";
import { useThemeColor } from "./useThemeColor";

export const useAuthScreens = (register = false) => {
  const colors = useThemeColor();
  const { top } = useSafeAreaInsets();
  const navigation = useAppNavigation();

  const { email, password, name, onChange, reset } = useForm({
    email: "",
    password: "",
    name: "",
  });

  const handleNavigate = useCallback(() => {
    if (register) {
      navigation.goBack();
    } else {
      navigation.navigate(AppScreens.REGISTER_SCREEN);
    }
  }, [navigation, register]);

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: top,
        paddingHorizontal: scale(16),
        gap: scale(16),
      },
      logo: {
        width: scale(250),
        height: scale(250),
        alignSelf: "center",
      },
      welcomeText: {
        textAlign: "center",
        fontSize: scale(16, "font"),
      },
      signUpContainer: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: scale(2),
      },
    });
  }, [top]);

  return {
    colors,
    styles,
    handleNavigate,
    email,
    password,
    name,
    onChange,
    reset,
  };
};
