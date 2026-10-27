import {
  CormorantGaramond_500Medium_Italic,
  CormorantGaramond_600SemiBold,
  useFonts as useSerifFonts,
} from '@expo-google-fonts/cormorant-garamond';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, useFonts as useSansFonts } from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppStoreProvider } from '../store/AppStore';
import { colors, fonts } from '../theme';

export default function RootLayout() {
  const [serifLoaded] = useSerifFonts({ CormorantGaramond_600SemiBold, CormorantGaramond_500Medium_Italic });
  const [sansLoaded] = useSansFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold });

  if (!serifLoaded || !sansLoaded) return <View style={{ flex: 1, backgroundColor: colors.ink }} />;

  return (
    <SafeAreaProvider>
      <AppStoreProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerTintColor: colors.ink,
            headerStyle: { backgroundColor: colors.cream },
            headerTitleStyle: { fontFamily: fonts.serif, fontSize: 22 },
            headerShadowVisible: false,
            headerBackTitle: 'Назад',
            contentStyle: { backgroundColor: colors.cream },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="service/[id]" options={{ title: '' }} />
          <Stack.Screen name="specialist/[id]" options={{ title: '' }} />
          <Stack.Screen name="booking/[serviceId]" options={{ title: 'Запись' }} />
          <Stack.Screen name="booking-success" options={{ headerShown: false, gestureEnabled: false }} />
        </Stack>
      </AppStoreProvider>
    </SafeAreaProvider>
  );
}
