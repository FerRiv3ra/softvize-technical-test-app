import { useCallback, useMemo } from 'react';
import { Alert, StyleSheet } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppScreens } from '../screens/AppScreens';
import { authActions } from '../store/auth/authSlice';
import { scale } from '../utils/helpers/scale';
import useActions from './useActions';
import { useAppNavigation } from './useAppNavigation';
import { useForm } from './useForm';
import { useThemeColor } from './useThemeColor';

export const useAuthScreens = (register = false) => {
  const colors = useThemeColor();
  const { top } = useSafeAreaInsets();
  const navigation = useAppNavigation();

  const [login, registerUser] = useActions([
    authActions.UserLoginThunk,
    authActions.UserRegisterThunk,
  ]);

  const { email, password, name, onChange, form, reset } = useForm({
    email: '',
    password: '',
    name: '',
  });

  const handleNavigate = useCallback(() => {
    if (register) {
      navigation.goBack();
    } else {
      navigation.navigate(AppScreens.REGISTER_SCREEN);
    }
  }, [navigation, register]);

  const handleSubmit = useCallback(() => {
    if (register) {
      handleRegister();
    } else {
      handleLogin();
    }
  }, [navigation, register, form]);

  const handleLogin = useCallback(async () => {
    if ([email, password].some(field => field.trim() === '')) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      await login({ email, password });
      reset();
    } catch (error) {}
  }, [navigation, form]);

  const handleRegister = useCallback(async () => {
    if ([email, password, name].some(field => field.trim() === '')) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      await registerUser({ email, password, name });
      reset();
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    }
  }, [navigation, form]);

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
        alignSelf: 'center',
      },
      welcomeText: {
        textAlign: 'center',
        fontSize: scale(16, 'font'),
      },
      signUpContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
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
    handleSubmit,
  };
};
