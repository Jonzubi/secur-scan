import { View, Text } from 'react-native';
import {} from 'react';
import styles from './ProfileScreen.styles';
import LogOutButton from '../../components/LogOutButton/LogOutButton';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <LogOutButton />
    </View>
  );
};

export default ProfileScreen;
