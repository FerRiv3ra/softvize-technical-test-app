import React from 'react';
import { StyleSheet, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { CameraView } from 'expo-camera';

import { CustomButton } from '@/src/components/atoms/CustomButton';
import { CameraPermissions } from '@/src/components/templates/CameraPermissions';
import { useCameraScreen } from '@/src/hooks/useCameraScreen';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { Colors } from '@/src/utils/constants/Colors';
import { fullHeight, fullWidth, scale } from '@/src/utils/helpers/scale';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CameraScreen = () => {
  const colors = useThemeColor();
  const { top } = useSafeAreaInsets();
  const {
    barcodeTypes,
    cameraPermission,
    goBack,
    onQRScanned,
    requestCameraPermission,
  } = useCameraScreen();

  if (!cameraPermission?.granted) {
    return (
      <CameraPermissions
        permission={cameraPermission!}
        requestPermission={requestCameraPermission}
        goBack={goBack}
      />
    );
  }

  return (
    <View>
      <CustomButton
        unstyled
        onPress={goBack}
        style={{
          ...styles.backButton,
          backgroundColor: Colors.dark.tint,
          top: top + scale(10, 'height'),
        }}>
        <Ionicons name="chevron-back" color={colors.tint} size={scale(22)} />
      </CustomButton>
      <CameraView
        style={styles.cameraView}
        barcodeScannerSettings={{
          barcodeTypes,
        }}
        onBarcodeScanned={onQRScanned}
      />
      <View style={styles.focus} />
    </View>
  );
};

const styles = StyleSheet.create({
  cameraView: {
    width: fullWidth,
    height: fullHeight,
    backgroundColor: '#000',
  },
  focus: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: scale(250),
    height: scale(250),
    borderWidth: 2,
    borderColor: '#FF000088',
    transform: [{ translateX: -100 }, { translateY: -100 }],
  },
  backButton: {
    position: 'absolute',
    borderRadius: scale(20),
    padding: scale(2),
    left: scale(16),
    zIndex: 10,
  },
});
