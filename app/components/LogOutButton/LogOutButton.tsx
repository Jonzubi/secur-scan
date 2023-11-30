import { TouchableOpacity, Text } from 'react-native';
import React from 'react';
import styles from './LogOutButton.styles';
import { useTranslation } from 'react-i18next';
import MCI from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { useUserStore } from '../../store/userStore';
import * as SecureStore from 'expo-secure-store';

const LogOutButton = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { resetUserData } = useUserStore();

  const handleLogOut = async () => {
    resetUserData();
    await SecureStore.setItemAsync('access_token', '');
    router.replace('/auth/login');
  };
  return (
    <TouchableOpacity onPress={handleLogOut} style={styles.container}>
      <MCI style={styles.icon} name="logout" size={24} color="black" />
      <Text style={styles.text}>{t('logOutButton.text')}</Text>
    </TouchableOpacity>
  );
};

export default LogOutButton;
