import { useThemeColor } from "@/src/hooks/useThemeColor";
import React, { useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

/**
 * CustomButton is a reusable button component with different styles.
 * It accepts props for styling and functionality.
 *
 * @param {React.ReactNode | string} children - The content of the button.
 * @param {StyleProp<TextStyle>} textStyle - Optional style for the button text.
 * @param {string} variant - The variant of the button (primary, outline, filled).
 * @param {TouchableOpacityProps} props - Additional props for the TouchableOpacity component.
 */
interface CustomButtonProps extends TouchableOpacityProps {
  children?: React.ReactNode | string;
  variant?: "primary" | "outline" | "filled";
  textStyle?: StyleProp<TextStyle>;
}

export const CustomButton = ({
  children,
  style,
  variant = "primary",
  textStyle,
  ...props
}: CustomButtonProps) => {
  const colors = useThemeColor();

  const memoStyles = useMemo(() => {
    return StyleSheet.create({
      button: {
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        ...(variant === "primary" && {
          backgroundColor: colors.tint,
          color: colors.background,
        }),
        ...(variant === "outline" && {
          borderWidth: 1,
          borderColor: colors.tint,
          backgroundColor: "transparent",
          color: colors.tint,
        }),
        ...(variant === "filled" && {
          color: colors.text,
        }),
      },
    });
  }, [colors, variant]);

  const renderChildren = useMemo(() => {
    if (typeof children === "string") {
      return (
        <Text style={[{ color: memoStyles.button.color }, textStyle]}>
          {children}
        </Text>
      );
    }

    return children;
  }, [children, textStyle]);

  return (
    <TouchableOpacity style={memoStyles.button} activeOpacity={0.7} {...props}>
      {renderChildren}
    </TouchableOpacity>
  );
};
