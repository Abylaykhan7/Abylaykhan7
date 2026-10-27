import { router, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card, PrimaryButton } from '../components/ui';
import { getMaster, getService } from '../data/catalog';
import { useAppStore } from '../store/AppStore';
import { colors, spacing } from '../theme';
import { formatDateLong, formatPrice } from '../utils/format';

export default function BookingSuccessScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { bookings } = useAppStore();
  const booking = bookings.find((b) => b.id === id);
  const service = booking && getService(booking.serviceId);
  const master = booking && getMaster(booking.masterId);

  return (
    <SafeAreaView style={{ flex: 1, padding: spacing.lg, justifyContent: 'center', gap: spacing.lg }}>
      <View style={{ alignItems: 'center', gap: spacing.sm }}>
        <Text style={{ fontSize: 64 }}>🎉</Text>
        <Text style={{ fontSize: 24, fontWeight: '800', color: colors.text }}>Вы записаны!</Text>
        <Text style={{ color: colors.textMuted, textAlign: 'center' }}>
          Мастер подтвердит запись и свяжется с вами по телефону.
        </Text>
      </View>
      {booking && service && master ? (
        <Card style={{ gap: spacing.sm }}>
          <Text style={{ fontWeight: '700', fontSize: 16, color: colors.text }}>{service.title}</Text>
          <Text style={{ color: colors.text }}>👤 {master.name}</Text>
          <Text style={{ color: colors.text }}>
            📅 {formatDateLong(booking.dateKey)}, {booking.time}
          </Text>
          <Text style={{ color: colors.text }}>📍 {booking.format === 'home' ? booking.address : 'В студии мастера'}</Text>
          <Text style={{ fontWeight: '800', fontSize: 17, color: colors.text }}>{formatPrice(booking.total)}</Text>
        </Card>
      ) : null}
      <PrimaryButton title="Мои записи" onPress={() => router.replace('/bookings')} />
      <PrimaryButton title="На главную" variant="outline" onPress={() => router.replace('/')} />
    </SafeAreaView>
  );
}
