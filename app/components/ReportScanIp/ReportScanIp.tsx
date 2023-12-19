import { View, Text } from 'react-native';
import React from 'react';
import { IGetRequest } from '../../api/interfaces/request';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { useTranslation } from 'react-i18next';
import styles from './ReportScanIp.styles';

interface IReportScanIpProps {
  request: IGetRequest;
}

const ReportScanIp = ({ request }: IReportScanIpProps) => {
  const { t } = useTranslation();
  const { requestResolve } = request;
  const scanIpData = requestResolve[0].scanIP;

  return (
    <View>
      <View style={styles.titleContainer}>
        <MaterialCommunityIcons
          name="serial-port"
          size={30}
          color={colors.SECONDARY_RED}
        />
        <Text style={styles.titleText}>{t('reportScanIp.ports')}</Text>
      </View>
      <View style={[styles.subContainer, styles.portsContainer]}>
        {scanIpData.ports
          .sort((a, b) => a - b)
          .map((port) => (
            <View style={styles.portContainer}>
              <Text key={port} style={styles.portText}>
                {port}
              </Text>
            </View>
          ))}
      </View>
    </View>
  );
};

export default ReportScanIp;
