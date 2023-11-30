import { Tabs } from 'expo-router';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import colors from '../../constants/colors';
import io from 'socket.io-client';
import { useEffect } from 'react';
import { useUserStore } from '../../store/userStore';

export default function Layout() {
  const { userId } = useUserStore();
  useEffect(() => {
    const socket = io(`${process.env.EXPO_PUBLIC_API_URL}`, {
      query: {
        userId,
      },
    });

    socket.on('requestFinished', () => {
      console.log('Request finished');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.BACKGROUND,
          borderTopColor: colors.GRAY,
          borderTopWidth: 1,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={focused ? colors.MAIN_RED : colors.WHITE}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="operations"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Fontisto
              name="history"
              size={24}
              color={focused ? colors.MAIN_RED : colors.WHITE}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={24}
              color={focused ? colors.MAIN_RED : colors.WHITE}
            />
          ),
        }}
      />
    </Tabs>
  );
}
