import { View } from 'react-native';
import { useRef, useState } from 'react';
import styles from './RegisterScreen.styles';
import Logo from '../../components/Logo/Logo';
import { Input } from '@rneui/themed';
import Colors from '../../constants/colors';
import { useTranslation } from 'react-i18next';
import AntDesign from '@expo/vector-icons/AntDesign';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import CustomToast, {
  ToastType,
} from '../../components/CustomToast/CustomToast';
import { useModal } from '../../hooks/useModal';
import { isEmail } from '@jonzubi/securscan-shared';
import { createUser } from '../../api/user';
import { useUserStore } from '../../store/userStore';
import { useRouter } from 'expo-router';

const RegisterScreen = () => {
  const { t } = useTranslation();
  const { setUserEmail } = useUserStore();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { modalText, setModalText, setShowModal, showModal } = useModal(
    t('errors.generic'),
  );

  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const confirmPasswordRef = useRef<any>(null);

  const validateForm = (): boolean => {
    let isValid = true;
    setErrorEmail('');
    setErrorPassword('');

    if (!isEmail(email)) {
      emailRef.current!.shake();
      setErrorEmail(t('registerScreen.not_email'));
      isValid = false;
    }
    if (password !== confirmPassword) {
      passwordRef.current!.shake();
      confirmPasswordRef.current!.shake();
      setErrorPassword(t('registerScreen.same_password'));
      isValid = false;
    }
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await createUser({ email, password });
      setUserEmail(email);
      setIsLoading(false);
      router.replace('verify-mail');
    } catch (error) {
      console.log(JSON.stringify(error));
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Logo imageStyle={styles.logo} />
      <View style={styles.form}>
        <Input
          inputStyle={{ color: Colors.WHITE }}
          placeholder={t('registerScreen.emailPlaceholder')}
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
          placeholder={t('registerScreen.passwordPlaceholder')}
          placeholderTextColor={Colors.GRAY}
          secureTextEntry={true}
          leftIcon={
            <AntDesign name="lock" size={24} color={Colors.SECONDARY_RED} />
          }
          onChangeText={setPassword}
          errorMessage={errorPassword}
        />
        <Input
          inputStyle={{ color: Colors.WHITE }}
          placeholderTextColor={Colors.GRAY}
          placeholder={t('registerScreen.repeatPasswordPlaceholder')}
          secureTextEntry={true}
          leftIcon={
            <AntDesign name="lock" size={24} color={Colors.SECONDARY_RED} />
          }
          onChangeText={setConfirmPassword}
          errorMessage={errorPassword}
        />
        <SubmitButton
          title={t('registerScreen.submitButton')}
          isLoading={isLoading}
          handlePress={handleRegister}
        />
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

export default RegisterScreen;
