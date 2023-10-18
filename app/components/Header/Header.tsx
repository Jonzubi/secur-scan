import { View } from 'react-native';
import React from 'react';
import styles from './Header.styles';
import HeaderLogo from '../../components/HeaderLogo/HeaderLogo';

const Header = () => {
  return (
    <View style={styles.container}>
      <HeaderLogo
        imageStyle={{
          height: 400,
          width: 400,
          marginLeft: -55,
        }}
      />
    </View>
  );
};

export default Header;
