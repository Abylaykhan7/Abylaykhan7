import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Accent, Avatar, Button, Card, Chip, Eyebrow, Heading, Logo, PackageCard, SectionHeader } from '../../components/ui';
import { categories, faq, occasions, packages, specialists, WHATSAPP } from '../../data/catalog';
import { useAppStore } from '../../store/AppStore';
import { colors, fonts, gradients, radius, spacing } from '../../theme';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { profile } = useAppStore();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const cardWidth = Math.min(width * 0.8, 340);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.cream }} contentContainerStyle={{ paddingBottom: 48 }}>
      <StatusBar style="light" />

      {/* Hero */}
      <LinearGradient colors={gradients.ink} start={{ x: 0, y: 0 }} end={{ x: 0.6, y: 1 }} style={{ paddingTop: insets.top + spacing.md }}>
        <View style={st.topBar}>
          <Logo dark size={32} />
          <View style={{ flexDirection: 'row', gap: spacing.sm }}>
            <Pressable onPress={() => router.push('/profile')} style={st.cityPill}>
              <Ionicons name="location-outline" size={13} color={colors.gold} />
              <Text style={st.cityText}>{profile.city}</Text>
            </Pressable>
            <Pressable onPress={() => Linking.openURL(`https://wa.me/${WHATSAPP}`)} style={st.iconBtn}>
              <Ionicons name="logo-whatsapp" size={18} color="#4ADE80" />
            </Pressable>
          </View>
        </View>

        <View style={st.hero}>
          <View style={st.heroGlow} />
          <Text style={st.heroMonogram}>A</Text>
          <Eyebrow dark>Макияж · Причёска · Фото · Видео</Eyebrow>
          <Heading dark size={46} style={{ marginTop: spacing.sm }}>
            Ваш выход —{'\n'}
            <Accent dark>в главной роли</Accent>
          </Heading>
          <Text style={st.heroText}>
            Визажист, фотограф и мобилограф приезжают к вам. Образ, бэкстейдж сборов и готовые Reels — в одной записи.
          </Text>
          <View style={{ gap: spacing.sm, marginTop: spacing.xl }}>
            <Button title="Выбрать время" variant="gold" onPress={() => router.push('/booking/pkg-star')} />
            <Button title="Все услуги и цены" variant="outlineDark" onPress={() => router.push('/catalog')} />
          </View>
          <View style={st.stats}>
            {[
              ['4.9', 'средняя оценка'],
              ['48 ч', 'готовый Reels'],
              ['1 300+', 'образов'],
            ].map(([v, l]) => (
              <View key={l} style={{ flex: 1 }}>
                <Text style={st.statValue}>{v}</Text>
                <Text style={st.statLabel}>{l}</Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>

      {/* Тарифы */}
      <View style={{ paddingTop: spacing.xxl }}>
        <View style={{ paddingHorizontal: spacing.lg }}>
          <SectionHeader eyebrow="Пакеты" title="Выберите" accent="свой формат" />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardWidth + spacing.md}
          decelerationRate="fast"
          contentContainerStyle={{ gap: spacing.md, paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xl }}
        >
          {packages.map((p) => (
            <PackageCard key={p.id} service={p} width={cardWidth} />
          ))}
        </ScrollView>
      </View>

      {/* Сравнение */}
      <View style={{ paddingHorizontal: spacing.lg, gap: spacing.md }}>
        <Card>
          <Eyebrow style={{ color: colors.textMuted }}>В каждом пакете</Eyebrow>
          {['Премиальная косметика и стойкий тон', 'Причёска или укладка Dyson', 'Выезд домой, в отель или ресторан'].map((t) => (
            <Check key={t} label={t} />
          ))}
        </Card>
        <Card dark>
          <Eyebrow dark>Только в Star и Icon</Eyebrow>
          {[
            ['people-outline', 'Своя команда: визажист и мобилограф'],
            ['camera-outline', 'Съёмка всех сборов — вы в кадре как модель'],
            ['film-outline', 'Готовые Reels для ваших соцсетей'],
            ['wine-outline', 'Халат, напиток и патчи — сервис уровня звезды'],
          ].map(([i, t]) => (
            <Check key={t} label={t} icon={i as 'film-outline'} dark />
          ))}
        </Card>
      </View>

      {/* Как это работает */}
      <LinearGradient colors={gradients.ink} style={st.how}>
        <Eyebrow dark>Как это работает</Eyebrow>
        <Heading dark size={34} style={{ marginTop: 6 }}>
          Не просто макияж — <Accent dark>ваш выход</Accent>
        </Heading>
        <View style={{ gap: spacing.lg, marginTop: spacing.xl }}>
          {[
            ['Команда приезжает к вам', 'Визажист, стилист и мобилограф — дома, в отеле или на локации. Вы отдыхаете.'],
            ['Вы — главная героиня', 'Свет, камера и сервис вокруг вас. Сборы превращаются в съёмку.'],
            ['Контент, который говорит за вас', 'Reels и фото в ретуши через 48 часов — сразу в Instagram.'],
          ].map(([t, d], i) => (
            <View key={t} style={st.step}>
              <Text style={st.stepNum}>0{i + 1}</Text>
              <Text style={st.stepTitle}>{t}</Text>
              <Text style={st.stepText}>{d}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      {/* Категории */}
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.xxl }}>
        <SectionHeader eyebrow="Услуги" title="Всё для" accent="образа и кадра" action="Прайс" onAction={() => router.push('/catalog')} />
        <View style={st.grid}>
          {categories
            .filter((c) => c.id !== 'packages')
            .map((c) => (
              <Pressable
                key={c.id}
                onPress={() => router.push({ pathname: '/catalog', params: { category: c.id } })}
                style={({ pressed }) => [st.catTile, { width: (width - spacing.lg * 2 - spacing.md) / 2 }, pressed && { opacity: 0.85 }]}
              >
                <View style={st.catIcon}>
                  <Ionicons name={c.icon} size={20} color={colors.rose} />
                </View>
                <Text style={st.catTitle}>{c.title}</Text>
                <Text style={st.catSub}>{c.subtitle}</Text>
              </Pressable>
            ))}
        </View>
      </View>

      {/* Поводы */}
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.xxl }}>
        <SectionHeader eyebrow="Поводы" title="Образ на" accent="любой случай" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
          {occasions.map((o) => (
            <Chip key={o.id} label={o.title} onPress={() => router.push({ pathname: '/service/[id]', params: { id: o.serviceId, occasion: o.title } })} />
          ))}
        </View>
      </View>

      {/* Команда */}
      <View style={{ paddingTop: spacing.xxl }}>
        <View style={{ paddingHorizontal: spacing.lg }}>
          <SectionHeader eyebrow="Команда" title="Мастера" accent="Aray" action="Все" onAction={() => router.push('/team')} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.md, paddingHorizontal: spacing.lg }}>
          {specialists.slice(0, 6).map((p) => (
            <Pressable key={p.id} onPress={() => router.push(`/specialist/${p.id}`)} style={st.person}>
              <Avatar person={p} size={64} />
              <Text style={st.personName} numberOfLines={1}>
                {p.name.split(' ')[0]}
              </Text>
              <Text style={st.personRole} numberOfLines={1}>
                {p.title}
              </Text>
              <Text style={st.personRating}>★ {p.rating.toFixed(1)}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* FAQ */}
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.xxl }}>
        <SectionHeader eyebrow="Вопросы" title="Частые" accent="вопросы" />
        <View style={{ borderTopWidth: 1, borderColor: colors.border }}>
          {faq.map((f, i) => (
            <Pressable key={f.q} onPress={() => setOpenFaq(openFaq === i ? null : i)} style={st.faqItem}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md }}>
                <Text style={st.faqQ}>{f.q}</Text>
                <Text style={[st.faqPlus, openFaq === i && { transform: [{ rotate: '45deg' }] }]}>+</Text>
              </View>
              {openFaq === i ? <Text style={st.faqA}>{f.a}</Text> : null}
            </Pressable>
          ))}
        </View>
      </View>

      <View style={{ alignItems: 'center', paddingTop: spacing.xxl, gap: 6 }}>
        <Logo size={30} />
        <Text style={st.footer}>Образ и съёмка с выездом · {profile.city}</Text>
      </View>
    </ScrollView>
  );
}

