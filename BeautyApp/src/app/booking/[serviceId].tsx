import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { ReactNode, useMemo, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Card, Chip, Eyebrow, Heading, SpecialistRow } from '../../components/ui';
import { getService, isSlotBusy, MIN_LEAD_HOURS, occasions, PROMO_CODES, specialistsForService, TIME_SLOTS } from '../../data/catalog';
import { PaymentMethod, useAppStore } from '../../store/AppStore';
import { colors, fonts, radius, spacing } from '../../theme';
import { formatPrice, toDateKey, upcomingDays, weekdayShort } from '../../utils/format';

const PAYMENTS: { id: PaymentMethod; label: string }[] = [
  { id: 'kaspi', label: 'Kaspi' },
  { id: 'card', label: 'Картой' },
];

const MONTHS = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

export default function BookingScreen() {
  const params = useLocalSearchParams<{ serviceId: string; specialistId?: string; occasion?: string }>();
  const service = getService(params.serviceId);
  const { profile, addBooking, updateProfile } = useAppStore();

  const days = useMemo(() => upcomingDays(30), []);
  const team = service ? specialistsForService(service) : [];

  const [specialistId, setSpecialistId] = useState(params.specialistId ?? team[0]?.id);
  const [dateKey, setDateKey] = useState(toDateKey(days[1]));
  const [time, setTime] = useState<string>();
  const [address, setAddress] = useState(profile.address);
  const [occasion, setOccasion] = useState(params.occasion);
  const [addOnIds, setAddOnIds] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [payment, setPayment] = useState<PaymentMethod>('kaspi');
  const [promoInput, setPromoInput] = useState('');
  const [promo, setPromo] = useState<string>();

  if (!service) return <Text style={{ padding: spacing.lg }}>Услуга не найдена</Text>;

  const person = team.find((p) => p.id === specialistId);
  const addOnsTotal = (service.addOns ?? []).filter((a) => addOnIds.includes(a.id)).reduce((sum, a) => sum + a.price, 0);
  const subtotal = service.price + addOnsTotal;
  const discount = promo ? Math.round(subtotal * PROMO_CODES[promo]) : 0;
  const total = subtotal - discount;

  const earliest = Date.now() + MIN_LEAD_HOURS * 3600 * 1000;
  const slotDisabled = (slot: string) => {
    if (!person) return true;
    const [h, m] = slot.split(':').map(Number);
    const d = new Date(`${dateKey}T00:00:00`);
    d.setHours(h, m);
    return d.getTime() < earliest || isSlotBusy(person.id, dateKey, slot);
  };

  const toggleAddOn = (id: string) => setAddOnIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) setPromo(code);
    else Alert.alert('Промокод не найден', 'Проверьте написание кода.');
  };

  const canSubmit = !!person && !!time && name.trim().length > 1 && phone.replace(/\D/g, '').length >= 10 && address.trim().length > 4;

  const submit = () => {
    if (!person || !time) return;
    updateProfile({ name: name.trim(), phone: phone.trim(), address: address.trim() });
    const booking = addBooking({
      serviceId: service.id,
      specialistId: person.id,
      addOnIds,
      dateKey,
      time,
      address: address.trim(),
      occasion,
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
        <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingTop: 0, paddingBottom: spacing.xl }} keyboardShouldPersistTaps="handled">
          <Heading size={34}>{service.title}</Heading>
          <Text style={st.sub}>{service.team}</Text>

          <Step n={1} title={team.length > 1 ? 'Кто ведёт ваш образ' : 'Специалист'}>
            {team.map((p) => (
              <SpecialistRow
                key={p.id}
                person={p}
                selected={p.id === specialistId}
                onPress={() => {
                  setSpecialistId(p.id);
                  setTime(undefined);
                }}
              />
            ))}
          </Step>

          <Step n={2} title="Дата и время">
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
                    style={[st.day, active && st.dayActive]}
                  >
                    <Text style={[st.dayWeek, active && { color: colors.gold }]}>{weekdayShort(d)}</Text>
                    <Text style={[st.dayNum, active && { color: colors.textOnDark }]}>{d.getDate()}</Text>
                    <Text style={[st.dayWeek, active && { color: colors.textOnDarkMuted }]}>{MONTHS[d.getMonth()]}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>
            <View style={st.slots}>
              {TIME_SLOTS.map((slot) => {
                const disabled = slotDisabled(slot);
                const active = slot === time;
                return (
                  <Pressable key={slot} disabled={disabled} onPress={() => setTime(slot)} style={[st.slot, active && st.slotActive, disabled && { opacity: 0.3 }]}>
                    <Text style={[st.slotText, active && { color: colors.ink }, disabled && { textDecorationLine: 'line-through' }]}>{slot}</Text>
                  </Pressable>
                );
              })}
            </View>
            <Text style={st.hint}>Ранние сборы с 7:00 — для свадеб и тоев. Запись не позднее чем за {MIN_LEAD_HOURS} часа.</Text>
          </Step>

          <Step n={3} title="Куда приехать">
            <TextInput
              value={address}
              onChangeText={setAddress}
              placeholder={`${profile.city}: дом, отель, ресторан или локация`}
              placeholderTextColor={colors.textMuted}
              style={st.input}
            />
          </Step>

          <Step n={4} title="Повод">
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
              {occasions.map((o) => (
                <Chip key={o.id} label={o.title} active={occasion === o.title} onPress={() => setOccasion(occasion === o.title ? undefined : o.title)} />
              ))}
            </View>
          </Step>

          {service.addOns?.length ? (
            <Step n={5} title="Дополнительно">
              <Card style={{ padding: 0 }}>
                {service.addOns.map((a, i) => {
                  const checked = addOnIds.includes(a.id);
                  return (
                    <Pressable key={a.id} onPress={() => toggleAddOn(a.id)} style={[st.addOn, i > 0 && { borderTopWidth: 1, borderTopColor: colors.border }]}>
                      <View style={[st.check, checked && st.checkOn]}>{checked ? <Ionicons name="checkmark" size={14} color={colors.gold} /> : null}</View>
                      <Text style={st.addOnTitle}>{a.title}</Text>
                      <Text style={st.addOnPrice}>+{formatPrice(a.price)}</Text>
                    </Pressable>
                  );
                })}
              </Card>
            </Step>
          ) : null}

          <Step title="Контакты">
            <View style={{ gap: spacing.sm }}>
              <TextInput value={name} onChangeText={setName} placeholder="Ваше имя" placeholderTextColor={colors.textMuted} style={st.input} />
              <TextInput value={phone} onChangeText={setPhone} placeholder="+7 7__ ___ __ __" placeholderTextColor={colors.textMuted} keyboardType="phone-pad" style={st.input} />
              <TextInput
                value={comment}
                onChangeText={setComment}
                placeholder="Пожелания к образу, референсы, аллергии"
                placeholderTextColor={colors.textMuted}
                multiline
                style={[st.input, { minHeight: 80, textAlignVertical: 'top' }]}
              />
            </View>
          </Step>

          <Step title="Оплата">
            <View style={{ flexDirection: 'row', gap: spacing.sm }}>
              {PAYMENTS.map((p) => (
                <Chip key={p.id} label={p.label} active={payment === p.id} onPress={() => setPayment(p.id)} />
              ))}
            </View>
            <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md }}>
              <TextInput
                value={promoInput}
                onChangeText={setPromoInput}
                placeholder="Промокод"
                autoCapitalize="characters"
                placeholderTextColor={colors.textMuted}
                style={[st.input, { flex: 1, minWidth: 0 }]}
              />
              <Button title="Применить" variant="outline" onPress={applyPromo} />
            </View>
          </Step>

          <Card dark style={{ marginTop: spacing.xl, gap: spacing.sm }}>
            <Eyebrow dark>Ваш заказ</Eyebrow>
            <Line label={service.title} value={`${service.priceFrom ? 'от ' : ''}${formatPrice(service.price)}`} />
            {addOnsTotal ? <Line label="Дополнительно" value={formatPrice(addOnsTotal)} /> : null}
            <Line label="Выезд по городу" value="включён" />
            {discount ? <Line label={`Промокод ${promo}`} value={`−${formatPrice(discount)}`} accent /> : null}
            <View style={{ height: 1, backgroundColor: colors.inkLine, marginVertical: 4 }} />
            <Line label="Итого" value={formatPrice(total)} bold />
          </Card>
        </ScrollView>

        <View style={st.footer}>
          <Button title={time ? `Записаться · ${formatPrice(total)}` : 'Выберите время'} disabled={!canSubmit} onPress={submit} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Step({ n, title, children }: { n?: number; title: string; children: ReactNode }) {
  return (
    <View style={{ marginTop: spacing.xl }}>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm, marginBottom: spacing.md }}>
        {n ? <Text style={st.stepNum}>0{n}</Text> : null}
        <Text style={st.stepTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function Line({ label, value, bold, accent }: { label: string; value: string; bold?: boolean; accent?: boolean }) {
  const style = {
    fontFamily: bold ? fonts.sansBold : fonts.sans,
    fontSize: bold ? 18 : 14,
    color: accent ? colors.gold : bold ? colors.textOnDark : colors.textOnDarkMuted,
  };
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md }}>
      <Text style={[style, { flex: 1 }]}>{label}</Text>
      <Text style={style}>{value}</Text>
    </View>
  );
}

