import { ActivityIndicator, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import styles from './ResolveDnsFinishedScreen.styles';
import { useLocalSearchParams } from 'expo-router';
import { IGetRequest } from '../../api/interfaces/request';
import { getRequestById } from '../../api/request';
import { useUserStore } from '../../store/userStore';
import colors from '../../constants/colors';
import FinishedReqHeader from '../../components/FinishedReqHeader/FinishedReqHeader';
import HorizontalDivider from '../../components/HorizontalDivider/HorizontalDivider';

const ResolveDnsFinishedScreen = () => {
  const { requestId } = useLocalSearchParams();
  const { access_token } = useUserStore();
  const [request, setRequest] = useState<IGetRequest>();

  useEffect(() => {
    const getRequestData = async () => {
      try {
        const rData = await getRequestById(access_token, requestId as string);
        setRequest(rData.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRequestData();
  }, []);
  console.log(request);
  return (
    <ScrollView
      style={[styles.container]}
      contentContainerStyle={[!request && styles.center]}
    >
      {request ? (
        <>
          <FinishedReqHeader
            requestDate={request.createdAt}
            requestType={request.requestType}
            status={request.status}
            target={request.ipToScan}
            key={request._id}
          />
          <HorizontalDivider style={{ marginTop: 20, marginBottom: 40 }} />
        </>
      ) : (
        <ActivityIndicator size={'large'} color={colors.SECONDARY_RED} />
      )}
    </ScrollView>
  );
};

export default ResolveDnsFinishedScreen;
