import { View, ViewStyle } from 'react-native';
import React from 'react';
import styles from './HorizontalDivider.styles';

interface HorizontalDividerProps {
  style?: ViewStyle;
}
const HorizontalDivider = ({ style }: HorizontalDividerProps) => {
  return <View style={[styles.container, style]}></View>;
};

export default HorizontalDivider;
