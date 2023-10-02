import { useEffect, useState } from 'react';
import { Stack, SplashScreen } from 'expo-router';

SplashScreen.preventAutoHideAsync();

const _layout = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setReady(true);
      SplashScreen.hideAsync();
    }, 5000);
  }, []);

  if (!ready) {
    return null;
  }

  return <Stack />;
};

export default _layout;
