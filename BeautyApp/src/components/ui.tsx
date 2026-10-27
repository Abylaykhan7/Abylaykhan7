import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Category, LEVEL_INFO, Master, Service } from '../data/catalog';
import { colors, radius, spacing } from '../theme';
import { formatDuration, formatPrice } from '../utils/format';

export function PrimaryButton({
  title,
  onPress,
  disabled,
  variant = 'primary',
  style,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'outline';
  style?: ViewStyle;
}) {
  const outline = variant === 'outline';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        outline && styles.buttonOutline,
        disabled && styles.buttonDisabled,
        pressed && { opacity: 0.85 },
        style,
      ]}
    >
      <Text style={[styles.buttonText, outline && { color: colors.primary }]}>{title}</Text>
    </Pressable>
  );
}

export function SectionTitle({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <View style={styles.sectionRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text style={styles.sectionAction}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function Chip({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

export function Card({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function CategoryTile({ category, width }: { category: Category; width: number }) {
  return (
    <Pressable
      onPress={() => router.push(`/category/${category.id}`)}
      style={({ pressed }) => [styles.categoryTile, { width, backgroundColor: category.color }, pressed && { opacity: 0.8 }]}
    >
      <Text style={styles.categoryEmoji}>{category.emoji}</Text>
      <Text style={styles.categoryTitle} numberOfLines={2}>
        {category.title}
      </Text>
    </Pressable>
  );
}

export function Badge({ label, color = colors.primary }: { label: string; color?: string }) {
  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}

export function ServiceRow({ service }: { service: Service }) {
  return (
    <Pressable
      onPress={() => router.push(`/service/${service.id}`)}
      style={({ pressed }) => [styles.serviceRow, pressed && { opacity: 0.85 }]}
    >
      <View style={{ flex: 1, gap: 4 }}>
        <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
          {service.isNew ? <Badge label="Новое" color={colors.accent} /> : null}
          {service.popular ? <Badge label="Хит" /> : null}
        </View>
        <Text style={styles.serviceTitle}>{service.title}</Text>
        <Text style={styles.muted}>
          <Ionicons name="time-outline" size={13} /> {formatDuration(service.durationMin)}
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end', gap: 6 }}>
        <Text style={styles.price}>
          {service.priceFrom ? 'от ' : ''}
          {formatPrice(service.price)}
        </Text>
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      </View>
    </Pressable>
  );
}

export function Avatar({ master, size = 48 }: { master: Master; size?: number }) {
  const initials = master.name
    .split(' ')
    .map((p) => p[0])
    .join('');
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: master.avatarColor,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontWeight: '700', fontSize: size / 2.8, color: colors.text }}>{initials}</Text>
    </View>
  );
}

export function Rating({ master }: { master: Master }) {
  return (
    <Text style={styles.muted}>
      <Ionicons name="star" size={13} color={colors.star} /> {master.rating.toFixed(1)} · {master.reviews} отзывов
    </Text>
  );
}

export function MasterRow({
  master,
  selected,
  onPress,
  right,
}: {
  master: Master;
  selected?: boolean;
  onPress?: () => void;
  right?: ReactNode;
}) {
  return (
    <Pressable
      onPress={onPress ?? (() => router.push(`/master/${master.id}`))}
      style={({ pressed }) => [styles.masterRow, selected && styles.masterRowSelected, pressed && { opacity: 0.85 }]}
    >
      <Avatar master={master} />
      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text style={styles.serviceTitle}>{master.name}</Text>
          {master.level === 'top' ? <Badge label={LEVEL_INFO.top.title} color={colors.accent} /> : null}
        </View>
        <Rating master={master} />
        <Text style={styles.muted}>Опыт {master.experienceYears} лет</Text>
      </View>
      {right}
    </Pressable>
  );
}

export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  buttonOutline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.primary },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  sectionTitle: { fontSize: 19, fontWeight: '700', color: colors.text },
  sectionAction: { color: colors.primary, fontWeight: '600' },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.text, fontWeight: '500' },
  chipTextActive: { color: '#fff' },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryTile: {
    borderRadius: radius.lg,
    padding: spacing.md,
    height: 104,
    justifyContent: 'space-between',
  },
  categoryEmoji: { fontSize: 30 },
  categoryTitle: { fontWeight: '600', color: colors.text, fontSize: 13 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.pill },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  serviceRow: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  serviceTitle: { fontSize: 15, fontWeight: '600', color: colors.text },
  muted: { color: colors.textMuted, fontSize: 13 },
  price: { fontSize: 16, fontWeight: '700', color: colors.text },
  masterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  masterRowSelected: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
});
