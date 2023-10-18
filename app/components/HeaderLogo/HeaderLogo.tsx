import { Image, ImageStyle, StyleProp } from 'react-native';
import React from 'react';
import styles from './HeaderLogo.styles';

type HeaderLogoProps = {
  imageStyle?: StyleProp<ImageStyle>;
};
export default function HeaderLogo({ imageStyle }: HeaderLogoProps) {
  return (
    <Image
      source={require('../../assets/images/headerLogo.png')}
      resizeMode="contain"
      style={[styles.logo, imageStyle]}
    />
  );
}
