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

const RegisterScreen = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { modalText, setModalText, setShowModal, showModal } = useModal(
    t('auth.incorrectLogin'),
  );
  const emailRef = useRef<any>(null);

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
          handlePress={() => {}}
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
