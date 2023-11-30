import { View, Text } from 'react-native';
import styles from './ScanIpScreen.styles';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@rneui/themed';
import colors from '../../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import { createRequest } from '../../api/request';
import { useUserStore } from '../../store/userStore';
import { RequestType } from '@jonzubi/securscan-shared';
import { useRouter } from 'expo-router';
import { getProfile } from '../../api/user';

const ScanIpScreen = () => {
  const { t } = useTranslation();
  const { access_token, setTokens } = useUserStore();
  const router = useRouter();

  const [ip, setIp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      await createRequest(access_token, {
        ipToScan: ip,
        requestType: RequestType.SCAN_IP,
        requestToScan: '',
      });

      const {
        data: { tokens },
      } = await getProfile(access_token);
      setTokens(tokens);

      router.push('/home/operations');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIp('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>{t('scanIpScreen.title')}</Text>
        <Input
          value={ip}
          inputStyle={{ color: colors.WHITE }}
          placeholder={t('scanIpScreen.domainPlaceholder')}
          placeholderTextColor={colors.GRAY}
          leftIcon={
            <MaterialCommunityIcons
              name="ip-network-outline"
              size={24}
              color={colors.MAIN_RED}
            />
          }
          onChangeText={setIp}
        />
        <SubmitButton
          isLoading={isLoading}
          handlePress={handleSubmit}
          title={t('scanIpScreen.submitButton')}
        />
      </View>
    </View>
  );
};

export default ScanIpScreen;
