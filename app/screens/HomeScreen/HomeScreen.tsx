import { View, ScrollView } from 'react-native';
import {} from 'react';
import styles from './HomeScreen.styles';
import RequestLink, {
  RequestLinkProps,
} from '../../components/RequestLink/RequestLink';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../constants/colors';

const HomeScreen = () => {
  const { t } = useTranslation();

  const requestLinkOptions: RequestLinkProps[] = [
    {
      title: t('homeScreen.requestLinkResolveDomain'),
      icon: () => (
        <MaterialCommunityIcons name="web" size={24} color={colors.MAIN_RED} />
      ),
      description: t('homeScreen.requestLinkResolveDomainDescription'),
      tokenCost: 5,
      href: '/request/resolve-domain',
    },
    {
      title: t('homeScreen.requestLinkScanIP'),
      icon: () => (
        <MaterialCommunityIcons
          name="ip-network-outline"
          size={24}
          color={colors.MAIN_RED}
        />
      ),
      description: t('homeScreen.requestLinkScanIPDescription'),
      tokenCost: 20,
      href: '/request/scan-ip',
    },
    {
      title: t('homeScreen.requestLinkDetailedInfo'),
      icon: () => (
        <MaterialCommunityIcons
          name="information-outline"
          size={24}
          color={colors.MAIN_RED}
        />
      ),
      description: t('homeScreen.requestLinkDetailedInfoDescription'),
      tokenCost: 50,
      href: '/request/detailed-info',
    },
    {
      title: t('homeScreen.requestLinkMitigationAdvices'),
      icon: () => (
        <MaterialCommunityIcons
          name="shield-check-outline"
          size={24}
          color={colors.MAIN_RED}
        />
      ),
      description: t('homeScreen.requestLinkMitigationAdvicesDescription'),
      tokenCost: 100,
      href: '/request/mitigation-advices',
    },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        {requestLinkOptions.map((requestLinkOption) => (
          <RequestLink key={requestLinkOption.title} {...requestLinkOption} />
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
