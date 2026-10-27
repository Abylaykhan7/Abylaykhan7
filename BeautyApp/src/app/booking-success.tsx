import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Accent, Button, Eyebrow, Heading } from '../components/ui';
import { getService, getSpecialist } from '../data/catalog';
import { useAppStore } from '../store/AppStore';
import { colors, fonts, gradients, radius, spacing } from '../theme';
import { formatDateLong, formatPrice } from '../utils/format';

export default function BookingSuccessScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { bookings } = useAppStore();
  const booking = bookings.find((b) => b.id === id);
  const service = booking && getService(booking.serviceId);
  const person = booking && getSpecialist(booking.specialistId);

  return (
    <LinearGradient colors={gradients.ink} style={{ flex: 1 }}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1, padding: spacing.lg, justifyContent: 'center', gap: spacing.xl }}>
        <View style={{ alignItems: 'center', gap: spacing.md }}>
          <View style={st.ring}>
            <Ionicons name="checkmark" size={36} color={colors.gold} />
          </View>
          <Eyebrow dark>Запись создана</Eyebrow>
          <Heading dark size={40} style={{ textAlign: 'center' }}>
            До встречи <Accent dark>в кадре</Accent>
          </Heading>
          <Text style={st.text}>Мы подтвердим запись в WhatsApp и пришлём детали оплаты через Kaspi.</Text>
        </View>
        {booking && service && person ? (
          <View style={st.card}>
            <Text style={st.title}>{service.title}</Text>
            <Row icon="person-outline" text={`${person.name} · ${person.title}`} />
            <Row icon="calendar-outline" text={`${formatDateLong(booking.dateKey)}, ${booking.time}`} />
            <Row icon="location-outline" text={booking.address} />
            {booking.occasion ? <Row icon="sparkles-outline" text={booking.occasion} /> : null}
            <Text style={st.total}>{formatPrice(booking.total)}</Text>
          </View>
        ) : null}
        <View style={{ gap: spacing.sm }}>
          <Button title="Мои записи" variant="gold" onPress={() => router.replace('/bookings')} />
          <Button title="На главную" variant="outlineDark" onPress={() => router.replace('/')} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

function Row({ icon, text }: { icon: ComponentProps<typeof Ionicons>['name']; text: string }) {
  return (
    <View style={{ flexDirection: 'row', gap: spacing.sm, alignItems: 'center' }}>
      <Ionicons name={icon} size={16} color={colors.gold} />
      <Text style={st.row}>{text}</Text>
    </View>
  );
}

const st = StyleSheet.create({
  ring: { width: 80, height: 80, borderRadius: 40, borderWidth: 1, borderColor: colors.gold, alignItems: 'center', justifyContent: 'center' },
  text: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 22, color: colors.textOnDarkMuted, textAlign: 'center' },
  card: { borderWidth: 1, borderColor: 'rgba(212,180,140,0.4)', borderRadius: radius.lg, padding: spacing.lg, gap: spacing.sm },
  title: { fontFamily: fonts.serif, fontSize: 26, color: colors.textOnDark },
  row: { flex: 1, fontFamily: fonts.sans, fontSize: 14, color: colors.textOnDark },
  total: { fontFamily: fonts.sansBold, fontSize: 20, color: colors.gold, marginTop: spacing.sm },
});
