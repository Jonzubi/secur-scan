import { Image, ImageStyle, StyleProp } from 'react-native';
import React from 'react';
import styles from './Logo.styles';

type LogoProps = {
  imageStyle?: StyleProp<ImageStyle>;
};
export default function Logo({ imageStyle }: LogoProps) {
  return (
    <Image
      source={require('../../assets/images/icon.png')}
      resizeMode="contain"
      style={[styles.logo, imageStyle]}
    />
  );
}
