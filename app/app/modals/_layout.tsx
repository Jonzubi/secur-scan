import { useTranslation } from 'react-i18next';
import colors from '../../constants/colors';
import { Stack } from 'expo-router';

const _layout = () => {
  const { t } = useTranslation();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTintColor: colors.WHITE,
        headerStyle: {
          backgroundColor: colors.BACKGROUND,
        },
      }}
    >
      <Stack.Screen
        name="resolve-dns"
        options={{
          headerTitle: t('resolveDnsScreen.title'),
        }}
      />
      <Stack.Screen
        name="scan-ip"
        options={{
          headerTitle: t('scanIpScreen.title'),
        }}
      />
    </Stack>
  );
};

export default _layout;
