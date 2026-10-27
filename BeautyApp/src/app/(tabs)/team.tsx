import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, ScrollView, View } from 'react-native';

import { Chip, SpecialistRow } from '../../components/ui';
import { Role, specialists } from '../../data/catalog';
import { useAppStore } from '../../store/AppStore';
import { colors, spacing } from '../../theme';

const FILTERS: { id: Role | 'all' | 'fav'; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'fav', label: '♥ Избранные' },
  { id: 'makeup', label: 'Визажисты' },
  { id: 'hair', label: 'Стилисты' },
  { id: 'photo', label: 'Фотографы' },
  { id: 'video', label: 'Мобилографы' },
];

export default function TeamScreen() {
  const { favorites, toggleFavorite } = useAppStore();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['id']>('all');

  const list = specialists.filter((p) =>
    filter === 'all' ? true : filter === 'fav' ? favorites.includes(p.id) : p.roles.includes(filter),
  );

  return (
    <View style={{ flex: 1 }}>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.md }}>
          {FILTERS.map((f) => (
            <Chip key={f.id} label={f.label} active={filter === f.id} onPress={() => setFilter(f.id)} />
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={list}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 48 }}
        renderItem={({ item }) => (
          <SpecialistRow
            person={item}
            onPress={() => router.push(`/specialist/${item.id}`)}
            right={
              <Pressable onPress={() => toggleFavorite(item.id)} hitSlop={10}>
                <Ionicons name={favorites.includes(item.id) ? 'heart' : 'heart-outline'} size={22} color={colors.rose} />
              </Pressable>
            }
          />
        )}
      />
    </View>
  );
}
