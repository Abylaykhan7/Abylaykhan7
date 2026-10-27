import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ComponentProps, ReactNode } from 'react';
import { Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import { Service, Specialist } from '../data/catalog';
import { colors, fonts, gradients, radius, spacing } from '../theme';
import { formatDuration, formatPrice } from '../utils/format';

type IconName = ComponentProps<typeof Ionicons>['name'];

export function Logo({ size = 28, dark = false }: { size?: number; dark?: boolean }) {
  return (
    <Text style={{ fontFamily: fonts.serif, fontSize: size, color: dark ? colors.textOnDark : colors.ink, letterSpacing: -0.5 }}>
      Ar<Text style={{ fontFamily: fonts.serifItalic, color: dark ? colors.gold : colors.rose }}>ay</Text>
    </Text>
  );
}

export function Eyebrow({ children, dark, style }: { children: ReactNode; dark?: boolean; style?: TextStyle }) {
  return <Text style={[s.eyebrow, { color: dark ? colors.gold : colors.rose }, style]}>{children}</Text>;
}

export function Heading({ children, dark, size = 32, style }: { children: ReactNode; dark?: boolean; size?: number; style?: TextStyle }) {
  return (
    <Text style={[s.heading, { fontSize: size, lineHeight: size * 1.08, color: dark ? colors.textOnDark : colors.ink }, style]}>
      {children}
    </Text>
  );
}

/** Курсивный золотой акцент внутри заголовка */
export function Accent({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return <Text style={{ fontFamily: fonts.serifItalic, color: dark ? colors.gold : colors.rose }}>{children}</Text>;
}

export function Button({
  title,
  onPress,
  disabled,
  variant = 'ink',
  icon,
  style,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'ink' | 'gold' | 'outline' | 'outlineDark';
  icon?: IconName;
  style?: ViewStyle;
}) {
  const bg = { ink: colors.ink, gold: colors.gold, outline: 'transparent', outlineDark: 'transparent' }[variant];
  const fg = { ink: colors.textOnDark, gold: colors.ink, outline: colors.ink, outlineDark: colors.textOnDark }[variant];
  const border =
    variant === 'outline' ? { borderWidth: 1, borderColor: colors.border } : variant === 'outlineDark' ? { borderWidth: 1, borderColor: colors.inkLine } : null;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [s.button, { backgroundColor: bg }, border, disabled && { opacity: 0.35 }, pressed && { transform: [{ scale: 0.98 }] }, style]}
    >
      {icon ? <Ionicons name={icon} size={18} color={fg} /> : null}
      <Text style={[s.buttonText, { color: fg }]}>{title}</Text>
    </Pressable>
  );
}

export function Chip({ label, active, onPress, dark }: { label: string; active?: boolean; onPress?: () => void; dark?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        s.chip,
        dark && { backgroundColor: 'rgba(245,238,228,0.05)', borderColor: colors.inkLine },
        active && { backgroundColor: dark ? colors.gold : colors.ink, borderColor: dark ? colors.gold : colors.ink },
      ]}
    >
      <Text style={[s.chipText, dark && { color: colors.textOnDarkMuted }, active && { color: dark ? colors.ink : colors.textOnDark }]}>{label}</Text>
    </Pressable>
  );
}

export function Card({ children, style, dark }: { children: ReactNode; style?: ViewStyle; dark?: boolean }) {
  return <View style={[s.card, dark && s.cardDark, style]}>{children}</View>;
}

