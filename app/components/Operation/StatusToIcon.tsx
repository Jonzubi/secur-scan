import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import { RequestStatus } from '@jonzubi/securscan-shared';
import colors from '../../constants/colors';

interface IStatusToIcon {
  status: RequestStatus;
}
const StatusToIcon = ({ status }: IStatusToIcon) => {
  if (status === RequestStatus.PENDING) {
    return <ActivityIndicator color={colors.SECONDARY_RED} />;
  }

  return (
    <View
      style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor:
          status === RequestStatus.SUCCESS
            ? colors.MAIN_GREEN
            : colors.MAIN_RED,
      }}
    />
  );
};

export default StatusToIcon;
