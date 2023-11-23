import { View, Text } from 'react-native';
import React from 'react';
import styles from './Operation.styles';
import { IGetRequest } from '../../api/interfaces/request';
import IconRequestType from '../../components/IconRequestType/IconRequestType';
import StatusToIcon from './StatusToIcon';

const Operation = ({ requestType, ipToScan, status }: IGetRequest) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <IconRequestType requestType={requestType} />
        <Text style={styles.targetText}>{ipToScan}</Text>
      </View>
      <StatusToIcon status={status} />
    </View>
  );
};

export default Operation;
