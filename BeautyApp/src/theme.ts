export const colors = {
  ink: '#1D1714',
  inkSoft: '#2A221D',
  inkLine: 'rgba(245,238,228,0.12)',
  cream: '#F7F1E8',
  creamDeep: '#EFE6D8',
  gold: '#D4B48C',
  goldDeep: '#B8936A',
  rose: '#9E4F5C',
  surface: '#FFFFFF',
  text: '#1D1714',
  textMuted: 'rgba(29,23,20,0.55)',
  textOnDark: '#F5EEE4',
  textOnDarkMuted: 'rgba(245,238,228,0.62)',
  border: 'rgba(29,23,20,0.09)',
  success: '#3F8F5F',
  danger: '#B5473F',
};

export const fonts = {
  serif: 'CormorantGaramond_600SemiBold',
  serifItalic: 'CormorantGaramond_500Medium_Italic',
  sans: 'Inter_400Regular',
  sansMedium: 'Inter_500Medium',
  sansBold: 'Inter_600SemiBold',
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };

export const radius = { sm: 10, md: 16, lg: 24, pill: 999 };

export const gradients = {
  ink: ['#3D332C', '#2A221D', '#1D1714'] as const,
  gold: ['#E6CFAE', '#D4B48C', '#B8936A'] as const,
};
