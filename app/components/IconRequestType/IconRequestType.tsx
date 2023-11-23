import React from 'react';
import { RequestType } from '@jonzubi/securscan-shared';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { REQUEST_TO_ICON_NAME } from '../../constants/requestToIconName';
import colors from '../../constants/colors';

interface IconRequestTypeProps {
  requestType: RequestType;
  iconSize?: number;
  color?: string;
}

const IconRequestType = ({
  requestType,
  iconSize,
  color,
}: IconRequestTypeProps) => {
  return (
    <MaterialCommunityIcons
      size={iconSize || 24}
      color={color || colors.SECONDARY_RED}
      name={REQUEST_TO_ICON_NAME[requestType]}
    />
  );
};

export default IconRequestType;
