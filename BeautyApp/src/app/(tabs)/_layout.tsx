import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { ComponentProps } from 'react';
import { ColorValue } from 'react-native';

import { useAppStore } from '../../store/AppStore';
import { colors, fonts } from '../../theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

const icon =
  (name: IconName) =>
  ({ color, size }: { color: ColorValue; size: number }) => <Ionicons name={name} color={color as string} size={size - 2} />;

export default function TabsLayout() {
  const { bookings } = useAppStore();
  const upcoming = bookings.filter((b) => b.status === 'upcoming').length;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.textOnDarkMuted,
        tabBarStyle: { backgroundColor: colors.ink, borderTopColor: colors.inkLine },
        tabBarLabelStyle: { fontFamily: fonts.sansMedium, fontSize: 11, lineHeight: 14 },
        tabBarBadgeStyle: { backgroundColor: colors.gold, color: colors.ink, fontFamily: fonts.sansBold },
        headerStyle: { backgroundColor: colors.cream },
        headerShadowVisible: false,
        headerTitleStyle: { fontFamily: fonts.serif, fontSize: 26, color: colors.ink },
        headerTitleAlign: 'left',
        sceneStyle: { backgroundColor: colors.cream },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Главная', headerShown: false, tabBarIcon: icon('sparkles-outline') }} />
      <Tabs.Screen name="catalog" options={{ title: 'Услуги', tabBarIcon: icon('albums-outline') }} />
      <Tabs.Screen name="team" options={{ title: 'Команда', tabBarIcon: icon('people-outline') }} />
      <Tabs.Screen
        name="bookings"
        options={{ title: 'Записи', tabBarIcon: icon('calendar-outline'), tabBarBadge: upcoming > 0 ? upcoming : undefined }}
      />
      <Tabs.Screen name="profile" options={{ title: 'Профиль', tabBarIcon: icon('person-outline') }} />
    </Tabs>
  );
}
