import React from 'react';
import { StyleSheet, View } from 'react-native';

import { CameraView } from 'expo-camera';

import { CameraPermissions } from '@/src/components/templates/CameraPermissions';
import { useCameraScreen } from '@/src/hooks/useCameraScreen';
import { fullHeight, fullWidth, scale } from '@/src/utils/helpers/scale';

export const CameraScreen = () => {
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
});
