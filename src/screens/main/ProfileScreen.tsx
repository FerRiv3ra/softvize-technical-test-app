import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomButton } from '@/src/components/atoms/CustomButton';
import { ProfileTopBar } from '@/src/components/organisms/ProfileTopBar';
import { UserCard } from '@/src/components/organisms/UserCard';
import { useAppNavigation } from '@/src/hooks/useAppNavigation';
import { Colors } from '@/src/utils/constants/Colors';
import { scale } from '@/src/utils/helpers/scale';
import { AppScreens } from '../AppScreens';

export const ProfileScreen = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useAppNavigation();

  const handleConnections = useCallback(() => {
    navigation.navigate(AppScreens.CONNECTIONS_SCREEN);
  }, []);

  return (
    <View style={{ ...styles.container, paddingTop: top }}>
      <ProfileTopBar />

      <View style={styles.cardContainer}>
        <UserCard />
      </View>

      <CustomButton onPress={handleConnections}>View connections</CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.tint,
    paddingHorizontal: scale(16),
  },
  cardContainer: {
    marginVertical: scale(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
