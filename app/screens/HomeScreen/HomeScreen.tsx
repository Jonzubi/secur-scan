import { View } from 'react-native';
import {} from 'react';
import styles from './HomeScreen.styles';
import RequestLink from '../../components/RequestLink/RequestLink';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../constants/colors';

const HomeScreen = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <RequestLink
        title={t('homeScreen.requestLinkResolveDomain')}
        icon={() => (
          <MaterialCommunityIcons
            name="web"
            size={24}
            color={colors.MAIN_RED}
          />
        )}
        description={t('homeScreen.requestLinkResolveDomainDescription')}
        tokenCost={1}
        href="/request/resolve-domain"
      />
    </View>
  );
};

export default HomeScreen;
