import { View, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useUserStore } from '../../store/userStore';
import { IGetRequest } from '../../api/interfaces/request';
import { getRequestById } from '../../api/request';
import styles from './RequestFinishedScreen.styles';
import FinishedReqHeader from '../../components/FinishedReqHeader/FinishedReqHeader';
import { Divider } from '@rneui/base';
import Report from '../../components/Report/Report';
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { RequestType } from '@jonzubi/securscan-shared';

const RequestTypeToTitle: Record<RequestType, string> = {
  [RequestType.RESOLVE_DNS]: 'Resolve DNS',
  [RequestType.SCAN_IP]: 'Scan IP',
  [RequestType.DETAILED_SCAN]: 'Detailed Scan',
  [RequestType.MITIGATION_ADVICES]: 'Mitigation Advices',
};

const RequestFinishedScreen = () => {
  const navigation = useNavigation();
  const { requestId } = useLocalSearchParams();
  const { access_token } = useUserStore();
  const [request, setRequest] = useState<IGetRequest>();

  useEffect(() => {
    const getRequestData = async () => {
      try {
        const rData = await getRequestById(access_token, requestId as string);
        navigation.setOptions({
          title: RequestTypeToTitle[rData.data.requestType],
        });
        setRequest(rData.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRequestData();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={[styles.container, !request && styles.center]}
    >
      {request ? (
        <View style={{ flex: 1 }}>
          <FinishedReqHeader
            requestDate={request.createdAt}
            requestType={request.requestType}
            status={request.status}
            target={request.ipToScan}
            key={request._id}
          />
          <Divider style={{ marginTop: 20, marginBottom: 40 }} />
          <Report {...request} />
        </View>
      ) : (
        <ActivityIndicator size={'large'} color={colors.SECONDARY_RED} />
      )}
    </ScrollView>
  );
};

export default RequestFinishedScreen;