const st = StyleSheet.create({
  sub: { fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted, marginTop: 4 },
  stepNum: { fontFamily: fonts.serif, fontSize: 18, color: colors.rose },
  stepTitle: { fontFamily: fonts.serif, fontSize: 24, color: colors.ink },
  day: {
    width: 58,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dayActive: { backgroundColor: colors.ink, borderColor: colors.ink },
  dayWeek: { fontFamily: fonts.sans, color: colors.textMuted, fontSize: 11 },
  dayNum: { fontFamily: fonts.serif, color: colors.ink, fontSize: 24, marginVertical: 1 },
  slots: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  slot: {
    width: '23%',
    flexGrow: 1,
    paddingVertical: 11,
    alignItems: 'center',
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  slotActive: { backgroundColor: colors.gold, borderColor: colors.gold },
  slotText: { fontFamily: fonts.sansMedium, color: colors.ink, fontSize: 14 },
  hint: { fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted, marginTop: spacing.sm, lineHeight: 17 },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    fontSize: 15,
    fontFamily: fonts.sans,
    color: colors.ink,
    backgroundColor: colors.surface,
  },
  addOn: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg },
  check: { width: 22, height: 22, borderRadius: 6, borderWidth: 1.5, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  checkOn: { backgroundColor: colors.ink, borderColor: colors.ink },
  addOnTitle: { flex: 1, fontFamily: fonts.sans, fontSize: 14, color: colors.ink },
  addOnPrice: { fontFamily: fonts.sansBold, fontSize: 14, color: colors.ink },
  footer: { padding: spacing.lg, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border },
});
