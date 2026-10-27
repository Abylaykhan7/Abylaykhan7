import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Card, Chip, Eyebrow, Heading, Logo } from '../../components/ui';
import { CITIES, WHATSAPP } from '../../data/catalog';
import { useAppStore } from '../../store/AppStore';
import { colors, fonts, radius, spacing } from '../../theme';

export default function ProfileScreen() {
  const { profile, updateProfile, bookings } = useAppStore();
  const done = bookings.filter((b) => b.status !== 'cancelled').length;

  return (
    <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingTop: 0, paddingBottom: 48, gap: spacing.lg }} keyboardShouldPersistTaps="handled">
      <Card style={{ gap: spacing.md }}>
        <Field label="Имя" value={profile.name} onChange={(name) => updateProfile({ name })} placeholder="Как к вам обращаться" />
        <Field label="Телефон" value={profile.phone} onChange={(phone) => updateProfile({ phone })} placeholder="+7 7__ ___ __ __" phone />
        <Field label="Адрес по умолчанию" value={profile.address} onChange={(address) => updateProfile({ address })} placeholder="Улица, дом, квартира или отель" />
      </Card>

      <View>
        <Eyebrow>Город</Eyebrow>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md }}>
          {CITIES.map((c) => (
            <Chip key={c} label={c} active={profile.city === c} onPress={() => updateProfile({ city: c })} />
          ))}
        </View>
      </View>

      <Card dark style={{ gap: 6 }}>
        <Eyebrow dark>Aray Club</Eyebrow>
        <Heading dark size={26}>
          {done} {done === 1 ? 'образ' : 'образов'} с нами
        </Heading>
        <Text style={{ fontFamily: fonts.sans, fontSize: 14, color: colors.textOnDarkMuted, lineHeight: 20 }}>
          Каждый пятый образ — бэкстейдж сборов в подарок.
        </Text>
      </Card>

      <Card style={{ padding: 0 }}>
        <Row icon="briefcase-outline" label="Стать частью команды" onPress={() => Alert.alert('Стать частью команды', 'Визажисты, стилисты, фотографы и мобилографы — напишите нам в WhatsApp и пришлите портфолио.')} />
        <Row icon="logo-whatsapp" label="Написать в WhatsApp" onPress={() => Linking.openURL(`https://wa.me/${WHATSAPP}`)} />
        <Row icon="call-outline" label="Позвонить" onPress={() => Linking.openURL(`tel:+${WHATSAPP}`)} />
        <Row icon="document-text-outline" label="Условия и отмена" onPress={() => Alert.alert('Условия', 'Выезд по городу включён. Бесплатная отмена — не позднее чем за 24 часа. Для свадебных пакетов — предоплата 30%.')} last />
      </Card>

      <View style={{ alignItems: 'center' }}>
        <Logo size={26} />
      </View>
    </ScrollView>
  );
}

function Field({ label, value, onChange, placeholder, phone }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; phone?: boolean }) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={st.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        keyboardType={phone ? 'phone-pad' : 'default'}
        style={st.input}
      />
    </View>
  );
}

function Row({ icon, label, onPress, last }: { icon: ComponentProps<typeof Ionicons>['name']; label: string; onPress: () => void; last?: boolean }) {
  return (
    <Pressable onPress={onPress} style={[st.row, !last && st.rowBorder]}>
      <Ionicons name={icon} size={20} color={colors.rose} />
      <Text style={st.rowText}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
}

const st = StyleSheet.create({
  label: { fontFamily: fonts.sansMedium, fontSize: 12, color: colors.textMuted },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: fonts.sans,
    color: colors.ink,
    backgroundColor: colors.cream,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  rowText: { flex: 1, fontFamily: fonts.sans, color: colors.ink, fontSize: 15 },
});
