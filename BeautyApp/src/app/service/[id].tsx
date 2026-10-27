import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card, MasterRow, PrimaryButton, SectionTitle } from '../../components/ui';
import { getCategory, getService, LEVEL_INFO, mastersForCategory, priceForLevel, priceForMaster, VISIT_FEE } from '../../data/catalog';
import { colors, spacing } from '../../theme';
import { formatDuration, formatPrice } from '../../utils/format';

export default function ServiceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const service = getService(id);
  if (!service) return <Text style={{ padding: spacing.lg }}>Услуга не найдена</Text>;
  const category = getCategory(service.categoryId);
  const serviceMasters = mastersForCategory(service.categoryId);
  const from = service.priceFrom ? 'от ' : '';

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 24 }}>
        <Text style={{ fontSize: 44 }}>{category?.emoji}</Text>
        <Text style={{ fontSize: 24, fontWeight: '800', color: colors.text, marginTop: spacing.sm }}>{service.title}</Text>
        <Text style={{ color: colors.textMuted, marginTop: 4 }}>
          <Ionicons name="time-outline" size={14} /> {formatDuration(service.durationMin)}
        </Text>
        {service.description ? (
          <Text style={{ color: colors.text, fontSize: 15, lineHeight: 22, marginTop: spacing.md }}>{service.description}</Text>
        ) : null}

        <SectionTitle title="Стоимость" />
        <Card style={{ gap: spacing.sm }}>
          <PriceLine label={LEVEL_INFO.master.title} value={`${from}${formatPrice(service.price)}`} />
          <PriceLine label={LEVEL_INFO.top.title} value={`${from}${formatPrice(priceForLevel(service, 'top'))}`} />
          <PriceLine label="Выезд на дом" value={`+${formatPrice(VISIT_FEE)}`} muted />
        </Card>

        {service.addOns?.length ? (
          <>
            <SectionTitle title="Дополнительно" />
            <Card style={{ gap: spacing.sm }}>
              {service.addOns.map((a) => (
                <PriceLine key={a.id} label={a.title} value={`+${formatPrice(a.price)}`} />
              ))}
            </Card>
          </>
        ) : null}

        <SectionTitle title="Мастера" />
        {serviceMasters.map((m) => (
          <MasterRow
            key={m.id}
            master={m}
            onPress={() => router.push({ pathname: '/booking/[serviceId]', params: { serviceId: service.id, masterId: m.id } })}
            right={<Text style={{ fontWeight: '700', color: colors.text }}>{from}{formatPrice(priceForMaster(service, m))}</Text>}
          />
        ))}
      </ScrollView>
      <View style={{ padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.surface }}>
        <PrimaryButton title="Записаться" onPress={() => router.push(`/booking/${service.id}`)} />
      </View>
    </SafeAreaView>
  );
}

function PriceLine({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md }}>
      <Text style={{ color: muted ? colors.textMuted : colors.text, flex: 1 }}>{label}</Text>
      <Text style={{ fontWeight: '700', color: muted ? colors.textMuted : colors.text }}>{value}</Text>
    </View>
  );
}
