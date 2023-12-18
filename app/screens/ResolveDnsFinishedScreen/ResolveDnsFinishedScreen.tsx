import { ActivityIndicator, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import styles from './ResolveDnsFinishedScreen.styles';
import { useLocalSearchParams } from 'expo-router';
import { IGetRequest } from '../../api/interfaces/request';
import { getRequestById } from '../../api/request';
import { useUserStore } from '../../store/userStore';
import colors from '../../constants/colors';
import { useTranslation } from 'react-i18next';
import FinishedReqHeader from '../../components/FinishedReqHeader/FinishedReqHeader';

const ResolveDnsFinishedScreen = () => {
  const { requestId } = useLocalSearchParams();
  const { access_token } = useUserStore();
  const [request, setRequest] = useState<IGetRequest>();
  const { t } = useTranslation();

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
  console.log(typeof request?.createdAt);
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
        </>
      ) : (
        <ActivityIndicator size={'large'} color={colors.SECONDARY_RED} />
      )}
    </ScrollView>
  );
};

export default ResolveDnsFinishedScreen;
