// Каталог услуг. Цены в тенге (₸) — ориентир по рынку Алматы/Астаны,
// перед запуском сверьте с актуальным прайсом.

export type CategoryId =
  | 'nails'
  | 'pedicure'
  | 'hair'
  | 'barber'
  | 'brows'
  | 'makeup'
  | 'cosmetology'
  | 'massage'
  | 'depilation'
  | 'photo'
  | 'video'
  | 'events';

export interface Category {
  id: CategoryId;
  title: string;
  emoji: string;
  color: string;
}

export interface AddOn {
  id: string;
  title: string;
  price: number;
}

export interface Service {
  id: string;
  categoryId: CategoryId;
  title: string;
  description: string;
  price: number;
  /** true — цена «от», итог уточняет мастер */
  priceFrom?: boolean;
  durationMin: number;
  addOns?: AddOn[];
  popular?: boolean;
  isNew?: boolean;
}

export type MasterLevel = 'master' | 'top';

export interface Master {
  id: string;
  name: string;
  categories: CategoryId[];
  level: MasterLevel;
  rating: number;
  reviews: number;
  experienceYears: number;
  about: string;
  avatarColor: string;
}

export type VisitFormat = 'home' | 'studio';

export const VISIT_FEE = 2000;

export const LEVEL_INFO: Record<MasterLevel, { title: string; multiplier: number }> = {
  master: { title: 'Мастер', multiplier: 1 },
  top: { title: 'Топ-мастер', multiplier: 1.25 },
};

export const PROMO_CODES: Record<string, number> = {
  GLOW10: 0.1,
  FIRST15: 0.15,
};

export const CITIES = ['Алматы', 'Астана', 'Шымкент', 'Караганда', 'Актобе'];

export const categories: Category[] = [
  { id: 'nails', title: 'Маникюр', emoji: '💅', color: '#FDE7EF' },
  { id: 'pedicure', title: 'Педикюр', emoji: '🦶', color: '#FCEFE3' },
  { id: 'hair', title: 'Волосы', emoji: '💇‍♀️', color: '#EDE7FE' },
  { id: 'barber', title: 'Барбер', emoji: '💈', color: '#E3F0FC' },
  { id: 'brows', title: 'Брови и ресницы', emoji: '👁️', color: '#FFF3D6' },
  { id: 'makeup', title: 'Макияж', emoji: '💄', color: '#FDE3E3' },
  { id: 'cosmetology', title: 'Косметолог', emoji: '🧴', color: '#E2F6EC' },
  { id: 'massage', title: 'Массаж и SPA', emoji: '💆‍♀️', color: '#E6F4F7' },
  { id: 'depilation', title: 'Депиляция', emoji: '✨', color: '#F4E9FB' },
  { id: 'photo', title: 'Фотосессия', emoji: '📸', color: '#E7ECFE' },
  { id: 'video', title: 'Видеосъёмка', emoji: '🎬', color: '#EAF7E2' },
  { id: 'events', title: 'Образ под ключ', emoji: '👰', color: '#FFE9F3' },
];

const nailAddOns: AddOn[] = [
  { id: 'design', title: 'Дизайн (до 4 ногтей)', price: 1500 },
  { id: 'removal', title: 'Снятие старого покрытия', price: 1000 },
  { id: 'strength', title: 'Укрепление гелем', price: 2000 },
];

const photoAddOns: AddOn[] = [
  { id: 'studio', title: 'Аренда студии (1 час)', price: 10000 },
  { id: 'extra-hour', title: 'Дополнительный час съёмки', price: 15000 },
  { id: 'retouch', title: 'Ретушь +10 фото', price: 8000 },
  { id: 'makeup', title: 'Визажист на съёмку', price: 12000 },
  { id: 'express', title: 'Экспресс-готовность (48 ч)', price: 7000 },
];

const videoAddOns: AddOn[] = [
  { id: 'extra-reel', title: 'Дополнительный Reels', price: 10000 },
  { id: 'drone', title: 'Съёмка с дрона', price: 20000 },
  { id: 'express', title: 'Экспресс-монтаж (48 ч)', price: 10000 },
];

