import { View, Text } from 'react-native';
import styles from './ResolveDnsScreen.styles';
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

const ResolveDnsScreen = () => {
  const { t } = useTranslation();
  const { access_token, setTokens } = useUserStore();
  const router = useRouter();

  const [domain, setDomain] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      await createRequest(access_token, {
        ipToScan: domain,
        requestType: RequestType.RESOLVE_DNS,
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
      setDomain('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>{t('resolveDnsScreen.title')}</Text>
        <Input
          value={domain}
          inputStyle={{ color: colors.WHITE }}
          placeholder={t('resolveDnsScreen.domainPlaceholder')}
          placeholderTextColor={colors.GRAY}
          leftIcon={
            <MaterialCommunityIcons
              name="web"
              size={24}
              color={colors.MAIN_RED}
            />
          }
          onChangeText={setDomain}
        />
        <SubmitButton
          isLoading={isLoading}
          handlePress={handleSubmit}
          title={t('resolveDnsScreen.submitButton')}
        />
      </View>
    </View>
  );
};

export default ResolveDnsScreen;
