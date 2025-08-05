import React, { useCallback, useMemo, useState } from 'react';
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
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { useThemeColor } from '@/src/hooks/useThemeColor';
import { IconName } from '@/src/types/icons.types';
import { scale } from '@/src/utils/helpers/scale';

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
  icon?: IconName;
  password?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export const CustomInput = ({
  label,
  containerStyle,
  labelStyle,
  icon,
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
      labelContainer: {
        position: 'absolute',
        top: scale(-8),
        left: scale(8),
        backgroundColor: colors.background,
        zIndex: 1,
        paddingHorizontal: scale(4),
      },
      label: {
        fontSize: scale(12, 'font'),
        color: colors.text,
        fontWeight: 'bold',
        fontFamily: 'Mulish-SemiBold',
      },
      input: {
        height: scale(40),
        borderColor: colors.tint,
        borderWidth: 1,
        borderRadius: scale(8),
        paddingHorizontal: scale(icon ? 40 : 12),
        fontFamily: 'Mulish-Regular',
        width: '100%',
      },
      icon: { position: 'absolute', right: scale(12) },
      leftIconContainer: {
        position: 'absolute',
        left: scale(12),
        top: scale(10),
        zIndex: 1,
      },
    });
  }, [colors, icon]);

  return (
    <View style={containerStyle}>
      <View style={memoStyles.leftIconContainer}>
        <Ionicons name={icon} size={scale(20)} color={colors.text} />
      </View>
      <View style={memoStyles.labelContainer}>
        <Text style={[memoStyles.label, labelStyle]}>{label}</Text>
      </View>
      <View style={{ position: 'relative', justifyContent: 'center' }}>
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
              name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={scale(20)}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};
