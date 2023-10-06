import { View } from 'react-native';
import React from 'react';
import styles from './LoginScreen.styles';
import Logo from '../../components/Logo/Logo';
import { Input } from '@rneui/themed';
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '../../constants/colors';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import { useTranslation } from 'react-i18next';

const LoginScreen = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Logo imageStyle={styles.logo} />
      <View style={styles.form}>
        <Input
          inputStyle={{ color: Colors.WHITE }}
          placeholder={t('loginScreen.emailPlaceholder')}
          placeholderTextColor={Colors.GRAY}
          leftIcon={
            <AntDesign name="mail" size={24} color={Colors.SECONDARY_RED} />
          }
        />
        <Input
          inputStyle={{ color: Colors.WHITE }}
          placeholder={t('loginScreen.passwordPlaceholder')}
          placeholderTextColor={Colors.GRAY}
          leftIcon={
            <AntDesign name="lock" size={24} color={Colors.SECONDARY_RED} />
          }
        />

        <SubmitButton
          containerStyle={{ width: '100%' }}
          title={t('loginScreen.submitButton')}
          isLoading={false}
          handlePress={() => {
            console.log('submit');
          }}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
