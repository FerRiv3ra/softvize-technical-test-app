import React, { useCallback } from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { useAppNavigation } from '@/src/hooks/useAppNavigation';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { Colors } from '@/src/utils/constants/Colors';
import { scale } from '@/src/utils/helpers/scale';
import { CustomButton } from '../atoms/CustomButton';

interface TitleBarProps extends ViewProps {
  title: string;
  textAlign?: 'left' | 'center' | 'right';
  showBackButton?: boolean;
}

export const TitleBar = ({
  title,
  textAlign = 'left',
  showBackButton,
}: TitleBarProps) => {
  const colors = useThemeColor();
  const navigation = useAppNavigation();

  const handleBackPress = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      {showBackButton && (
        <CustomButton
          unstyled
          onPress={handleBackPress}
          style={{ ...styles.backButton, backgroundColor: Colors.dark.tint }}>
          <Ionicons name="chevron-back" color={colors.tint} size={scale(22)} />
        </CustomButton>
      )}

      <Text
        style={{
          ...styles.title,
          textAlign: showBackButton ? 'center' : textAlign,
          color: colors.tint,
        }}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: scale(3, 'height'),
    borderRadius: scale(20),
    padding: scale(2),
    zIndex: 10,
  },
  container: {
    paddingBottom: scale(16, 'height'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: scale(18, 'font'),
    fontFamily: 'Mulish-SemiBold',
  },
});