export const services: Service[] = [
  // Маникюр
  { id: 'mani-classic', categoryId: 'nails', title: 'Классический маникюр', description: 'Обработка кутикулы, придание формы, покрытие лаком по желанию.', price: 5000, durationMin: 60, addOns: nailAddOns },
  { id: 'mani-gel', categoryId: 'nails', title: 'Маникюр + гель-лак', description: 'Комбинированный маникюр и однотонное покрытие гель-лаком, держится до 3 недель.', price: 8000, durationMin: 90, addOns: nailAddOns, popular: true },
  { id: 'mani-ext', categoryId: 'nails', title: 'Наращивание ногтей', description: 'Наращивание гелем на формы, любая длина, покрытие включено.', price: 14000, durationMin: 150, addOns: nailAddOns },
  { id: 'mani-correction', categoryId: 'nails', title: 'Коррекция наращивания', description: 'Коррекция отросших ногтей и новое покрытие.', price: 11000, durationMin: 120, addOns: nailAddOns },
  { id: 'mani-men', categoryId: 'nails', title: 'Мужской маникюр', description: 'Гигиенический маникюр, полировка ногтевой пластины.', price: 5000, durationMin: 45 },

  // Педикюр
  { id: 'pedi-classic', categoryId: 'pedicure', title: 'Педикюр классический', description: 'Обработка стоп и пальцев, без покрытия.', price: 8000, durationMin: 60 },
  { id: 'pedi-gel', categoryId: 'pedicure', title: 'Педикюр + гель-лак', description: 'Аппаратный педикюр с покрытием гель-лаком.', price: 11000, durationMin: 90, popular: true },
  { id: 'pedi-smart', categoryId: 'pedicure', title: 'SMART-педикюр', description: 'Бережная обработка стоп дисками, подходит при трещинах.', price: 13000, durationMin: 90 },
  { id: 'combo-mp', categoryId: 'pedicure', title: 'Маникюр + педикюр с покрытием', description: 'Два мастера одновременно или один мастер последовательно.', price: 17000, durationMin: 150, popular: true },

  // Волосы
  { id: 'hair-cut', categoryId: 'hair', title: 'Женская стрижка', description: 'Стрижка любой сложности, мытьё и укладка феном.', price: 7000, durationMin: 60 },
  { id: 'hair-style', categoryId: 'hair', title: 'Укладка', description: 'Локоны, волны, объём — для праздника или фотосессии.', price: 6000, durationMin: 45 },
  { id: 'hair-updo', categoryId: 'hair', title: 'Вечерняя причёска', description: 'Собранная причёска на мероприятие.', price: 12000, durationMin: 75 },
  { id: 'hair-color', categoryId: 'hair', title: 'Окрашивание в один тон', description: 'Окрашивание корней или по длине профессиональными красителями.', price: 18000, priceFrom: true, durationMin: 120 },
  { id: 'hair-airtouch', categoryId: 'hair', title: 'Сложное окрашивание (AirTouch, шатуш)', description: 'Мелирование, тонирование, уход. Цена зависит от длины и густоты.', price: 45000, priceFrom: true, durationMin: 240 },
  { id: 'hair-keratin', categoryId: 'hair', title: 'Кератиновое выпрямление', description: 'Гладкость и блеск до 4 месяцев.', price: 25000, priceFrom: true, durationMin: 180 },

  // Барбер
  { id: 'barber-cut', categoryId: 'barber', title: 'Мужская стрижка', description: 'Машинка + ножницы, мытьё головы, укладка.', price: 5000, durationMin: 45 },
  { id: 'barber-beard', categoryId: 'barber', title: 'Оформление бороды', description: 'Моделирование бороды, горячее полотенце.', price: 3500, durationMin: 30 },
  { id: 'barber-combo', categoryId: 'barber', title: 'Стрижка + борода', description: 'Комплекс со скидкой.', price: 7500, durationMin: 75, popular: true },
  { id: 'barber-kids', categoryId: 'barber', title: 'Детская стрижка', description: 'Для детей до 12 лет.', price: 4000, durationMin: 30 },

  // Брови и ресницы
  { id: 'brows-shape', categoryId: 'brows', title: 'Коррекция и окрашивание бровей', description: 'Архитектура бровей, окрашивание краской или хной.', price: 5000, durationMin: 45 },
  { id: 'brows-lami', categoryId: 'brows', title: 'Ламинирование бровей', description: 'Фиксация формы, окрашивание и уход.', price: 8000, durationMin: 60, popular: true },
  { id: 'lash-lami', categoryId: 'brows', title: 'Ламинирование ресниц', description: 'Изгиб, окрашивание и ботокс ресниц.', price: 9000, durationMin: 60 },
  { id: 'lash-classic', categoryId: 'brows', title: 'Наращивание ресниц (классика)', description: 'Поресничное наращивание, эффект естественных ресниц.', price: 10000, durationMin: 120 },
  { id: 'lash-volume', categoryId: 'brows', title: 'Наращивание ресниц 2D–3D', description: 'Объёмное наращивание.', price: 13000, durationMin: 150 },

  // Макияж
  { id: 'makeup-day', categoryId: 'makeup', title: 'Дневной макияж', description: 'Лёгкий естественный образ.', price: 10000, durationMin: 60 },
  { id: 'makeup-evening', categoryId: 'makeup', title: 'Вечерний макияж', description: 'Яркий стойкий макияж для мероприятия, ресницы в подарок.', price: 14000, durationMin: 75, popular: true },
  { id: 'makeup-photo', categoryId: 'makeup', title: 'Макияж для фотосессии', description: 'Фотостойкий макияж с учётом света и камеры.', price: 15000, durationMin: 75, isNew: true },
  { id: 'makeup-bridal', categoryId: 'makeup', title: 'Свадебный макияж', description: 'Пробный образ + макияж в день свадьбы.', price: 35000, durationMin: 120 },

  // Косметология
  { id: 'cosm-clean', categoryId: 'cosmetology', title: 'Чистка лица комбинированная', description: 'Ультразвуковая + механическая чистка, маска.', price: 15000, durationMin: 90 },
  { id: 'cosm-peel', categoryId: 'cosmetology', title: 'Пилинг лица', description: 'Кислотный пилинг по типу кожи.', price: 12000, durationMin: 60 },
  { id: 'cosm-care', categoryId: 'cosmetology', title: 'Уходовая процедура', description: 'Увлажнение, альгинатная маска, массаж лица.', price: 14000, durationMin: 75 },

  // Массаж и SPA
  { id: 'massage-classic', categoryId: 'massage', title: 'Классический массаж (60 мин)', description: 'Массаж всего тела.', price: 12000, durationMin: 60, popular: true },
  { id: 'massage-relax', categoryId: 'massage', title: 'Релакс-массаж (90 мин)', description: 'Медленный расслабляющий массаж с аромамаслами.', price: 17000, durationMin: 90 },
  { id: 'massage-anticell', categoryId: 'massage', title: 'Антицеллюлитный массаж', description: 'Курс рекомендован от 10 сеансов.', price: 13000, durationMin: 60 },
  { id: 'massage-back', categoryId: 'massage', title: 'Массаж спины и шеи', description: 'Снимает напряжение после работы за компьютером.', price: 8000, durationMin: 40 },
  { id: 'massage-face', categoryId: 'massage', title: 'Массаж лица', description: 'Скульптурный/буккальный массаж.', price: 9000, durationMin: 45 },

  // Депиляция
  { id: 'dep-arms', categoryId: 'depilation', title: 'Шугаринг подмышек', description: 'Сахарная паста, уход после процедуры.', price: 3000, durationMin: 20 },
  { id: 'dep-legs', categoryId: 'depilation', title: 'Шугаринг ног полностью', description: '', price: 9000, durationMin: 60 },
  { id: 'dep-bikini', categoryId: 'depilation', title: 'Глубокое бикини', description: '', price: 8000, durationMin: 45 },
  { id: 'dep-complex', categoryId: 'depilation', title: 'Комплекс: ноги + бикини + подмышки', description: 'Самый выгодный вариант.', price: 16000, durationMin: 120, popular: true },

  // Фотосессия
  { id: 'photo-individual', categoryId: 'photo', title: 'Индивидуальная фотосессия (1 час)', description: 'Съёмка на улице или в студии, 15 фото в ретуши, все исходники.', price: 25000, durationMin: 60, addOns: photoAddOns, popular: true, isNew: true },
  { id: 'photo-instagram', categoryId: 'photo', title: 'Контент для Instagram', description: '2 часа, 2–3 образа, 30 фото в ретуши для блога или бизнеса.', price: 40000, durationMin: 120, addOns: photoAddOns, isNew: true },
  { id: 'photo-lovestory', categoryId: 'photo', title: 'Love Story', description: 'Фотосессия для пары, 1,5 часа, 25 фото в ретуши.', price: 35000, durationMin: 90, addOns: photoAddOns, isNew: true },
  { id: 'photo-family', categoryId: 'photo', title: 'Семейная / детская фотосессия', description: '1,5 часа, до 6 человек, 30 фото в ретуши.', price: 40000, durationMin: 90, addOns: photoAddOns, isNew: true },
  { id: 'photo-business', categoryId: 'photo', title: 'Деловой портрет', description: 'Портреты для резюме, LinkedIn, сайта компании. 10 фото в ретуши.', price: 25000, durationMin: 60, addOns: photoAddOns, isNew: true },
  { id: 'photo-pregnancy', categoryId: 'photo', title: 'Фотосессия беременности', description: 'Студия, платья в аренду, 20 фото в ретуши.', price: 45000, durationMin: 120, addOns: photoAddOns, isNew: true },
  { id: 'photo-wedding', categoryId: 'photo', title: 'Свадебная фотосъёмка (полный день)', description: 'Сборы, прогулка, банкет. 300+ фото, 60 в ретуши, фотокнига.', price: 200000, priceFrom: true, durationMin: 600, addOns: photoAddOns, isNew: true },

  // Видеосъёмка
  { id: 'video-reels', categoryId: 'video', title: 'Reels / TikTok (3 ролика)', description: 'Съёмка и монтаж трёх вертикальных роликов до 30 секунд.', price: 30000, durationMin: 120, addOns: videoAddOns, isNew: true },
  { id: 'video-event', categoryId: 'video', title: 'Видеосъёмка мероприятия', description: 'Той, день рождения, корпоратив — до 4 часов, клип 3–5 минут.', price: 80000, priceFrom: true, durationMin: 240, addOns: videoAddOns, isNew: true },
  { id: 'video-wedding', categoryId: 'video', title: 'Свадебный клип', description: 'Полный день, клип 5–7 минут + полный фильм.', price: 180000, priceFrom: true, durationMin: 600, addOns: videoAddOns, isNew: true },

  // Образ под ключ
  { id: 'look-photo', categoryId: 'events', title: 'Фотосессия + макияж + укладка', description: 'Визажист и фотограф в одном заказе. 1 час съёмки, 15 фото в ретуши.', price: 45000, durationMin: 180, addOns: photoAddOns, popular: true, isNew: true },
  { id: 'look-party', categoryId: 'events', title: 'Образ на мероприятие', description: 'Вечерний макияж + причёска.', price: 24000, durationMin: 120 },
  { id: 'look-bride', categoryId: 'events', title: 'Образ невесты (кыз узату / свадьба)', description: 'Пробный образ, макияж, причёска, выезд в день торжества.', price: 60000, priceFrom: true, durationMin: 180 },
];

