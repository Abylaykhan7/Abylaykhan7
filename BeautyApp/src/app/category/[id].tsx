import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text } from 'react-native';

import { MasterRow, SectionTitle, ServiceRow } from '../../components/ui';
import { getCategory, mastersForCategory, servicesByCategory } from '../../data/catalog';
import { colors, spacing } from '../../theme';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const category = getCategory(id);
  if (!category) return <Text style={{ padding: spacing.lg }}>Категория не найдена</Text>;

  return (
    <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 40 }}>
      <Stack.Screen options={{ title: `${category.emoji} ${category.title}` }} />
      <Text style={{ color: colors.textMuted, marginBottom: spacing.md }}>
        Выберите услугу — затем мастера, дату и время.
      </Text>
      {servicesByCategory(category.id).map((sv) => (
        <ServiceRow key={sv.id} service={sv} />
      ))}
      <SectionTitle title="Мастера" />
      {mastersForCategory(category.id).map((m) => (
        <MasterRow key={m.id} master={m} />
      ))}
    </ScrollView>
  );
}
