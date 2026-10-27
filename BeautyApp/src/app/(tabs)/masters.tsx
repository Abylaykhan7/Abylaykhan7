import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Pressable, ScrollView, View } from 'react-native';

import { Chip, MasterRow } from '../../components/ui';
import { categories, CategoryId, masters } from '../../data/catalog';
import { useAppStore } from '../../store/AppStore';
import { colors, spacing } from '../../theme';

export default function MastersScreen() {
  const { favorites, toggleFavorite } = useAppStore();
  const [filter, setFilter] = useState<string>('all');

  const list = masters
    .filter((m) => {
      if (filter === 'all') return true;
      if (filter === 'fav') return favorites.includes(m.id);
      return m.categories.includes(filter as CategoryId);
    })
    .sort((a, b) => b.rating - a.rating);

  return (
    <View style={{ flex: 1 }}>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm, padding: spacing.lg }}>
          <Chip label="Все" active={filter === 'all'} onPress={() => setFilter('all')} />
          <Chip label="♥ Избранные" active={filter === 'fav'} onPress={() => setFilter('fav')} />
          {categories.map((c) => (
            <Chip key={c.id} label={c.title} active={filter === c.id} onPress={() => setFilter(c.id)} />
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={list}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 40 }}
        renderItem={({ item }) => (
          <MasterRow
            master={item}
            right={
              <Pressable onPress={() => toggleFavorite(item.id)} hitSlop={10}>
                <Ionicons
                  name={favorites.includes(item.id) ? 'heart' : 'heart-outline'}
                  size={24}
                  color={colors.primary}
                />
              </Pressable>
            }
          />
        )}
      />
    </View>
  );
}
