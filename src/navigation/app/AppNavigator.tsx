import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useThemeColor } from '@/src/hooks/useThemeColor';
import { AppScreenProps, AppScreens } from '@/src/screens/AppScreens';
import { CameraScreen } from '@/src/screens/main/CameraScreen';
import { ConnectionsScreen } from '@/src/screens/main/ConnectionsScreen';
import { ProfileScreen } from '@/src/screens/main/ProfileScreen';

const Stack = createNativeStackNavigator<AppScreenProps>();

export default function MainNavigator() {
  const colors = useThemeColor();

  return (
    <Stack.Navigator
      initialRouteName={AppScreens.PROFILE_SCREEN}
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}>
      <Stack.Screen
        name={AppScreens.PROFILE_SCREEN}
        component={ProfileScreen}
      />
      <Stack.Screen
        name={AppScreens.CAMERA_SCREEN}
        options={{
          animationTypeForReplace: 'push',
        }}
        component={CameraScreen}
      />
      <Stack.Screen
        name={AppScreens.CONNECTIONS_SCREEN}
        options={{
          animationTypeForReplace: 'push',
        }}
        component={ConnectionsScreen}
      />
    </Stack.Navigator>
  );
}
