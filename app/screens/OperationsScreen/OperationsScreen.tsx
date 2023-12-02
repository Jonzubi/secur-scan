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

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <FlashList
          data={requests}
          renderItem={({ item }) => <Operation {...item} />}
          keyExtractor={(item) => item.id}
          estimatedItemSize={100}
        />
      </ScrollView>
    </View>
  );
};

export default OperationsScreen;