export function SectionHeader({ eyebrow, title, accent, dark, action, onAction }: {
  eyebrow?: string;
  title: string;
  accent?: string;
  dark?: boolean;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <View style={s.sectionHeader}>
      <View style={{ flex: 1 }}>
        {eyebrow ? <Eyebrow dark={dark}>{eyebrow}</Eyebrow> : null}
        <Heading dark={dark} size={28} style={{ marginTop: 6 }}>
          {title}
          {accent ? <Accent dark={dark}> {accent}</Accent> : null}
        </Heading>
      </View>
      {action ? (
        <Pressable onPress={onAction} hitSlop={10}>
          <Text style={[s.link, dark && { color: colors.gold }]}>{action} →</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function Price({ service, dark, size = 18 }: { service: Service; dark?: boolean; size?: number }) {
  return (
    <Text style={{ fontFamily: fonts.sansBold, fontSize: size, color: dark ? colors.textOnDark : colors.ink }}>
      {service.priceFrom ? 'от ' : ''}
      {formatPrice(service.price)}
    </Text>
  );
}

export function Meta({ icon, label, dark }: { icon: IconName; label: string; dark?: boolean }) {
  const c = dark ? colors.textOnDarkMuted : colors.textMuted;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, flexShrink: 1 }}>
      <Ionicons name={icon} size={13} color={c} />
      <Text style={{ fontFamily: fonts.sans, fontSize: 12, color: c, flexShrink: 1 }}>{label}</Text>
    </View>
  );
}

const TIER_ART: Record<string, { icon: IconName; label: string }> = {
  base: { icon: 'color-palette-outline', label: 'Base' },
  star: { icon: 'videocam-outline', label: 'Star' },
  icon: { icon: 'camera-outline', label: 'Icon' },
  bride: { icon: 'diamond-outline', label: 'Bride' },
};

/** Большая карточка тарифа — как витрина на главной */
export function PackageCard({ service, width }: { service: Service; width: number }) {
  const featured = service.tier === 'star';
  const dark = service.tier !== 'base';
  const art = TIER_ART[service.tier ?? 'base'];
  return (
    <Pressable
      onPress={() => router.push(`/service/${service.id}`)}
      style={({ pressed }) => [
        s.pkg,
        { width },
        dark ? s.pkgDark : s.pkgLight,
        featured && s.pkgFeatured,
        pressed && { transform: [{ scale: 0.99 }] },
      ]}
    >
      <LinearGradient
        colors={dark ? gradients.ink : ['#F3E9DC', '#E9DCC9', '#DCC8AE']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={s.pkgArt}
      >
        <Text style={[s.pkgArtLetter, { color: dark ? 'rgba(212,180,140,0.18)' : 'rgba(158,79,92,0.12)' }]}>{art.label}</Text>
        <View style={[s.pkgArtIcon, { borderColor: dark ? 'rgba(212,180,140,0.5)' : 'rgba(29,23,20,0.15)' }]}>
          <Ionicons name={art.icon} size={30} color={dark ? colors.gold : colors.rose} />
        </View>
      </LinearGradient>
      {featured ? (
        <View style={s.pkgBadge}>
          <Ionicons name="star" size={10} color={colors.ink} />
          <Text style={s.pkgBadgeText}>С ВИДЕО</Text>
        </View>
      ) : null}
      <View style={{ padding: spacing.lg, gap: 6, flex: 1 }}>
        <Eyebrow dark={dark} style={!dark ? { color: colors.textMuted } : undefined}>{service.team}</Eyebrow>
        <Heading dark={dark} size={28}>{service.title}</Heading>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
          <Price service={service} dark={dark} size={20} />
          <Meta icon="time-outline" label={formatDuration(service.durationMin)} dark={dark} />
        </View>
        <Text style={[s.body, { color: dark ? colors.textOnDarkMuted : colors.textMuted, flex: 1 }]} numberOfLines={3}>
          {service.summary}
        </Text>
        <Button
          title={featured ? 'Сборы со съёмкой' : 'Выбрать'}
          variant={dark ? 'gold' : 'ink'}
          onPress={() => router.push(`/booking/${service.id}`)}
          style={{ marginTop: spacing.sm }}
        />
      </View>
    </Pressable>
  );
}

export function ServiceRow({ service }: { service: Service }) {
  return (
    <Pressable onPress={() => router.push(`/service/${service.id}`)} style={({ pressed }) => [s.row, pressed && { opacity: 0.85 }]}>
      <View style={{ flex: 1, gap: 6 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={s.rowTitle}>{service.title}</Text>
          {service.popular ? <Ionicons name="sparkles" size={13} color={colors.goldDeep} /> : null}
        </View>
        <Text style={[s.body, { color: colors.textMuted }]} numberOfLines={2}>
          {service.summary}
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: spacing.md, rowGap: 4 }}>
          <Meta icon="time-outline" label={formatDuration(service.durationMin)} />
          <Meta icon="person-outline" label={service.team} />
        </View>
      </View>
      <View style={{ alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <Price service={service} size={15} />
        <View style={s.rowArrow}>
          <Ionicons name="arrow-forward" size={14} color={colors.ink} />
        </View>
      </View>
    </Pressable>
  );
}

export function Avatar({ person, size = 52 }: { person: Specialist; size?: number }) {
  const initials = person.name
    .split(' ')
    .map((p) => p[0])
    .join('');
  return (
    <LinearGradient
      colors={[person.tone, colors.ink]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.2, y: 1.4 }}
      style={{ width: size, height: size, borderRadius: size / 2, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text style={{ fontFamily: fonts.serif, fontSize: size / 2.4, color: colors.cream }}>{initials}</Text>
    </LinearGradient>
  );
}

export function SpecialistRow({
  person,
  selected,
  onPress,
  right,
}: {
  person: Specialist;
  selected?: boolean;
  onPress?: () => void;
  right?: ReactNode;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [s.row, { alignItems: 'center' }, selected && s.rowSelected, pressed && { opacity: 0.85 }]}>
      <Avatar person={person} />
      <View style={{ flex: 1, gap: 3 }}>
        <Text style={s.rowTitle}>{person.name}</Text>
        <Text style={[s.body, { color: colors.textMuted, fontSize: 13 }]}>{person.title}</Text>
        <Meta icon="star" label={`${person.rating.toFixed(1)} · ${person.reviews} отзывов · ${person.experienceYears} лет`} />
      </View>
      {right ?? (selected ? <Ionicons name="checkmark-circle" size={24} color={colors.ink} /> : null)}
    </Pressable>
  );
}

export const s = StyleSheet.create({
  eyebrow: { fontFamily: fonts.sansMedium, fontSize: 11, letterSpacing: 2.4, textTransform: 'uppercase' },
  heading: { fontFamily: fonts.serif, letterSpacing: -0.4 },
  body: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.ink },
  link: { fontFamily: fonts.sansMedium, color: colors.rose, fontSize: 13 },
  button: {
    minHeight: 50,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  buttonText: { fontFamily: fonts.sansBold, fontSize: 15 },
  chip: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipText: { fontFamily: fonts.sansMedium, fontSize: 13, color: colors.ink },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  cardDark: { backgroundColor: colors.ink, borderColor: 'rgba(212,180,140,0.45)' },
  sectionHeader: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.md, marginBottom: spacing.lg },
  pkg: { borderRadius: radius.lg, overflow: 'hidden' },
  pkgLight: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  pkgDark: { backgroundColor: colors.ink },
  pkgFeatured: { borderWidth: 2, borderColor: colors.gold, shadowColor: colors.gold, shadowOpacity: 0.55, shadowRadius: 24, shadowOffset: { width: 0, height: 12 }, elevation: 10 },
  pkgArt: { height: 170, alignItems: 'center', justifyContent: 'center' },
  pkgArtLetter: { position: 'absolute', fontFamily: fonts.serifItalic, fontSize: 120, bottom: -28, right: 10 },
  pkgArtIcon: { width: 72, height: 72, borderRadius: 36, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  pkgBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.gold,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  pkgBadgeText: { fontFamily: fonts.sansBold, fontSize: 10, letterSpacing: 1, color: colors.ink },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  rowSelected: { borderColor: colors.ink, borderWidth: 1.5 },
  rowTitle: { fontFamily: fonts.sansBold, fontSize: 15, color: colors.ink },
  rowArrow: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.creamDeep, alignItems: 'center', justifyContent: 'center' },
});
