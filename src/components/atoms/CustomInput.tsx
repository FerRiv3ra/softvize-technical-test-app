import React, { useCallback, useMemo, useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useThemeColor } from "@/src/hooks/useThemeColor";
import { scale } from "@/src/utils/helpers/scale";

/**
 * CustomInput is a reusable input component with a label.
 * It supports secure text entry for passwords and includes an icon to toggle visibility.
 * @param label - The label for the input field.
 * @param password - If true, the input will be treated as a password field with visibility toggle.
 * @param containerStyle - Optional style for the container.
 * @param labelStyle - Optional style for the label text.
 * @param style - Optional style for the input field.
 * @param placeholder - Placeholder text for the input field.
 * @param secureTextEntry - If true, the input will be secure (e.g., for passwords).
 * @param props - Additional TextInput properties.
 * @returns A styled input component with a label and optional password visibility toggle.
 * @example
 * <CustomInput
 *   label="Email"
 *   value={email}
 *   onChangeText={(value) => onChange(value, "email")}
 *   placeholder="Enter your email"
 * />
 */
interface CustomInputProps extends TextInputProps {
  label: string;
  password?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export const CustomInput = ({
  label,
  containerStyle,
  labelStyle,
  password = false,
  style,
  placeholder,
  secureTextEntry,
  ...props
}: CustomInputProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const colors = useThemeColor();

  const handlePress = useCallback(() => {
    if (secureTextEntry) {
      // Toggle secure text entry state
      setPasswordVisible(!passwordVisible);
    }
  }, [passwordVisible, secureTextEntry]);

  const memoStyles = useMemo(() => {
    return StyleSheet.create({
      label: {
        fontSize: scale(15, "font"),
        fontWeight: "bold",
      },
      input: {
        height: scale(40),
        borderColor: colors.tint,
        borderWidth: 1,
        borderRadius: scale(8),
        paddingHorizontal: scale(12),
        width: "100%",
      },
      icon: { position: "absolute", right: scale(12) },
    });
  }, [colors]);

  return (
    <View style={containerStyle}>
      <Text style={[memoStyles.label, labelStyle]}>{label}</Text>
      <View style={{ position: "relative", justifyContent: "center" }}>
        <TextInput
          style={[memoStyles.input, style]}
          placeholderTextColor={colors.placeholder}
          placeholder={placeholder ?? label}
          secureTextEntry={secureTextEntry && !passwordVisible}
          {...props}
        />
        {password && (
          <Pressable style={memoStyles.icon} onPress={handlePress}>
            <Ionicons
              name={passwordVisible ? "eye-off" : "eye"}
              size={scale(20)}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};
