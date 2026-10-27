import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Card, Chip, SectionTitle } from '../../components/ui';
import { CITIES } from '../../data/catalog';
import { useAppStore } from '../../store/AppStore';
import { colors, radius, spacing } from '../../theme';

const SUPPORT_PHONE = '+77000000000';

export default function ProfileScreen() {
  const { profile, updateProfile, bookings } = useAppStore();
  const done = bookings.filter((b) => b.status !== 'cancelled').length;

  return (
    <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
      <Card style={{ gap: spacing.md }}>
        <Field label="Имя" value={profile.name} onChange={(name) => updateProfile({ name })} placeholder="Как к вам обращаться" />
        <Field
          label="Телефон"
          value={profile.phone}
          onChange={(phone) => updateProfile({ phone })}
          placeholder="+7 7__ ___ __ __"
          keyboardType="phone-pad"
        />
        <Field
          label="Адрес по умолчанию"
          value={profile.address}
          onChange={(address) => updateProfile({ address })}
          placeholder="Улица, дом, квартира"
        />
      </Card>

      <SectionTitle title="Город" />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
        {CITIES.map((c) => (
          <Chip key={c} label={c} active={profile.city === c} onPress={() => updateProfile({ city: c })} />
        ))}
      </View>

      <SectionTitle title="Бонусы" />
      <Card style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
        <Text style={{ fontSize: 32 }}>🎁</Text>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: '700', color: colors.text }}>Записей: {done}</Text>
          <Text style={{ color: colors.textMuted }}>Каждая 6-я услуга — со скидкой 50%</Text>
        </View>
      </Card>

      <SectionTitle title="Ещё" />
      <Card style={{ padding: 0 }}>
        <Row icon="briefcase-outline" label="Стать мастером" onPress={() => Alert.alert('Стать мастером', 'Оставьте заявку в поддержке — мы свяжемся с вами для собеседования.')} />
        <Row icon="logo-whatsapp" label="Написать в поддержку" onPress={() => Linking.openURL(`https://wa.me/${SUPPORT_PHONE.replace('+', '')}`)} />
        <Row icon="call-outline" label="Позвонить" onPress={() => Linking.openURL(`tel:${SUPPORT_PHONE}`)} />
        <Row icon="document-text-outline" label="Условия и отмена записи" onPress={() => Alert.alert('Условия', 'Бесплатная отмена — не позднее чем за 3 часа. Выезд мастера — 2 000 ₸. Оплата после оказания услуги.')} last />
      </Card>
    </ScrollView>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  keyboardType,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  keyboardType?: 'phone-pad';
}) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={{ color: colors.textMuted, fontSize: 13 }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        keyboardType={keyboardType}
        style={st.input}
      />
    </View>
  );
}

function Row({
  icon,
  label,
  onPress,
  last,
}: {
  icon: ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress: () => void;
  last?: boolean;
}) {
  return (
    <Pressable onPress={onPress} style={[st.row, !last && st.rowBorder]}>
      <Ionicons name={icon} size={20} color={colors.primary} />
      <Text style={{ flex: 1, color: colors.text, fontSize: 15 }}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
}

const st = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 11,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.background,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
});
