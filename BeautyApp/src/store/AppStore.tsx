import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type PaymentMethod = 'kaspi' | 'card';

export interface Booking {
  id: string;
  serviceId: string;
  specialistId: string;
  addOnIds: string[];
  dateKey: string;
  time: string;
  address: string;
  occasion?: string;
  comment: string;
  payment: PaymentMethod;
  promoCode?: string;
  total: number;
  status: 'upcoming' | 'cancelled' | 'completed';
  createdAt: number;
}

export interface Profile {
  name: string;
  phone: string;
  city: string;
  address: string;
}

interface AppState {
  bookings: Booking[];
  favorites: string[];
  profile: Profile;
}

interface AppStore extends AppState {
  ready: boolean;
  addBooking: (booking: Omit<Booking, 'id' | 'status' | 'createdAt'>) => Booking;
  cancelBooking: (id: string) => void;
  toggleFavorite: (specialistId: string) => void;
  updateProfile: (patch: Partial<Profile>) => void;
}

const STORAGE_KEY = 'aiya-state-v1';

const initialState: AppState = {
  bookings: [],
  favorites: [],
  profile: { name: '', phone: '', city: 'Астана', address: '' },
};

const AppStoreContext = createContext<AppStore | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setState({ ...initialState, ...JSON.parse(raw) });
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
  }, [state, ready]);

  const addBooking = useCallback<AppStore['addBooking']>((data) => {
    const booking: Booking = {
      ...data,
      id: `AY${Date.now().toString(36).toUpperCase()}`,
      status: 'upcoming',
      createdAt: Date.now(),
    };
    setState((s) => ({ ...s, bookings: [booking, ...s.bookings] }));
    return booking;
  }, []);

  const cancelBooking = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      bookings: s.bookings.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b)),
    }));
  }, []);

  const toggleFavorite = useCallback((specialistId: string) => {
    setState((s) => ({
      ...s,
      favorites: s.favorites.includes(specialistId)
        ? s.favorites.filter((id) => id !== specialistId)
        : [...s.favorites, specialistId],
    }));
  }, []);

  const updateProfile = useCallback((patch: Partial<Profile>) => {
    setState((s) => ({ ...s, profile: { ...s.profile, ...patch } }));
  }, []);

  const value = useMemo(
    () => ({ ...state, ready, addBooking, cancelBooking, toggleFavorite, updateProfile }),
    [state, ready, addBooking, cancelBooking, toggleFavorite, updateProfile],
  );

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export function useAppStore(): AppStore {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error('useAppStore must be used inside AppStoreProvider');
  return ctx;
}
