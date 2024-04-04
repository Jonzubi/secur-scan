import { View, ScrollView } from 'react-native';
import {} from 'react';
import styles from './HomeScreen.styles';
import RequestLink, {
  RequestLinkProps,
} from '../../components/RequestLink/RequestLink';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { RequestType } from '@jonzubi/securscan-shared';

const HomeScreen = () => {
  const { t } = useTranslation();

  const requestLinkOptions: RequestLinkProps[] = [
    {
      title: t('homeScreen.requestLinkResolveDomain'),
      icon: () => (
        <MaterialCommunityIcons name="web" size={24} color={colors.MAIN_RED} />
      ),
      description: t('homeScreen.requestLinkResolveDomainDescription'),
      requestType: RequestType.RESOLVE_DNS,
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
      requestType: RequestType.SCAN_IP,
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
      requestType: RequestType.DETAILED_SCAN,
    },
    // {
    //   title: t('homeScreen.requestLinkMitigationAdvices'),
    //   icon: () => (
    //     <MaterialCommunityIcons
    //       name="shield-check-outline"
    //       size={24}
    //       color={colors.MAIN_RED}
    //     />
    //   ),
    //   description: t('homeScreen.requestLinkMitigationAdvicesDescription'),
    //   requestType: RequestType.MITIGATION_ADVICES,
    // },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewContainer}>
        {requestLinkOptions.map((requestLinkOption) => (
          <RequestLink key={requestLinkOption.title} {...requestLinkOption} />
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
