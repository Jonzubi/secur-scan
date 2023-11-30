import { useUserStore } from '../store/userStore';
import { Redirect } from 'expo-router';

const index = () => {
  const { access_token } = useUserStore();

  if (access_token === '') {
    return <Redirect href={'/auth/login'} />;
  }
  return <Redirect href={'/home/'} />;
};

export default index;
