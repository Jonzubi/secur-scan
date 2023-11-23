import { View } from 'react-native';
import React from 'react';
import styles from './Operation.styles';
import { IGetRequest } from '../../api/interfaces/request';
import IconRequestType from '../../components/IconRequestType/IconRequestType';

const Operation = ({ requestType }: IGetRequest) => {
  return (
    <View style={styles.container}>
      <IconRequestType requestType={requestType} />
    </View>
  );
};

export default Operation;
