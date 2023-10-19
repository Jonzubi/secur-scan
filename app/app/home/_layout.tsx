import { Tabs } from 'expo-router';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import colors from '../../constants/colors';

export default function Layout() {
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
    </Tabs>
  );
}