function Check({ label, icon = 'checkmark', dark }: { label: string; icon?: 'checkmark' | 'film-outline'; dark?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start', marginTop: spacing.md }}>
      <Ionicons name={icon} size={18} color={dark ? colors.gold : colors.rose} style={{ marginTop: 1 }} />
      <Text style={{ flex: 1, fontFamily: fonts.sans, fontSize: 15, lineHeight: 21, color: dark ? colors.textOnDark : colors.ink }}>{label}</Text>
    </View>
  );
}

const st = StyleSheet.create({
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.lg },
  cityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    height: 36,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.inkLine,
  },
  cityText: { fontFamily: fonts.sansMedium, fontSize: 12, color: colors.textOnDark },
  iconBtn: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: colors.inkLine, alignItems: 'center', justifyContent: 'center' },
  hero: { paddingHorizontal: spacing.lg, paddingTop: 56, paddingBottom: spacing.xxl, overflow: 'hidden' },
  heroGlow: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(212,180,140,0.10)',
    top: -60,
    right: -120,
  },
  heroMonogram: { position: 'absolute', right: -10, top: -20, fontFamily: fonts.serifItalic, fontSize: 280, color: 'rgba(212,180,140,0.07)' },
  heroText: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 23, color: colors.textOnDarkMuted, marginTop: spacing.md },
  stats: { flexDirection: 'row', marginTop: spacing.xl, paddingTop: spacing.lg, borderTopWidth: 1, borderTopColor: colors.inkLine },
  statValue: { fontFamily: fonts.serif, fontSize: 26, color: colors.gold },
  statLabel: { fontFamily: fonts.sans, fontSize: 11, color: colors.textOnDarkMuted, marginTop: 2 },
  how: { marginTop: spacing.xxl, paddingHorizontal: spacing.lg, paddingVertical: spacing.xxl },
  step: { borderLeftWidth: 1, borderLeftColor: 'rgba(212,180,140,0.4)', paddingLeft: spacing.lg },
  stepNum: { fontFamily: fonts.serif, fontSize: 20, color: colors.gold },
  stepTitle: { fontFamily: fonts.sansBold, fontSize: 16, color: colors.textOnDark, marginTop: 4 },
  stepText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.textOnDarkMuted, marginTop: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  catTile: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, gap: 4 },
  catIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.creamDeep, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
  catTitle: { fontFamily: fonts.serif, fontSize: 22, color: colors.ink },
  catSub: { fontFamily: fonts.sans, fontSize: 12, lineHeight: 16, color: colors.textMuted },
  person: { width: 120, alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.lg, paddingVertical: spacing.lg, paddingHorizontal: spacing.sm, borderWidth: 1, borderColor: colors.border, gap: 4 },
  personName: { fontFamily: fonts.sansBold, fontSize: 14, color: colors.ink, marginTop: spacing.sm },
  personRole: { fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted },
  personRating: { fontFamily: fonts.sansMedium, fontSize: 12, color: colors.goldDeep },
  faqItem: { paddingVertical: spacing.lg, borderBottomWidth: 1, borderColor: colors.border },
  faqQ: { flex: 1, fontFamily: fonts.sansMedium, fontSize: 16, color: colors.ink },
  faqPlus: { fontFamily: fonts.sans, fontSize: 24, lineHeight: 24, color: colors.rose },
  faqA: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: colors.textMuted, marginTop: spacing.sm },
  footer: { fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted },
});
