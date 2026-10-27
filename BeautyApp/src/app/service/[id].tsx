import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Card, Eyebrow, Heading, Meta, Price, SpecialistRow } from '../../components/ui';
import { getCategory, getService, specialistsForService } from '../../data/catalog';
import { colors, fonts, gradients, radius, spacing } from '../../theme';
import { formatDuration, formatPrice } from '../../utils/format';

export default function ServiceScreen() {
  const { id, occasion } = useLocalSearchParams<{ id: string; occasion?: string }>();
  const service = getService(id);
  if (!service) return <Text style={{ padding: spacing.lg }}>Услуга не найдена</Text>;
  const category = getCategory(service.categoryId);
  const team = specialistsForService(service);
  const book = (specialistId?: string) =>
    router.push({ pathname: '/booking/[serviceId]', params: { serviceId: service.id, ...(specialistId ? { specialistId } : {}), ...(occasion ? { occasion } : {}) } });

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xl }}>
        <LinearGradient colors={gradients.ink} style={st.hero}>
          <Text style={st.heroMono}>{service.title.charAt(0)}</Text>
          <Eyebrow dark>{occasion ? `Для повода · ${occasion}` : category?.title}</Eyebrow>
          <Heading dark size={40} style={{ marginTop: spacing.sm }}>
            {service.title}
          </Heading>
          <Text style={st.heroText}>{service.summary}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.lg, marginTop: spacing.lg }}>
            <Price service={service} dark size={24} />
            <Meta icon="time-outline" label={formatDuration(service.durationMin)} dark />
          </View>
          <View style={{ marginTop: spacing.sm }}>
            <Meta icon="people-outline" label={service.team} dark />
          </View>
        </LinearGradient>

        <View style={{ padding: spacing.lg, gap: spacing.lg }}>
          <Card>
            <Eyebrow>Что входит</Eyebrow>
            {service.includes.map((t) => (
              <View key={t} style={st.line}>
                <Ionicons name="checkmark" size={18} color={colors.rose} />
                <Text style={st.lineText}>{t}</Text>
              </View>
            ))}
            <View style={st.line}>
              <Ionicons name="car-outline" size={18} color={colors.rose} />
              <Text style={st.lineText}>Выезд по городу включён</Text>
            </View>
          </Card>

          {service.addOns?.length ? (
            <Card>
              <Eyebrow>Можно добавить</Eyebrow>
              {service.addOns.map((a) => (
                <View key={a.id} style={[st.line, { justifyContent: 'space-between' }]}>
                  <Text style={st.lineText}>{a.title}</Text>
                  <Text style={st.addOnPrice}>+{formatPrice(a.price)}</Text>
                </View>
              ))}
            </Card>
          ) : null}

          <View>
            <Eyebrow>Кто приедет</Eyebrow>
            <View style={{ marginTop: spacing.md }}>
              {team.map((p) => (
                <SpecialistRow key={p.id} person={p} onPress={() => book(p.id)} right={<Ionicons name="arrow-forward" size={18} color={colors.ink} />} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={st.footer}>
        <View style={{ flex: 1 }}>
          <Text style={st.footerLabel}>Итого от</Text>
          <Text style={st.footerPrice}>{formatPrice(service.price)}</Text>
        </View>
        <Button title="Выбрать время" onPress={() => book()} style={{ flex: 1.4 }} />
      </View>
    </SafeAreaView>
  );
}

const st = StyleSheet.create({
  hero: { padding: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.xxl, overflow: 'hidden' },
  heroMono: { position: 'absolute', right: -10, top: -50, fontFamily: fonts.serifItalic, fontSize: 260, color: 'rgba(212,180,140,0.08)' },
  heroText: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 22, color: colors.textOnDarkMuted, marginTop: spacing.md },
  line: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md, marginTop: spacing.md },
  lineText: { flex: 1, fontFamily: fonts.sans, fontSize: 15, lineHeight: 21, color: colors.ink },
  addOnPrice: { fontFamily: fonts.sansBold, fontSize: 14, color: colors.ink },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
  },
  footerLabel: { fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted },
  footerPrice: { fontFamily: fonts.sansBold, fontSize: 20, color: colors.ink },
});
