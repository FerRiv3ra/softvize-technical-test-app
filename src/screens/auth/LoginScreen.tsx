import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CustomButton } from "@/src/components/atoms/CustomButton";
import { CustomInput } from "@/src/components/atoms/CustomInput";
import { useForm } from "@/src/hooks/useForm";
import { AppLogo } from "@/src/utils/constants/Images";
import { scale } from "@/src/utils/helpers/scale";

export const LoginScreen = () => {
  const { top } = useSafeAreaInsets();
  const { email, password, onChange, reset } = useForm({
    email: "",
    password: "",
  });

  const memoStyles = useMemo(() => {
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
    });
  }, [top]);

  return (
    <View style={memoStyles.container}>
      <Image source={AppLogo} style={memoStyles.logo} />
      <Text style={memoStyles.welcomeText}>
        Welcome to the Login Screen! Please log in to continue.
      </Text>

      <CustomInput
        label="Email"
        value={email}
        onChangeText={(value) => onChange(value, "email")}
        placeholder="Enter your email"
      />
      <CustomInput
        label="Password"
        value={password}
        onChangeText={(value) => onChange(value, "password")}
        placeholder="Enter your password"
        secureTextEntry
      />

      <CustomButton onPress={reset}>Log In</CustomButton>
    </View>
  );
};
