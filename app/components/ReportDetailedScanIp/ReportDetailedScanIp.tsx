import { View, Text } from 'react-native';
import React from 'react';
import { IGetRequest } from '../../api/interfaces/request';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { useTranslation } from 'react-i18next';
import styles from './ReportDetailedScanIp.styles';

interface IReportDetailedScanIpProps {
  request: IGetRequest;
}

const ReportDetailedScanIp = ({ request }: IReportDetailedScanIpProps) => {
  const { t } = useTranslation();
  const { requestResolve } = request;
  const detailedScanIpData = requestResolve[0].detailedScan;
  if (!detailedScanIpData) return null;

  return (
    <View>
      <View style={styles.titleContainer}>
        <MaterialCommunityIcons
          name="serial-port"
          size={30}
          color={colors.SECONDARY_RED}
        />
        <Text style={styles.titleText}>{t('reportDetailedScanIp.ports')}</Text>
      </View>
      <View style={[styles.subContainer, styles.portsContainer]}>
        {detailedScanIpData.ports
          .sort((a: any, b: any) => a - b)
          .map((port: any) => (
            <View key={port} style={styles.portContainer}>
              <Text key={`t${port}`} style={styles.portText}>
                {port}
              </Text>
            </View>
          ))}
      </View>
      <View style={styles.titleContainer}>
        <MaterialIcons name="computer" size={30} color={colors.SECONDARY_RED} />
        <Text style={styles.titleText}>
          {t('reportDetailedScanIp.domainHostnames')}
        </Text>
      </View>
      <View style={styles.subContainer}>
        {detailedScanIpData.domains.map((domain: any) => (
          <View key={domain}>
            <Text key={`d${domain}`} style={styles.domainText}>
              {domain}
            </Text>
            {detailedScanIpData.hostnames.map((hostname: any) => {
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
        <Text style={styles.titleText}>
          {t('reportDetailedScanIp.netProvider')}
        </Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.vulnsReportText}>{detailedScanIpData.isp}</Text>
      </View>
      <View style={styles.titleContainer}>
        <MaterialCommunityIcons
          name="bug"
          size={30}
          color={colors.SECONDARY_RED}
        />
        <Text style={styles.titleText}>{t('reportDetailedScanIp.vulns')}</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.vulnsReportText}>
          {t('reportDetailedScanIp.vulnsReport', {
            vulns: detailedScanIpData.vulns,
          })}
        </Text>
      </View>
      {detailedScanIpData.vulnsDetails.map((vuln: any) => (
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.vulnsDetailsCve}>
              {t('reportDetailedScanIp.cveTitle', {
                cve: vuln.cve,
                port: vuln.port,
              })}
            </Text>
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.vulnsReportText}>{vuln.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ReportDetailedScanIp;
