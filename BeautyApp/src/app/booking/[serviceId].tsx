import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card, Chip, MasterRow, PrimaryButton, SectionTitle } from '../../components/ui';
import {
  getService,
  isSlotBusy,
  mastersForCategory,
  priceForMaster,
  PROMO_CODES,
  TIME_SLOTS,
  VISIT_FEE,
  VisitFormat,
} from '../../data/catalog';
import { PaymentMethod, useAppStore } from '../../store/AppStore';
import { colors, radius, spacing } from '../../theme';
import { formatPrice, toDateKey, upcomingDays, weekdayShort } from '../../utils/format';

const PAYMENTS: { id: PaymentMethod; label: string }[] = [
  { id: 'kaspi', label: 'Kaspi' },
  { id: 'card', label: 'Картой' },
  { id: 'cash', label: 'Наличными' },
];

export default function BookingScreen() {
  const params = useLocalSearchParams<{ serviceId: string; masterId?: string }>();
  const service = getService(params.serviceId);
  const { profile, addBooking, updateProfile } = useAppStore();

  const days = useMemo(() => upcomingDays(14), []);
  const serviceMasters = service ? mastersForCategory(service.categoryId) : [];

  const [masterId, setMasterId] = useState(params.masterId ?? serviceMasters[0]?.id);
  const [dateKey, setDateKey] = useState(toDateKey(days[0]));
  const [time, setTime] = useState<string>();
  const [format, setFormat] = useState<VisitFormat>('home');
  const [address, setAddress] = useState(profile.address);
  const [addOnIds, setAddOnIds] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [payment, setPayment] = useState<PaymentMethod>('kaspi');
  const [promoInput, setPromoInput] = useState('');
  const [promo, setPromo] = useState<string>();

  if (!service) return <Text style={{ padding: spacing.lg }}>Услуга не найдена</Text>;

  const master = serviceMasters.find((m) => m.id === masterId);
  const base = priceForMaster(service, master);
  const addOnsTotal = (service.addOns ?? []).filter((a) => addOnIds.includes(a.id)).reduce((sum, a) => sum + a.price, 0);
  const visitFee = format === 'home' ? VISIT_FEE : 0;
  const subtotal = base + addOnsTotal + visitFee;
  const discount = promo ? Math.round(subtotal * PROMO_CODES[promo]) : 0;
  const total = subtotal - discount;

  const now = new Date();
  const isToday = dateKey === toDateKey(now);
  const slotDisabled = (slot: string) =>
    !master ||
    isSlotBusy(master.id, dateKey, slot) ||
    (isToday && Number(slot.slice(0, 2)) <= now.getHours());

  const toggleAddOn = (id: string) =>
    setAddOnIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) setPromo(code);
    else Alert.alert('Промокод не найден', 'Проверьте написание кода.');
  };

  const phoneDigits = phone.replace(/\D/g, '');
  const canSubmit =
    !!master && !!time && name.trim().length > 1 && phoneDigits.length >= 10 && (format === 'studio' || address.trim().length > 4);

  const submit = () => {
    if (!master || !time) return;
    updateProfile({ name: name.trim(), phone: phone.trim(), ...(format === 'home' ? { address: address.trim() } : {}) });
    const booking = addBooking({
      serviceId: service.id,
      masterId: master.id,
      addOnIds,
      dateKey,
      time,
      format,
      address: format === 'home' ? address.trim() : '',
      comment: comment.trim(),
      payment,
      promoCode: promo,
      total,
    });
    router.replace({ pathname: '/booking-success', params: { id: booking.id } });
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={90}>
        <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 24 }} keyboardShouldPersistTaps="handled">
          <Text style={s.title}>{service.title}</Text>

          <SectionTitle title="1. Мастер" />
          {serviceMasters.map((m) => (
            <MasterRow
              key={m.id}
              master={m}
              selected={m.id === masterId}
              onPress={() => {
                setMasterId(m.id);
                setTime(undefined);
              }}
              right={<Text style={{ fontWeight: '700', color: colors.text }}>{formatPrice(priceForMaster(service, m))}</Text>}
            />
          ))}

          <SectionTitle title="2. Дата и время" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm }}>
            {days.map((d) => {
              const key = toDateKey(d);
              const active = key === dateKey;
              return (
                <Pressable
                  key={key}
                  onPress={() => {
                    setDateKey(key);
                    setTime(undefined);
                  }}
                  style={[s.day, active && s.dayActive]}
                >
                  <Text style={[s.dayWeek, active && { color: '#fff' }]}>{weekdayShort(d)}</Text>
                  <Text style={[s.dayNum, active && { color: '#fff' }]}>{d.getDate()}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
          <View style={s.slots}>
            {TIME_SLOTS.map((slot) => {
              const disabled = slotDisabled(slot);
              const active = slot === time;
              return (
                <Pressable
                  key={slot}
                  disabled={disabled}
                  onPress={() => setTime(slot)}
                  style={[s.slot, active && s.slotActive, disabled && s.slotDisabled]}
                >
                  <Text style={[s.slotText, active && { color: '#fff' }, disabled && { textDecorationLine: 'line-through' }]}>
                    {slot}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <SectionTitle title="3. Где" />
          <View style={{ flexDirection: 'row', gap: spacing.sm }}>
            <Chip label={`🏠 Выезд на дом (+${formatPrice(VISIT_FEE)})`} active={format === 'home'} onPress={() => setFormat('home')} />
            <Chip label="🏢 В студии" active={format === 'studio'} onPress={() => setFormat('studio')} />
          </View>
          {format === 'home' ? (
            <TextInput
              value={address}
              onChangeText={setAddress}
              placeholder={`${profile.city}, улица, дом, квартира`}
              placeholderTextColor={colors.textMuted}
              style={[s.input, { marginTop: spacing.md }]}
            />
          ) : null}

          {service.addOns?.length ? (
            <>
              <SectionTitle title="4. Дополнительно" />
              <Card style={{ padding: 0 }}>
                {service.addOns.map((a, i) => {
                  const checked = addOnIds.includes(a.id);
                  return (
                    <Pressable
                      key={a.id}
                      onPress={() => toggleAddOn(a.id)}
                      style={[s.addOn, i < service.addOns!.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }]}
                    >
                      <Ionicons name={checked ? 'checkbox' : 'square-outline'} size={22} color={colors.primary} />
                      <Text style={{ flex: 1, color: colors.text }}>{a.title}</Text>
                      <Text style={{ fontWeight: '600', color: colors.text }}>+{formatPrice(a.price)}</Text>
                    </Pressable>
                  );
                })}
              </Card>
            </>
          ) : null}

          <SectionTitle title="Контакты" />
          <View style={{ gap: spacing.sm }}>
            <TextInput value={name} onChangeText={setName} placeholder="Ваше имя" placeholderTextColor={colors.textMuted} style={s.input} />
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="+7 7__ ___ __ __"
              placeholderTextColor={colors.textMuted}
              keyboardType="phone-pad"
              style={s.input}
            />
            <TextInput
              value={comment}
              onChangeText={setComment}
              placeholder="Комментарий мастеру (пожелания, референсы, домофон)"
              placeholderTextColor={colors.textMuted}
              multiline
              style={[s.input, { minHeight: 70, textAlignVertical: 'top' }]}
            />
          </View>

          <SectionTitle title="Оплата" />
          <View style={{ flexDirection: 'row', gap: spacing.sm }}>
            {PAYMENTS.map((p) => (
              <Chip key={p.id} label={p.label} active={payment === p.id} onPress={() => setPayment(p.id)} />
            ))}
          </View>
          <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: spacing.sm }}>Оплата мастеру после оказания услуги.</Text>

          <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md }}>
            <TextInput
              value={promoInput}
              onChangeText={setPromoInput}
              placeholder="Промокод"
              autoCapitalize="characters"
              placeholderTextColor={colors.textMuted}
              style={[s.input, { flex: 1, minWidth: 0 }]}
            />
            <PrimaryButton title="Применить" variant="outline" onPress={applyPromo} style={{ paddingHorizontal: spacing.lg, paddingVertical: 11 }} />
          </View>

          <Card style={{ marginTop: spacing.lg, gap: spacing.sm }}>
            <Line label={service.title} value={`${service.priceFrom ? 'от ' : ''}${formatPrice(base)}`} />
            {addOnsTotal ? <Line label="Доп. услуги" value={formatPrice(addOnsTotal)} /> : null}
            {visitFee ? <Line label="Выезд мастера" value={formatPrice(visitFee)} /> : null}
            {discount ? <Line label={`Промокод ${promo}`} value={`−${formatPrice(discount)}`} color={colors.success} /> : null}
            <View style={{ height: 1, backgroundColor: colors.border }} />
            <Line label="Итого" value={formatPrice(total)} bold />
          </Card>
        </ScrollView>

        <View style={s.footer}>
          <PrimaryButton
            title={time ? `Записаться · ${formatPrice(total)}` : 'Выберите время'}
            disabled={!canSubmit}
            onPress={submit}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Line({ label, value, bold, color }: { label: string; value: string; bold?: boolean; color?: string }) {
  const style = { color: color ?? colors.text, fontWeight: bold ? ('800' as const) : ('500' as const), fontSize: bold ? 17 : 14 };
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md }}>
      <Text style={[style, { flex: 1 }]}>{label}</Text>
      <Text style={style}>{value}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800', color: colors.text },
  day: {
    width: 54,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dayActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  dayWeek: { color: colors.textMuted, fontSize: 12 },
  dayNum: { color: colors.text, fontSize: 18, fontWeight: '700' },
  slots: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  slot: {
    width: '22.5%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  slotActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  slotDisabled: { opacity: 0.35 },
  slotText: { color: colors.text, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  addOn: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md },
  footer: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.surface },
});
