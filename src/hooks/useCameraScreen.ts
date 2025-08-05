import { useCallback, useMemo, useRef } from 'react';
import { Alert } from 'react-native';

import { BarcodeType, useCameraPermissions } from 'expo-camera';
import { connectionsActions } from '../store/connections/connectionsSlice';
import { MONGO_REGEX } from '../utils/constants/regex';
import useActions from './useActions';
import { useAppNavigation } from './useAppNavigation';

export const useCameraScreen = () => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  const navigation = useAppNavigation();
  const hasScannedRef = useRef(false);

  const [createConnection] = useActions([
    connectionsActions.createConnectionThunk,
  ]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const barcodeTypes = useMemo((): BarcodeType[] => {
    if (hasScannedRef.current) {
      return [];
    }

    return ['qr'];
  }, [hasScannedRef.current]);

  const onQRScanned = useCallback(async ({ data }: { data: string }) => {
    if (hasScannedRef.current) return;
    hasScannedRef.current = true;

    if (!MONGO_REGEX.test(data)) {
      Alert.alert(
        'Invalid QR Code',
        'The scanned QR code does not match the expected format.',
        [{ text: 'OK', onPress: () => (hasScannedRef.current = false) }]
      );
      return;
    }

    try {
      await createConnection(data).unwrap();

      Alert.alert(
        'Connection Created',
        'You have successfully connected with the user.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error: any) {
      Alert.alert(
        'Connection Error',
        error.message || 'Failed to create connection. Please try again.',
        [{ text: 'OK', onPress: () => (hasScannedRef.current = false) }]
      );
    }
  }, []);

  return {
    barcodeTypes,
    cameraPermission,
    goBack,
    onQRScanned,
    requestCameraPermission,
  };
};
