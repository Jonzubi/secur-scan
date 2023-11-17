import { View, Text } from 'react-native';
import styles from './ResolveDnsScreen.styles';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@rneui/themed';
import colors from '../../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SubmitButton from '../../components/SubmitButton/SubmitButton';

const ResolveDnsScreen = () => {
  const { t } = useTranslation();
  const [domain, setDomain] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>{t('resolveDnsScreen.title')}</Text>
        <Input
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
