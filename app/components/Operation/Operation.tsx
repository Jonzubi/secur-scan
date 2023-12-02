import { View, Text } from 'react-native';
import React from 'react';
import styles from './Operation.styles';
import IconRequestType from '../../components/IconRequestType/IconRequestType';
import StatusToIcon from './StatusToIcon';
import { RequestState } from '../../store/requestStore';

const Operation = ({ type, ipToScan, status }: RequestState) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <IconRequestType requestType={type} />
        <Text style={styles.targetText}>{ipToScan}</Text>
      </View>
      <StatusToIcon status={status} />
    </View>
  );
};

export default Operation;
