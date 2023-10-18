import { View } from 'react-native';
import { useEffect, useRef } from 'react';
import styles from './VerifyMailSentScreen.styles';
import Logo from '../../components/Logo/Logo';
import { Text } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../../store/userStore';
import LottieView from 'lottie-react-native';

const VerifyMailSentScreen = () => {
  const { t } = useTranslation();
  const { email } = useUserStore();
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <View style={styles.container}>
      <Logo
        imageStyle={{
          height: 350,
          width: 350,
        }}
      />
      <Text h4 style={styles.mainText}>
        {t('verifyMailSentScreen.mainText', { email })}
      </Text>
      {/* <LottieView
        style={{ width: 300, height: 300 }}
        ref={animationRef}
        source={require('../../assets/Lottie/MailSent.json')}
      /> */}
    </View>
  );
};

export default VerifyMailSentScreen;
