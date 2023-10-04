import { useEffect, useState } from 'react';
import { Stack, SplashScreen } from 'expo-router';
import { performTimeConsumingTask } from '../utils/functions';
import { useUserStore } from '../store/userStore';
import * as SecureStore from 'expo-secure-store';
import { getProfile } from '../api/user';

SplashScreen.preventAutoHideAsync();

const _layout = () => {
  const [ready, setReady] = useState(false);
  const { setUserData, resetUserData } = useUserStore();

  useEffect(() => {
    performTimeConsumingTask().then(async () => {
      try {
        const access_token = await SecureStore.getItemAsync('access_token');
        if (access_token === null) throw new Error();
        const data = await getProfile(access_token);
        const { email, username } = data.data;
        setUserData({
          access_token,
          email,
          username,
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
    />
  );
};

export default _layout;
