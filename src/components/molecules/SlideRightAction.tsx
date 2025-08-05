import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import useActions from '@/src/hooks/useActions';
import { connectionsActions } from '@/src/store/connections/connectionsSlice';
import { Colors } from '@/src/utils/constants/Colors';
import { scale } from '@/src/utils/helpers/scale';
import { CustomButton } from '../atoms/CustomButton';

type Props = {
  groupId: string;
};

export const SlideRightAction = ({ groupId }: Props) => {
  const [setSelectedConnection, clearSelectedConnection, deleteConnection] =
    useActions([
      connectionsActions.setSelectedConnection,
      connectionsActions.clearSelectedConnection,
      connectionsActions.deleteConnectionThunk,
    ]);

  const handlePress = () => {
    setSelectedConnection(groupId);

    Alert.alert(
      'Delete Connection',
      'Are you sure you want to delete this connection?',
      [
        {
          text: 'Cancel',
          onPress: () => clearSelectedConnection(),
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteConnection(groupId),
        },
      ]
    );
  };

  return (
    <CustomButton
      unstyled
      style={{ ...styles.container, backgroundColor: Colors.dark.tint }}
      onPress={handlePress}>
      <View style={styles.circle}>
        <Ionicons name="trash-outline" size={scale(20)} color="#fff" />
      </View>
    </CustomButton>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(40),
    backgroundColor: '#F53D5B',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
