import React from 'react';
import { Text, View } from 'react-native';

import { Image } from 'expo-image';

import { CustomButton } from '@/src/components/atoms/CustomButton';
import { CustomInput } from '@/src/components/atoms/CustomInput';
import { useAuthScreens } from '@/src/hooks/useAuthScreens';
import { AppLogo } from '@/src/utils/constants/Images';

export const RegisterScreen = () => {
  const {
    colors,
    email,
    handleNavigate,
    handleSubmit,
    name,
    onChange,
    password,
    styles,
  } = useAuthScreens(true);

  return (
    <View style={styles.container}>
      <Image source={AppLogo} style={styles.logo} />
      <Text style={styles.welcomeText}>Please register to continue.</Text>

      <CustomInput
        label="Email"
        value={email}
        onChangeText={value => onChange(value, 'email')}
        placeholder="Enter your email"
      />
      <CustomInput
        label="Name"
        value={name}
        onChangeText={value => onChange(value, 'name')}
        placeholder="Enter your name"
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
        <Text>Already have an account? </Text>
        <CustomButton
          onPress={handleNavigate}
          textStyle={{ color: colors.tint }}
          unstyled>
          Log In
        </CustomButton>
      </View>
    </View>
  );
};
