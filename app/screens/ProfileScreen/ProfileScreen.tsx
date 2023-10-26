import { View, Text } from 'react-native';
import React from 'react';
import { useUserStore } from '../../store/userStore';

const ProfileScreen = () => {
  const { tier, tokens } = useUserStore();
  console.log(tier, tokens);
  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;
