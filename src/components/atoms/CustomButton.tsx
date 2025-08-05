import { useThemeColor } from '@/src/hooks/useThemeColor';
import React, { useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

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
  variant?: 'primary' | 'outline' | 'filled';
  textStyle?: StyleProp<TextStyle>;
  unstyled?: boolean;
}

export const CustomButton = ({
  children,
  style,
  variant = 'primary',
  textStyle,
  ...props
}: CustomButtonProps) => {
  const colors = useThemeColor();

  const memoStyles = useMemo(() => {
    if (props.unstyled) {
      return StyleSheet.create({
        button: {},
        text: {
          fontFamily: 'Mulish-Bold',
        },
      });
    }
    return StyleSheet.create({
      button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        ...(variant === 'primary' && {
          backgroundColor: colors.tint,
          color: colors.background,
        }),
        ...(variant === 'outline' && {
          borderWidth: 1,
          borderColor: colors.tint,
          backgroundColor: 'transparent',
          color: colors.tint,
        }),
        ...(variant === 'filled' && {
          color: colors.text,
        }),
      },
      text: {
        color: colors.text,
        fontSize: 16,
        fontFamily: 'Mulish-Bold',
        ...(variant === 'outline' && {
          color: colors.tint,
        }),
        ...(variant === 'filled' && {
          color: colors.background,
        }),
        ...(variant === 'primary' && {
          color: colors.background,
        }),
      },
    });
  }, [colors, variant]);

  const renderChildren = useMemo(() => {
    if (typeof children === 'string') {
      return <Text style={[memoStyles.text, textStyle]}>{children}</Text>;
    }

    return children;
  }, [children, textStyle]);

  return (
    <TouchableOpacity
      style={[memoStyles.button, style]}
      activeOpacity={0.7}
      {...props}>
      {renderChildren}
    </TouchableOpacity>
  );
};
