import { View, RefreshControl, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import styles from './OperationsScreen.styles';
import { FlashList } from '@shopify/flash-list';
import Operation from '../../components/Operation/Operation';
import { useRequestStore } from '../../store/requestStore';
import { getRequests } from '../../api/request';
import { useUserStore } from '../../store/userStore';
import { IGetRequest } from '../../api/interfaces/request';

const OperationsScreen = () => {
  const { requests, setRequests } = useRequestStore();
  const { access_token } = useUserStore();
  const [refreshing, setRefreshing] = useState(false);

  const refreshRequests = async () => {
    const auxRequests = (await getRequests(access_token)).data;
    setRequests(
      auxRequests.map((request: IGetRequest) => ({
        id: request._id,
        ipToScan: request.ipToScan,
        type: request.requestType,
        status: request.status,
        createdAt: request.createdAt,
      })),
    );
  };

  useEffect(() => {
    refreshRequests();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    refreshRequests().finally(() => setRefreshing(false));
  };

  const sortedRequests = requests.slice().sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
    const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);

    return dateB.getTime() - dateA.getTime();
  });

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ flex: 1 }}
      >
        <FlashList
          data={sortedRequests}
          renderItem={({ item }) => <Operation {...item} />}
          keyExtractor={(item) => item.id}
          estimatedItemSize={100}
        />
      </ScrollView>
    </View>
  );
};

export default OperationsScreen;
