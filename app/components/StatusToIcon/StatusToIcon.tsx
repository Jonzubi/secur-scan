import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import { RequestStatus } from '@jonzubi/securscan-shared';
import colors from '../../constants/colors';
import { AntDesign } from '@expo/vector-icons';

interface IStatusToIcon {
  status: RequestStatus;
}
const StatusToIcon = ({ status }: IStatusToIcon) => {
  if (status === RequestStatus.PENDING) {
    return <ActivityIndicator color={colors.SECONDARY_RED} />;
  }

  if (!status)
    return <AntDesign name="question" size={24} color={colors.WHITE} />;

  const RequestStatusToColor = {
    [RequestStatus.SUCCESS]: colors.MAIN_GREEN,
    [RequestStatus.ERROR]: colors.SECONDARY_RED,
    [RequestStatus.WORKING]: colors.YELLOW,
  };

  return (
    <View
      style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: RequestStatusToColor[status],
      }}
    />
  );
};

export default StatusToIcon;
