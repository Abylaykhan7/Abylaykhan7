import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';

import { Avatar, Badge, Card, Chip, PrimaryButton } from '../../components/ui';
import { getMaster, getService } from '../../data/catalog';
import { Booking, useAppStore } from '../../store/AppStore';
import { colors, spacing } from '../../theme';
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
    Alert.alert('Отменить запись?', 'Бесплатная отмена — не позднее чем за 3 часа до визита.', [
      { text: 'Нет', style: 'cancel' },
      { text: 'Отменить', style: 'destructive', onPress: () => cancelBooking(b.id) },
    ]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', gap: spacing.sm, padding: spacing.lg }}>
        <Chip label="Предстоящие" active={tab === 'upcoming'} onPress={() => setTab('upcoming')} />
        <Chip label="История" active={tab === 'history'} onPress={() => setTab('history')} />
      </View>
      <FlatList
        data={list}
        keyExtractor={(b) => b.id}
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 40, gap: spacing.md }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 60, gap: spacing.md }}>
            <Text style={{ fontSize: 48 }}>🗓️</Text>
            <Text style={{ color: colors.textMuted }}>Здесь пока пусто</Text>
            <PrimaryButton title="Выбрать услугу" onPress={() => router.push('/catalog')} style={{ paddingHorizontal: 30 }} />
          </View>
        }
        renderItem={({ item }) => {
          const service = getService(item.serviceId);
          const master = getMaster(item.masterId);
          if (!service || !master) return null;
          return (
            <Card style={{ gap: spacing.sm }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: colors.textMuted }}>№ {item.id}</Text>
                <Badge label={STATUS[item.status].label} color={STATUS[item.status].color} />
              </View>
              <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>{service.title}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
                <Avatar master={master} size={32} />
                <Text style={{ color: colors.text }}>{master.name}</Text>
              </View>
              <Text style={{ color: colors.text }}>
                📅 {formatDateLong(item.dateKey)}, {item.time}
              </Text>
              <Text style={{ color: colors.text }}>
                📍 {item.format === 'home' ? `Выезд: ${item.address}` : 'В студии мастера'}
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>{formatPrice(item.total)}</Text>
              {item.status === 'upcoming' ? (
                <PrimaryButton title="Отменить запись" variant="outline" onPress={() => confirmCancel(item)} />
              ) : (
                <PrimaryButton title="Записаться снова" variant="outline" onPress={() => router.push(`/service/${item.serviceId}`)} />
              )}
            </Card>
          );
        }}
      />
    </View>
  );
}
