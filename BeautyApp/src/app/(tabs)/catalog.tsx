import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Chip, Eyebrow, Heading, ServiceRow } from '../../components/ui';
import { categories, CategoryId, servicesByCategory } from '../../data/catalog';
import { colors, fonts, spacing } from '../../theme';

export default function CatalogScreen() {
  const params = useLocalSearchParams<{ category?: CategoryId }>();
  const [active, setActive] = useState<CategoryId | 'all'>(params.category ?? 'all');
  const [lastParam, setLastParam] = useState(params.category);
  if (params.category !== lastParam) {
    setLastParam(params.category);
    if (params.category) setActive(params.category);
  }

  const shown = active === 'all' ? categories : categories.filter((c) => c.id === active);

  return (
    <View style={{ flex: 1 }}>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.md }}>
          <Chip label="Все" active={active === 'all'} onPress={() => setActive('all')} />
          {categories.map((c) => (
            <Chip key={c.id} label={c.title} active={active === c.id} onPress={() => setActive(c.id)} />
          ))}
        </ScrollView>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 48 }}>
        <Text style={{ fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted, marginBottom: spacing.md }}>
          Выезд по городу включён в стоимость. Оплата через Kaspi или картой.
        </Text>
        {shown.map((c) => (
          <View key={c.id} style={{ marginBottom: spacing.xl }}>
            <Eyebrow>{c.subtitle}</Eyebrow>
            <Heading size={30} style={{ marginTop: 4, marginBottom: spacing.md }}>
              {c.title}
            </Heading>
            {servicesByCategory(c.id).map((sv) => (
              <ServiceRow key={sv.id} service={sv} />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
