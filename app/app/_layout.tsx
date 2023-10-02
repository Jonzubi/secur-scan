import { useEffect, useState } from 'react';
import { Stack, SplashScreen } from 'expo-router';
import { performTimeConsumingTask } from '../utils/functions';
import { useUserStore } from '../store/userStore';
import * as SecureStore from 'expo-secure-store';
import { getProfile } from '../api/user';

SplashScreen.preventAutoHideAsync();

const _layout = () => {
  const [ready, setReady] = useState(false);
  const { setUserData } = useUserStore();

  useEffect(() => {
    performTimeConsumingTask().then(async () => {
      try {
        const access_token = await SecureStore.getItemAsync('access_token');
        if (access_token === null) throw new Error();
        const data = await getProfile(access_token);
        const json = await data.json();
        const { email, username } = json;
        setUserData({
          access_token,
          email,
          username,
        });
      } catch (error) {
        console.log(JSON.stringify(error));
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

  return <Stack />;
};

export default _layout;
