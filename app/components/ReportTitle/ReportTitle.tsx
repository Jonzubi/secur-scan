import { View, Text } from 'react-native';
import React from 'react';
import { RequestStatus } from '@jonzubi/securscan-shared';
import styles from './ReportTitle.styles';
import { Octicons, MaterialIcons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { useTranslation } from 'react-i18next';

interface IReportTitleProps {
  status: RequestStatus;
}
const ReportTitle = ({ status }: IReportTitleProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {status === RequestStatus.SUCCESS && (
        <Octicons name="report" size={30} color={colors.SECONDARY_RED} />
      )}
      {status === RequestStatus.ERROR && (
        <MaterialIcons name="error" size={30} color={colors.SECONDARY_RED} />
      )}
      <Text style={styles.title}>
        {t(`commonFinishedScreen.reportTitle${status}`)}
      </Text>
    </View>
  );
};

export default ReportTitle;
