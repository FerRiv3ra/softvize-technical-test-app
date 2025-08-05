import React, { useCallback, useEffect, useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { ConnectionEntity } from '@/src/api/types/connectionsTypes';
import { ListItem } from '@/src/components/organisms/ListItem';
import { TitleBar } from '@/src/components/organisms/TitleBar';
import useActions from '@/src/hooks/useActions';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import {
  connectionsActions,
  connectionsSelectors,
} from '@/src/store/connections/connectionsSlice';
import { scale } from '@/src/utils/helpers/scale';

export const ConnectionsScreen = () => {
  const { top } = useSafeAreaInsets();
  const colors = useThemeColor();

  const isLoading = useSelector(connectionsSelectors.selectIsLoading);
  const connections = useSelector(connectionsSelectors.selectAllConnections);
  const [getMyConnections] = useActions([
    connectionsActions.getMyConnectionsThunk,
  ]);

  useEffect(() => {
    getMyConnections();
  }, [getMyConnections]);

  const renderItem = useCallback(
    ({ item }: { item: ConnectionEntity }) => <ListItem item={item} />,
    [colors]
  );

  const renderConnections = useMemo(() => {
    if (isLoading) {
      return <ActivityIndicator color={colors.tint} />;
    }

    if (connections.length === 0) {
      return (
        <Text style={{ ...styles.noConnectionsText, color: colors.text }}>
          No connections found.
        </Text>
      );
    }

    return (
      <FlatList
        data={connections}
        keyExtractor={item => item._id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={getMyConnections}
            tintColor={colors.tint}
          />
        }
        renderItem={renderItem}
      />
    );
  }, [connections]);

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: top,
      }}>
      <TitleBar title="Connections" showBackButton />
      {renderConnections}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: scale(16),
  },
  noConnectionsText: {
    fontFamily: 'InknutAntiqua-Regular',
    textAlign: 'center',
  },
});
