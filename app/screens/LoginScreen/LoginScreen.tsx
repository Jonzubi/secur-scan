import { View, Text } from 'react-native';
import React, { useRef, useState } from 'react';
import styles from './LoginScreen.styles';
import Logo from '../../components/Logo/Logo';
import { Input } from '@rneui/themed';
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '../../constants/colors';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import { useTranslation } from 'react-i18next';
import { Link, useRouter } from 'expo-router';
import { isEmail } from '@jonzubi/securscan-shared';
import { AxiosError } from 'axios';
import { useModal } from '../../hooks/useModal';
import CustomToast, {
  ToastType,
} from '../../components/CustomToast/CustomToast';
import { login } from '../../api/user';
import { useUserStore } from '../../store/userStore';
import * as SecureStore from 'expo-secure-store';

const LoginScreen = () => {
  const { t } = useTranslation();
  const { setUserData } = useUserStore();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { modalText, setModalText, setShowModal, showModal } = useModal(
    t('auth.incorrectLogin'),
  );
  const emailRef = useRef<any>(null);

  const validateForm = (): boolean => {
    let isValid = true;
    setErrorEmail('');

    if (!isEmail(email)) {
      emailRef?.current?.shake();
      setErrorEmail(t('loginScreen.notEmail'));
      isValid = false;
    }
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const userData = await login({ email, password });
      const { access_token, username } = userData.data;
      setUserData({
        access_token,
        username,
        email: userData.data.email,
      });
      await SecureStore.setItemAsync('access_token', access_token);
      setIsLoading(false);
      router.replace('home');
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 401) {
        const modalText = (error as AxiosError)?.response?.data?.message;
        setModalText(
          t(modalText !== 'Unauthorized' ? modalText : 'auth.incorrectLogin'),
        );
      } else setModalText(t('errors.generic'));

      setShowModal(true);
      setIsLoading(false);
    }
  };

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
          onChangeText={setEmail}
          errorMessage={errorEmail}
          ref={emailRef}
        />
        <Input
          inputStyle={{ color: Colors.WHITE }}
          placeholder={t('loginScreen.passwordPlaceholder')}
          placeholderTextColor={Colors.GRAY}
          leftIcon={
            <AntDesign name="lock" size={24} color={Colors.SECONDARY_RED} />
          }
          onChangeText={setPassword}
        />
        <SubmitButton
          title={t('loginScreen.submitButton')}
          isLoading={isLoading}
          handlePress={handleLogin}
        />
        <View style={styles.registerView}>
          <Text style={styles.youNewText}>{t('loginScreen.youNew')}</Text>
          <Link href={'register'} style={styles.registerText}>
            <Text>{t('loginScreen.goRegister')}</Text>
          </Link>
        </View>
        <CustomToast
          type={ToastType.ERROR}
          closeModal={() => setShowModal(false)}
          visible={showModal}
          text={modalText}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
