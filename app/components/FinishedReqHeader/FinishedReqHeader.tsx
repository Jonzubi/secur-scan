import { View, Text } from 'react-native';
import React from 'react';
import styles from './FinishedRequHeader,styles';
import { RequestStatus, RequestType } from '@jonzubi/securscan-shared';
import IconRequestType from '../../components/IconRequestType/IconRequestType';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../../constants/colors';

interface FinishedReqHeaderProps {
  target: string;
  requestDate: Date;
  status: RequestStatus;
  requestType: RequestType;
}
const FinishedReqHeader = ({
  target,
  requestDate,
  status,
  requestType,
}: FinishedReqHeaderProps) => {
  const { t } = useTranslation();

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          <IconRequestType requestType={requestType} />
          <Text style={styles.headerText}>{`${t(
            'commonFinishedScreen.target',
          )}:`}</Text>
        </View>
        <Text style={styles.headerTextBold}>{target}</Text>
      </View>
      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          <MaterialIcons
            name="date-range"
            color={colors.SECONDARY_RED}
            size={24}
          />
          <Text style={styles.headerText}>{`${t(
            'commonFinishedScreen.requestDate',
          )}:`}</Text>
        </View>
        <Text style={styles.headerTextBold}>
          {new Date(requestDate).toLocaleString()}
        </Text>
      </View>
      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          <MaterialIcons
            name="error-outline"
            color={colors.SECONDARY_RED}
            size={24}
          />
          <Text style={styles.headerText}>{`${t(
            'commonFinishedScreen.status',
          )}:`}</Text>
        </View>
        <Text
          style={[
            styles.headerTextBold,
            status === RequestStatus.SUCCESS && styles.textSuccess,
            status === RequestStatus.ERROR && styles.textError,
          ]}
        >
          {t(`status.${status}`)}
        </Text>
      </View>
    </>
  );
};

export default FinishedReqHeader;
