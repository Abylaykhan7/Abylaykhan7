import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Avatar, Card, Eyebrow, Heading, Price } from '../../components/ui';
import { getSpecialist, LEAD_ROLE, services } from '../../data/catalog';
import { useAppStore } from '../../store/AppStore';
import { colors, fonts, spacing } from '../../theme';

export default function SpecialistScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { favorites, toggleFavorite } = useAppStore();
  const person = getSpecialist(id);
  if (!person) return <Text style={{ padding: spacing.lg }}>Специалист не найден</Text>;
  const fav = favorites.includes(person.id);
  const own = services.filter((sv) => person.roles.includes(LEAD_ROLE[sv.categoryId]));

  return (
    <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 48, gap: spacing.lg }}>
      <View style={{ alignItems: 'center', gap: spacing.sm }}>
        <Avatar person={person} size={104} />
        <Heading size={32} style={{ textAlign: 'center', marginTop: spacing.sm }}>
          {person.name}
        </Heading>
        <Eyebrow>{person.title}</Eyebrow>
        <Text style={st.meta}>
          ★ {person.rating.toFixed(1)} · {person.reviews} отзывов · опыт {person.experienceYears} лет
        </Text>
        <Pressable onPress={() => toggleFavorite(person.id)} style={st.fav}>
          <Ionicons name={fav ? 'heart' : 'heart-outline'} size={18} color={colors.rose} />
          <Text style={st.favText}>{fav ? 'В избранном' : 'В избранное'}</Text>
        </Pressable>
      </View>

      <Card>
        <Text style={st.about}>{person.about}</Text>
      </Card>

      <View>
        <Eyebrow>Записаться к {person.name.split(' ')[0]}</Eyebrow>
        <View style={{ marginTop: spacing.md }}>
          {own.map((sv) => (
            <Pressable
              key={sv.id}
              onPress={() => router.push({ pathname: '/booking/[serviceId]', params: { serviceId: sv.id, specialistId: person.id } })}
              style={st.row}
            >
              <Text style={st.rowTitle}>{sv.title}</Text>
              <Price service={sv} size={14} />
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const st = StyleSheet.create({
  meta: { fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted },
  fav: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.sm },
  favText: { fontFamily: fonts.sansMedium, color: colors.rose },
  about: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 22, color: colors.ink },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  rowTitle: { flex: 1, fontFamily: fonts.sans, fontSize: 15, color: colors.ink },
});
