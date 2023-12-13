import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import React from 'react';
import styles from './Operation.styles';
import IconRequestType from '../../components/IconRequestType/IconRequestType';
import StatusToIcon from './StatusToIcon';
import { RequestState } from '../../store/requestStore';
import { RequestStatus, RequestType } from '@jonzubi/securscan-shared';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

const Operation = ({ type, ipToScan, status }: RequestState) => {
  const router = useRouter();
  const { t } = useTranslation();

  const typeToRoute: Record<RequestType, string> = {
    RESOLVE_DNS: 'resolve-dns-finished',
    SCAN_IP: 'scan-ip-finished',
    DETAILED_SCAN: 'detailed-scan-finished',
    MITIGATION_ADVICES: 'mitigation-advices-finished',
  };

  const validStatuses = [RequestStatus.SUCCESS, RequestStatus.ERROR];

  const handleOperationPress = () => {
    if (!validStatuses.includes(status)) {
      ToastAndroid.show(t('toasts.operationNotFinished'), ToastAndroid.SHORT);
      return;
    }

    router.push(typeToRoute[type]);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleOperationPress}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <IconRequestType requestType={type} />
        <Text style={styles.targetText}>{ipToScan}</Text>
      </View>
      <StatusToIcon status={status} />
    </TouchableOpacity>
  );
};

export default Operation;
