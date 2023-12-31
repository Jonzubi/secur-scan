import { View, Text, Image } from 'react-native';
import React from 'react';
import styles from './Header.styles';
import Logo from '../../components/Logo/Logo';
import { useUserStore } from '../../store/userStore';

const Header = () => {
  const { tokens } = useUserStore();
  return (
    <View style={styles.container}>
      <Logo
        imageStyle={{
          height: 50,
          width: 50,
          marginLeft: -20,
        }}
      />
      <View style={styles.tokenContainer}>
        <Text style={styles.tokenText}>{tokens}</Text>
        <Image
          source={require('../../assets/icons/currency.png')}
          style={{
            width: 20,
            height: 20,
          }}
        />
      </View>
    </View>
  );
};

export default Header;
