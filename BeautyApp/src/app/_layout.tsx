import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppStoreProvider } from '../store/AppStore';
import { colors } from '../theme';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppStoreProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerTintColor: colors.text,
            headerStyle: { backgroundColor: colors.background },
            headerShadowVisible: false,
            headerBackTitle: 'Назад',
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="category/[id]" options={{ title: '' }} />
          <Stack.Screen name="service/[id]" options={{ title: 'Услуга' }} />
          <Stack.Screen name="master/[id]" options={{ title: 'Мастер' }} />
          <Stack.Screen name="booking/[serviceId]" options={{ title: 'Запись' }} />
          <Stack.Screen name="booking-success" options={{ headerShown: false, gestureEnabled: false }} />
        </Stack>
      </AppStoreProvider>
    </SafeAreaProvider>
  );
}
