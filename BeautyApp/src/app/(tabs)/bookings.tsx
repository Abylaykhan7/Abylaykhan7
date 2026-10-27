import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';

import { Accent, Avatar, Button, Card, Chip, Heading } from '../../components/ui';
import { getService, getSpecialist } from '../../data/catalog';
import { Booking, useAppStore } from '../../store/AppStore';
import { colors, fonts, radius, spacing } from '../../theme';
import { formatDateLong, formatPrice } from '../../utils/format';

const STATUS: Record<Booking['status'], { label: string; color: string }> = {
  upcoming: { label: 'Предстоит', color: colors.success },
  cancelled: { label: 'Отменена', color: colors.danger },
  completed: { label: 'Завершена', color: colors.textMuted },
};

export default function BookingsScreen() {
  const { bookings, cancelBooking } = useAppStore();
  const [tab, setTab] = useState<'upcoming' | 'history'>('upcoming');
  const list = bookings.filter((b) => (tab === 'upcoming' ? b.status === 'upcoming' : b.status !== 'upcoming'));

  const confirmCancel = (b: Booking) =>
    Alert.alert('Отменить запись?', 'Бесплатная отмена — не позднее чем за 24 часа до визита.', [
      { text: 'Нет', style: 'cancel' },
      { text: 'Отменить', style: 'destructive', onPress: () => cancelBooking(b.id) },
    ]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', gap: spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.md }}>
        <Chip label="Предстоящие" active={tab === 'upcoming'} onPress={() => setTab('upcoming')} />
        <Chip label="История" active={tab === 'history'} onPress={() => setTab('history')} />
      </View>
      <FlatList
        data={list}
        keyExtractor={(b) => b.id}
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 48, gap: spacing.md }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 60, gap: spacing.md, paddingHorizontal: spacing.xl }}>
            <Heading size={30} style={{ textAlign: 'center' }}>
              Пока <Accent>пусто</Accent>
            </Heading>
            <Text style={st.muted}>Запишитесь на образ или съёмку — запись появится здесь.</Text>
            <Button title="Выбрать пакет" onPress={() => router.push('/catalog')} style={{ alignSelf: 'stretch' }} />
          </View>
        }
        renderItem={({ item }) => {
          const service = getService(item.serviceId);
          const person = getSpecialist(item.specialistId);
          if (!service || !person) return null;
          return (
            <Card style={{ gap: spacing.md }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={st.muted}>№ {item.id}</Text>
                <View style={[st.badge, { borderColor: STATUS[item.status].color }]}>
                  <Text style={[st.badgeText, { color: STATUS[item.status].color }]}>{STATUS[item.status].label}</Text>
                </View>
              </View>
              <Heading size={26}>{service.title}</Heading>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                <Avatar person={person} size={36} />
                <View>
                  <Text style={st.strong}>{person.name}</Text>
                  <Text style={st.muted}>{person.title}</Text>
                </View>
              </View>
              <View style={st.infoBox}>
                <Text style={st.info}>{formatDateLong(item.dateKey)}, {item.time}</Text>
                <Text style={st.info}>{item.address}</Text>
              </View>
              <Text style={[st.strong, { fontSize: 18 }]}>{formatPrice(item.total)}</Text>
              {item.status === 'upcoming' ? (
                <Button title="Отменить запись" variant="outline" onPress={() => confirmCancel(item)} />
              ) : (
                <Button title="Записаться снова" variant="outline" onPress={() => router.push(`/booking/${item.serviceId}`)} />
              )}
            </Card>
          );
        }}
      />
    </View>
  );
}

const st = StyleSheet.create({
  muted: { fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted, textAlign: 'center' },
  strong: { fontFamily: fonts.sansBold, fontSize: 14, color: colors.ink },
  badge: { borderWidth: 1, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 3 },
  badgeText: { fontFamily: fonts.sansMedium, fontSize: 11 },
  infoBox: { backgroundColor: colors.cream, borderRadius: radius.sm, padding: spacing.md, gap: 4 },
  info: { fontFamily: fonts.sans, fontSize: 14, color: colors.ink },
});
