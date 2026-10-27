import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Avatar, Badge, Card, Rating, SectionTitle } from '../../components/ui';
import { getCategory, getMaster, LEVEL_INFO, priceForMaster, services } from '../../data/catalog';
import { useAppStore } from '../../store/AppStore';
import { colors, spacing } from '../../theme';
import { formatPrice } from '../../utils/format';

export default function MasterScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { favorites, toggleFavorite } = useAppStore();
  const master = getMaster(id);
  if (!master) return <Text style={{ padding: spacing.lg }}>Мастер не найден</Text>;
  const fav = favorites.includes(master.id);

  return (
    <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 40 }}>
      <View style={{ alignItems: 'center', gap: spacing.sm }}>
        <Avatar master={master} size={96} />
        <Text style={{ fontSize: 22, fontWeight: '800', color: colors.text }}>{master.name}</Text>
        <Badge label={LEVEL_INFO[master.level].title} color={master.level === 'top' ? colors.accent : colors.primary} />
        <Rating master={master} />
        <Text style={{ color: colors.textMuted }}>Опыт {master.experienceYears} лет</Text>
        <Pressable onPress={() => toggleFavorite(master.id)} style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
          <Ionicons name={fav ? 'heart' : 'heart-outline'} size={20} color={colors.primary} />
          <Text style={{ color: colors.primary, fontWeight: '600' }}>{fav ? 'В избранном' : 'В избранное'}</Text>
        </Pressable>
      </View>
      <Card style={{ marginTop: spacing.lg }}>
        <Text style={{ color: colors.text, lineHeight: 21 }}>{master.about}</Text>
      </Card>

      {master.categories.map((cid) => {
        const cat = getCategory(cid);
        return (
          <View key={cid}>
            <SectionTitle title={`${cat?.emoji} ${cat?.title}`} />
            {services
              .filter((sv) => sv.categoryId === cid)
              .map((sv) => (
                <Pressable
                  key={sv.id}
                  onPress={() => router.push({ pathname: '/booking/[serviceId]', params: { serviceId: sv.id, masterId: master.id } })}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: spacing.md,
                    paddingVertical: spacing.md,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                  }}
                >
                  <Text style={{ flex: 1, color: colors.text }}>{sv.title}</Text>
                  <Text style={{ fontWeight: '700', color: colors.text }}>
                    {sv.priceFrom ? 'от ' : ''}
                    {formatPrice(priceForMaster(sv, master))}
                  </Text>
                </Pressable>
              ))}
          </View>
        );
      })}
    </ScrollView>
  );
}
