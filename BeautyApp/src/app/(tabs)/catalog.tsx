import { ScrollView, Text, View } from 'react-native';

import { Card, CategoryTile, ServiceRow } from '../../components/ui';
import { categories, servicesByCategory } from '../../data/catalog';
import { colors, spacing } from '../../theme';
import { formatPrice } from '../../utils/format';

export default function CatalogScreen() {
  return (
    <ScrollView contentContainerStyle={{ padding: spacing.lg, gap: spacing.md, paddingBottom: 40 }}>
      <Text style={{ color: colors.textMuted }}>Полный прайс-лист. Цены указаны для мастера; у топ-мастеров +25%.</Text>
      {categories.map((c) => {
        const list = servicesByCategory(c.id);
        const min = Math.min(...list.map((sv) => sv.price));
        return (
          <Card key={c.id} style={{ padding: spacing.md }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.md }}>
              <CategoryTile category={c} width={64} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text }}>{c.title}</Text>
                <Text style={{ color: colors.textMuted }}>
                  {list.length} услуг · от {formatPrice(min)}
                </Text>
              </View>
            </View>
            {list.map((sv) => (
              <ServiceRow key={sv.id} service={sv} />
            ))}
          </Card>
        );
      })}
    </ScrollView>
  );
}
