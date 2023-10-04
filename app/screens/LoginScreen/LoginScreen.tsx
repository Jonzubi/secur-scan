import { View, Text } from 'react-native';
import React from 'react';
import styles from './LoginScreen.styles';
import Logo from '../../components/Logo/Logo';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Logo imageStyle={styles.logo} />
      <Text>LoginScreen</Text>
    </View>
  );
};

export default LoginScreen;