export const masters: Master[] = [
  { id: 'm1', name: 'Айгерим С.', categories: ['nails', 'pedicure'], level: 'top', rating: 4.9, reviews: 412, experienceYears: 7, about: 'Аппаратный маникюр, сложные дизайны, наращивание.', avatarColor: '#F7B6CB' },
  { id: 'm2', name: 'Динара К.', categories: ['nails', 'pedicure', 'depilation'], level: 'master', rating: 4.8, reviews: 187, experienceYears: 4, about: 'Аккуратный маникюр и SMART-педикюр.', avatarColor: '#C9B8F9' },
  { id: 'm3', name: 'Мадина Т.', categories: ['hair', 'events'], level: 'top', rating: 4.9, reviews: 298, experienceYears: 9, about: 'Колорист, сложные окрашивания, свадебные причёски.', avatarColor: '#FFD59E' },
  { id: 'm4', name: 'Арман Б.', categories: ['barber'], level: 'master', rating: 4.7, reviews: 156, experienceYears: 5, about: 'Мужские стрижки, фейды, бороды.', avatarColor: '#A9D2F5' },
  { id: 'm5', name: 'Жанель А.', categories: ['brows', 'makeup', 'events'], level: 'top', rating: 5.0, reviews: 341, experienceYears: 6, about: 'Визажист, бровист, ламинирование.', avatarColor: '#F9C2C2' },
  { id: 'm6', name: 'Сауле М.', categories: ['cosmetology', 'massage'], level: 'master', rating: 4.8, reviews: 120, experienceYears: 8, about: 'Медицинское образование, массаж лица и тела.', avatarColor: '#B7E4C7' },
  { id: 'm7', name: 'Ерлан Ж.', categories: ['massage'], level: 'master', rating: 4.8, reviews: 98, experienceYears: 10, about: 'Классический и спортивный массаж.', avatarColor: '#BFE3EA' },
  { id: 'm8', name: 'Алия Н.', categories: ['photo', 'events'], level: 'top', rating: 4.9, reviews: 233, experienceYears: 8, about: 'Портретный и fashion-фотограф, Love Story, свадьбы.', avatarColor: '#C7D0FB' },
  { id: 'm9', name: 'Тимур Р.', categories: ['photo', 'video'], level: 'master', rating: 4.8, reviews: 141, experienceYears: 5, about: 'Фото и видео для Instagram, Reels, мероприятия.', avatarColor: '#CDEBC0' },
  { id: 'm10', name: 'Камила О.', categories: ['makeup', 'hair', 'brows'], level: 'master', rating: 4.7, reviews: 76, experienceYears: 3, about: 'Дневной и вечерний макияж, укладки.', avatarColor: '#F6C8E6' },
  { id: 'm11', name: 'Асель Д.', categories: ['depilation', 'cosmetology'], level: 'master', rating: 4.8, reviews: 164, experienceYears: 6, about: 'Шугаринг, чистки лица, пилинги.', avatarColor: '#E6CCF5' },
  { id: 'm12', name: 'Нурлан Е.', categories: ['video', 'photo'], level: 'top', rating: 4.9, reviews: 109, experienceYears: 11, about: 'Свадебные фильмы, съёмка с дрона.', avatarColor: '#D6E8B5' },
];

export const getCategory = (id: string) => categories.find((c) => c.id === id);
export const getService = (id: string) => services.find((s) => s.id === id);
export const getMaster = (id: string) => masters.find((m) => m.id === id);
export const servicesByCategory = (id: string) => services.filter((s) => s.categoryId === id);
export const mastersForCategory = (id: string) => masters.filter((m) => m.categories.includes(id as CategoryId));

export function priceForLevel(service: Service, level: MasterLevel): number {
  return Math.round((service.price * LEVEL_INFO[level].multiplier) / 500) * 500;
}

export function priceForMaster(service: Service, master?: Master): number {
  return priceForLevel(service, master?.level ?? 'master');
}

/** Детерминированно «занятые» слоты, пока нет бэкенда */
export function isSlotBusy(masterId: string, dateKey: string, time: string): boolean {
  const seed = `${masterId}${dateKey}${time}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return hash % 4 === 0;
}

export const TIME_SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
