import React, { useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { useThemeColor } from "@/src/hooks/useThemeColor";
import { scale } from "@/src/utils/helpers/scale";

/**
 * CustomInput is a reusable input component with a label.
 * It accepts props for styling and functionality.
 *
 * @param {string} label - The label for the input field.
 * @param {StyleProp<ViewStyle>} containerStyle - Optional style for the container.
 * @param {StyleProp<TextStyle>} labelStyle - Optional style for the label text.
 * @param {TextInputProps} props - Additional props for the TextInput component.
 */
interface CustomInputProps extends TextInputProps {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export const CustomInput = ({
  label,
  containerStyle,
  labelStyle,
  style,
  placeholder,
  ...props
}: CustomInputProps) => {
  const colors = useThemeColor();

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
    });
  }, [colors]);

  return (
    <View style={containerStyle}>
      <Text style={[memoStyles.label, labelStyle]}>{label}</Text>
      <TextInput
        style={[memoStyles.input, style]}
        placeholderTextColor={colors.placeholder}
        placeholder={placeholder ?? label}
        {...props}
      />
    </View>
  );
};
