import { View, RefreshControl, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useRequests } from '../../hooks/useRequests';
import styles from './OperationsScreen.styles';
import { FlashList } from '@shopify/flash-list';
import Operation from '../../components/Operation/Operation';

const OperationsScreen = () => {
  const { data, error, loading, refetch } = useRequests();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <FlashList
          data={data}
          renderItem={({ item }) => <Operation {...item} />}
          keyExtractor={(item) => item._id}
          estimatedItemSize={100}
        />
      </ScrollView>
    </View>
  );
};

export default OperationsScreen;
