import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { ScanSvg } from '@/src/assets/svgs/ScanSvg';
import useActions from '@/src/hooks/useActions';
import { useAppNavigation } from '@/src/hooks/useAppNavigation';
import { AppScreens } from '@/src/screens/AppScreens';
import { authActions } from '@/src/store/auth/authSlice';
import { CustomButton } from '../atoms/CustomButton';

export const ProfileTopBar = () => {
  const [clearState] = useActions([authActions.clearState]);

  const navigation = useAppNavigation();

  const handleCamera = useCallback(() => {
    navigation.navigate(AppScreens.CAMERA_SCREEN);
  }, [navigation]);

  const handleLogout = useCallback(() => {
    clearState();
  }, [clearState]);

  return (
    <View style={styles.container}>
      <CustomButton unstyled onPress={handleLogout}>
        Log Out
      </CustomButton>
      <CustomButton unstyled onPress={handleCamera}>
        <ScanSvg />
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
