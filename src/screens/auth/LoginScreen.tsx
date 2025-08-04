import React from 'react';
import { Text, View } from 'react-native';

import { Image } from 'expo-image';

import { CustomButton } from '@/src/components/atoms/CustomButton';
import { CustomInput } from '@/src/components/atoms/CustomInput';
import { useAuthScreens } from '@/src/hooks/useAuthScreens';
import { AppLogo } from '@/src/utils/constants/Images';

export const LoginScreen = () => {
  const {
    colors,
    email,
    handleNavigate,
    handleSubmit,
    onChange,
    password,
    styles,
  } = useAuthScreens();

  return (
    <View style={styles.container}>
      <Image source={AppLogo} style={styles.logo} />
      <Text style={styles.welcomeText}>Please log in to continue.</Text>

      <CustomInput
        label="Email"
        value={email}
        onChangeText={value => onChange(value, 'email')}
        placeholder="Enter your email"
      />
      <CustomInput
        label="Password"
        value={password}
        onChangeText={value => onChange(value, 'password')}
        placeholder="Enter your password"
        secureTextEntry
        password
      />

      <CustomButton onPress={handleSubmit}>Log In</CustomButton>

      <View style={styles.signUpContainer}>
        <Text>Don't have an account? </Text>
        <CustomButton
          onPress={handleNavigate}
          textStyle={{ color: colors.tint }}
          unstyled>
          Sign Up
        </CustomButton>
      </View>
    </View>
  );
};
