import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Image } from 'expo-image';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import { ConnectionEntity } from '@/src/api/types/connectionsTypes';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { scale } from '@/src/utils/helpers/scale';
import { SlideRightAction } from '../molecules/SlideRightAction';

type Props = {
  item: ConnectionEntity;
};

export const ListItem = React.memo(({ item }: Props) => {
  const colors = useThemeColor();

  return (
    <ReanimatedSwipeable
      friction={2}
      enableTrackpadTwoFingerGesture
      renderRightActions={() => <SlideRightAction groupId={item._id} />}>
      <View
        style={{
          ...styles.container,
          borderColor: colors.tint,
          backgroundColor: colors.background,
        }}>
        <Image
          source={{ uri: item.connectedUser.avatar }}
          style={{
            ...styles.image,
            borderColor: colors.tint,
          }}
        />
        <View>
          <Text
            style={{
              ...styles.text,
              color: colors.text,
            }}>
            {item.connectedUser.name}
          </Text>
          <Text
            style={{
              ...styles.secondaryText,
              color: colors.text,
            }}>
            {item.connectedUser.email}
          </Text>
        </View>
      </View>
    </ReanimatedSwipeable>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(10),
    borderBottomWidth: 0.5,
    gap: scale(15),
  },
  image: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    borderWidth: 2,
  },
  text: {
    fontFamily: 'Mulish-SemiBold',
  },
  secondaryText: {
    fontFamily: 'Mulish-Regular',
    fontSize: scale(12),
  },
});
