import { View, Dimensions } from 'react-native';
import React from 'react';
import styles from './Header.styles';
import HeaderLogo from '../../components/HeaderLogo/HeaderLogo';
import Logo from '../../components/Logo/Logo';

const { width } = Dimensions.get('window');

const Header = () => {
  return (
    <View style={styles.container}>
      {width > 500 ? (
        <HeaderLogo
          imageStyle={{
            height: 400,
            width: 400,
            marginLeft: -55,
          }}
        />
      ) : (
        <Logo
          imageStyle={{
            height: 50,
            width: 50,
            marginLeft: -20,
          }}
        />
      )}
    </View>
  );
};

export default Header;
