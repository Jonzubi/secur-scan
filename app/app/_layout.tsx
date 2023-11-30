import { useEffect, useState } from 'react';
import { Stack, SplashScreen } from 'expo-router';
import { performTimeConsumingTask } from '../utils/functions';
import { useUserStore } from '../store/userStore';
import * as SecureStore from 'expo-secure-store';
import { getProfile } from '../api/user';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'i18next';
import eng_json from '../i18n/eng.json';
import Header from '../components/Header/Header';

SplashScreen.preventAutoHideAsync();

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    eng: {
      translation: eng_json,
    },
  },
  returnNull: false,
  fallbackLng: 'eng',
  interpolation: {
    escapeValue: false,
  },
});

const _layout = () => {
  const [ready, setReady] = useState(false);
  const { setUserData, resetUserData } = useUserStore();

  useEffect(() => {
    performTimeConsumingTask().then(async () => {
      try {
        const access_token = await SecureStore.getItemAsync('access_token');
        if (access_token === null) throw new Error();
        const data = await getProfile(access_token);
        const { email, tier, tokens, userId } = data.data;
        setUserData({
          userId,
          access_token,
          email,
          tier,
          tokens,
        });
      } catch (error) {
        resetUserData();
      } finally {
        setReady(true);
      }
    });
  }, []);

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          headerShown: true,
          header: () => <Header />,
        }}
      />
    </Stack>
  );
};

export default _layout;
