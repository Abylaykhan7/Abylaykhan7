import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryTile, MasterRow, SectionTitle, ServiceRow } from '../../components/ui';
import { categories, masters, services } from '../../data/catalog';
import { useAppStore } from '../../store/AppStore';
import { colors, radius, spacing } from '../../theme';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const { profile } = useAppStore();
  const [query, setQuery] = useState('');

  const tileWidth = (width - spacing.lg * 2 - spacing.sm * 2) / 3;
  const q = query.trim().toLowerCase();
  const results = q ? services.filter((s) => s.title.toLowerCase().includes(q)) : [];
  const popular = services.filter((s) => s.popular).slice(0, 6);
  const topMasters = [...masters].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <View style={s.header}>
          <View>
            <Text style={s.hello}>{profile.name ? `Привет, ${profile.name}!` : 'Привет!'}</Text>
            <Pressable onPress={() => router.push('/profile')} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Ionicons name="location-outline" size={15} color={colors.primary} />
              <Text style={s.city}>{profile.city}</Text>
            </Pressable>
          </View>
          <Text style={s.logo}>Glow·Up</Text>
        </View>

        <View style={s.search}>
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Маникюр, фотосессия, массаж…"
            placeholderTextColor={colors.textMuted}
            style={s.searchInput}
          />
          {query ? (
            <Pressable onPress={() => setQuery('')} hitSlop={8}>
              <Ionicons name="close-circle" size={18} color={colors.textMuted} />
            </Pressable>
          ) : null}
        </View>

        {q ? (
          <View style={{ marginTop: spacing.lg }}>
            {results.length ? (
              results.map((sv) => <ServiceRow key={sv.id} service={sv} />)
            ) : (
              <Text style={{ color: colors.textMuted }}>Ничего не найдено</Text>
            )}
          </View>
        ) : (
          <>
            <Pressable style={s.promo} onPress={() => router.push('/category/photo')}>
              <View style={{ flex: 1 }}>
                <Text style={s.promoLabel}>НОВОЕ</Text>
                <Text style={s.promoTitle}>Фотосессии и видеосъёмка</Text>
                <Text style={s.promoText}>Фотограф + визажист в одном заказе. Промокод GLOW10 — скидка 10%</Text>
              </View>
              <Text style={{ fontSize: 48 }}>📸</Text>
            </Pressable>

            <SectionTitle title="Категории" action="Все" onAction={() => router.push('/catalog')} />
            <View style={s.grid}>
              {categories.map((c) => (
                <CategoryTile key={c.id} category={c} width={tileWidth} />
              ))}
            </View>

            <SectionTitle title="Популярное" />
            {popular.map((sv) => (
              <ServiceRow key={sv.id} service={sv} />
            ))}

            <SectionTitle title="Лучшие мастера" action="Все" onAction={() => router.push('/masters')} />
            {topMasters.map((m) => (
              <MasterRow key={m.id} master={m} />
            ))}

            <View style={s.features}>
              {[
                ['car-outline', 'Выезд на дом'],
                ['shield-checkmark-outline', 'Проверенные мастера'],
                ['card-outline', 'Kaspi, карта, наличные'],
              ].map(([icon, label]) => (
                <View key={label} style={s.feature}>
                  <Ionicons name={icon as 'car-outline'} size={22} color={colors.primary} />
                  <Text style={s.featureText}>{label}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  hello: { fontSize: 24, fontWeight: '800', color: colors.text },
  city: { color: colors.primary, fontWeight: '600' },
  logo: { fontSize: 20, fontWeight: '800', color: colors.primary },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 15, color: colors.text },
  promo: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  promoLabel: { color: '#fff', opacity: 0.8, fontWeight: '700', fontSize: 11, letterSpacing: 1 },
  promoTitle: { color: '#fff', fontWeight: '800', fontSize: 18, marginVertical: 4 },
  promoText: { color: '#fff', opacity: 0.9, fontSize: 13 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  features: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xl },
  feature: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
    padding: spacing.md,
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
  },
  featureText: { fontSize: 12, textAlign: 'center', color: colors.text, fontWeight: '500' },
});
