import { View } from 'react-native';
import React from 'react';
import { useRequests } from '../../hooks/useRequests';
import styles from './OperationsScreen.styles';
import { FlashList } from '@shopify/flash-list';
import Operation from '../../components/Operation/Operation';

const OperationsScreen = () => {
  const { data, error, loading } = useRequests();

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        renderItem={({ item }) => <Operation {...item} />}
        keyExtractor={(item) => item._id}
        estimatedItemSize={100}
      />
    </View>
  );
};

export default OperationsScreen;
