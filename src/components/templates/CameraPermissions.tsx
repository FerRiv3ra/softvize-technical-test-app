import React, { useCallback } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';

import { AppLogo } from '@/src/utils/constants/Images';
import { scale } from '@/src/utils/helpers/scale';
import { PermissionResponse } from 'expo-camera';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomButton } from '../atoms/CustomButton';

interface CameraPermissionsProps {
  /** Current permission status */
  permission: PermissionResponse;
  /** Function to request camera permission */
  requestPermission: () => Promise<PermissionResponse>;
  /** Function to handle going back */
  goBack: () => void;
}

/**
 * Component to request camera and media library permissions
 * @param props - Component props
 * @returns JSX.Element
 */
export const CameraPermissions: React.FC<CameraPermissionsProps> = ({
  permission,
  requestPermission,
  goBack,
}) => {
  const { top } = useSafeAreaInsets();

  const handlePress = useCallback(() => {
    if (!permission.canAskAgain) {
      goBack();
    } else {
      requestPermission();
    }
  }, [permission?.canAskAgain, requestPermission, goBack]);

  const handleOpenSettings = useCallback(() => {
    Linking.openSettings();
  }, []);

  const buttonText = permission?.canAskAgain ? 'Grant Permission' : 'Go Back';

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: top,
      }}>
      <View style={styles.imageContainer}>
        <Image
          source={AppLogo}
          style={styles.image}
          contentFit="contain"
          transition={1000}
        />
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={styles.text}>
          We need your permission to access the camera to scan QR codes. Please
          grant the permission to continue.
        </Text>
        <View style={styles.buttonsContainer}>
          <CustomButton onPress={handlePress}>{buttonText}</CustomButton>
          <CustomButton onPress={handleOpenSettings}>
            Open Settings
          </CustomButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(16),
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: scale(250),
    height: scale(250),
  },
  buttonsContainer: {
    marginTop: scale(20),
    gap: scale(15),
  },
  text: {
    fontFamily: 'Mulish-Regular',
    textAlign: 'center',
    paddingHorizontal: scale(20),
  },
});
