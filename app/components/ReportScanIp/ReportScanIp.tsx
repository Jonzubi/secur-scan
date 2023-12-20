import { View, Text } from 'react-native';
import React from 'react';
import { IGetRequest } from '../../api/interfaces/request';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
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
            <View key={port} style={styles.portContainer}>
              <Text key={`t${port}`} style={styles.portText}>
                {port}
              </Text>
            </View>
          ))}
      </View>
      <View style={styles.titleContainer}>
        <MaterialCommunityIcons
          name="bug"
          size={30}
          color={colors.SECONDARY_RED}
        />
        <Text style={styles.titleText}>{t('reportScanIp.vulns')}</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.vulnsReportText}>
          {t('reportScanIp.vulnsReport', {
            vulns: scanIpData.vulns,
          })}
        </Text>
        {scanIpData.vulns !== 0 && (
          <Text style={[styles.vulnsReportText, styles.permorDetailedScanText]}>
            {t('reportScanIp.performDetailedScan')}
          </Text>
        )}
      </View>
      <View style={styles.titleContainer}>
        <MaterialIcons name="computer" size={30} color={colors.SECONDARY_RED} />
        <Text style={styles.titleText}>
          {t('reportScanIp.domainHostnames')}
        </Text>
      </View>
      <View style={styles.subContainer}>
        {scanIpData.domains.map((domain) => (
          <View key={domain}>
            <Text key={`d${domain}`} style={styles.domainText}>
              {domain}
            </Text>
            {scanIpData.hostnames.map((hostname) => {
              if (!hostname.includes(domain)) return null;
              return (
                <Text key={`h${hostname}`} style={styles.hostNameText}>
                  - {hostname}
                </Text>
              );
            })}
          </View>
        ))}
      </View>
      <View style={styles.titleContainer}>
        <MaterialCommunityIcons
          name="server-network"
          size={30}
          color={colors.SECONDARY_RED}
        />
        <Text style={styles.titleText}>{t('reportScanIp.netProvider')}</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.vulnsReportText}>{scanIpData.isp}</Text>
      </View>
    </View>
  );
};

export default ReportScanIp;
