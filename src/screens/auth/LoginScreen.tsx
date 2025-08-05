import React from 'react';
import { Text, View } from 'react-native';

import { Image } from 'expo-image';

import { CustomButton } from '@/src/components/atoms/CustomButton';
import { CustomInput } from '@/src/components/atoms/CustomInput';
import { useAuthScreens } from '@/src/hooks/useAuthScreens';
import { AppLogo } from '@/src/utils/constants/Images';

export const LoginScreen = () => {
  const { email, handleNavigate, handleSubmit, onChange, password, styles } =
    useAuthScreens();

  return (
    <View style={styles.container}>
      <Image source={AppLogo} style={styles.logo} />
      <View>
        <Text style={styles.welcomeText}>Welcome back</Text>
        <Text style={styles.welcomeMessage}>Please log in to continue.</Text>
      </View>

      <CustomInput
        label="Email"
        icon="mail-outline"
        value={email}
        onChangeText={value => onChange(value, 'email')}
        placeholder="Enter your email"
      />
      <CustomInput
        label="Password"
        icon="lock-closed-outline"
        value={password}
        onChangeText={value => onChange(value, 'password')}
        placeholder="Enter your password"
        secureTextEntry
        password
      />

      <CustomButton onPress={handleSubmit}>Log In</CustomButton>

      <View style={styles.signUpContainer}>
        <Text style={styles.accountText}>Don't have an account? </Text>
        <CustomButton
          onPress={handleNavigate}
          textStyle={styles.signUpLoginText}
          unstyled>
          Sign Up
        </CustomButton>
      </View>
    </View>
  );
};
