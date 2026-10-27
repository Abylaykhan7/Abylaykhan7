import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { ComponentProps } from 'react';
import { ColorValue } from 'react-native';

import { useAppStore } from '../../store/AppStore';
import { colors } from '../../theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

const icon =
  (name: IconName) =>
  ({ color, size }: { color: ColorValue; size: number }) => <Ionicons name={name} color={color as string} size={size} />;

export default function TabsLayout() {
  const { bookings } = useAppStore();
  const upcoming = bookings.filter((b) => b.status === 'upcoming').length;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerTitleStyle: { fontWeight: '700' },
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Главная', headerShown: false, tabBarIcon: icon('home-outline') }} />
      <Tabs.Screen name="catalog" options={{ title: 'Каталог', tabBarIcon: icon('grid-outline') }} />
      <Tabs.Screen name="masters" options={{ title: 'Мастера', tabBarIcon: icon('people-outline') }} />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Мои записи',
          tabBarIcon: icon('calendar-outline'),
          tabBarBadge: upcoming > 0 ? upcoming : undefined,
        }}
      />
      <Tabs.Screen name="profile" options={{ title: 'Профиль', tabBarIcon: icon('person-outline') }} />
    </Tabs>
  );
}
