// Каталог AiYa: только макияж, причёски, фото- и видеосъёмка, бэкстейдж.
// Цены в тенге (₸), выезд по городу включён. Базовые тарифы выровнены по рынку Астаны
// (макияж + укладка ~35 000 ₸, со съёмкой сборов ~65 000 ₸) — перед запуском сверьте с прайсом.

export type CategoryId = 'packages' | 'makeup' | 'hair' | 'photo' | 'video' | 'backstage';

export interface Category {
  id: CategoryId;
  title: string;
  subtitle: string;
  icon: 'sparkles-outline' | 'color-palette-outline' | 'cut-outline' | 'camera-outline' | 'videocam-outline' | 'film-outline';
}

export interface AddOn {
  id: string;
  title: string;
  price: number;
}

export type Tier = 'base' | 'star' | 'icon' | 'bride';

export interface Service {
  id: string;
  categoryId: CategoryId;
  title: string;
  summary: string;
  includes: string[];
  price: number;
  /** true — цена «от», итог согласуем после заявки */
  priceFrom?: boolean;
  durationMin: number;
  /** Кто приезжает: подпись в карточке */
  team: string;
  addOns?: AddOn[];
  tier?: Tier;
  popular?: boolean;
}

export type Role = 'makeup' | 'hair' | 'photo' | 'video';

export interface Specialist {
  id: string;
  name: string;
  roles: Role[];
  title: string;
  rating: number;
  reviews: number;
  experienceYears: number;
  about: string;
  tone: string;
}

/** Кто ведёт заказ в каждой категории */
export const LEAD_ROLE: Record<CategoryId, Role> = {
  packages: 'makeup',
  makeup: 'makeup',
  hair: 'hair',
  photo: 'photo',
  video: 'video',
  backstage: 'video',
};

export const PROMO_CODES: Record<string, number> = {
  AIYA10: 0.1,
  FIRST15: 0.15,
};

/** Номер поддержки в формате wa.me — замените на свой */
export const WHATSAPP = '77000000000';

export const CITIES = ['Астана', 'Алматы', 'Шымкент'];

export const categories: Category[] = [
  { id: 'packages', title: 'Пакеты', subtitle: 'Образ и съёмка под ключ', icon: 'sparkles-outline' },
  { id: 'makeup', title: 'Макияж', subtitle: 'Дневной, вечерний, свадебный', icon: 'color-palette-outline' },
  { id: 'hair', title: 'Причёски', subtitle: 'Укладки и собранные образы', icon: 'cut-outline' },
  { id: 'photo', title: 'Фотосъёмка', subtitle: 'Портреты, love story, события', icon: 'camera-outline' },
  { id: 'video', title: 'Видео и Reels', subtitle: 'Ролики, клипы, фильмы', icon: 'videocam-outline' },
  { id: 'backstage', title: 'Бэкстейдж', subtitle: 'Съёмка ваших сборов', icon: 'film-outline' },
];

const beautyAddOns: AddOn[] = [
  { id: 'lashes', title: 'Ресницы-пучки', price: 3000 },
  { id: 'early', title: 'Ранний выезд (до 7:00)', price: 5000 },
  { id: 'trial', title: 'Пробный образ заранее', price: 15000 },
  { id: 'touchup', title: 'Мастер остаётся на коррекцию (1 ч)', price: 10000 },
];

const shootAddOns: AddOn[] = [
  { id: 'extra-hour', title: 'Дополнительный час съёмки', price: 15000 },
  { id: 'studio', title: 'Аренда студии (1 ч)', price: 12000 },
  { id: 'retouch', title: 'Ещё 10 фото в ретуши', price: 8000 },
  { id: 'express', title: 'Экспресс-готовность за 24 ч', price: 10000 },
];

const videoAddOns: AddOn[] = [
  { id: 'extra-reel', title: 'Дополнительный Reels', price: 12000 },
  { id: 'drone', title: 'Съёмка с дрона', price: 25000 },
  { id: 'express', title: 'Экспресс-монтаж за 24 ч', price: 10000 },
];

export const services: Service[] = [
  // Пакеты
  {
    id: 'pkg-base',
    categoryId: 'packages',
    tier: 'base',
    title: 'AiYa Base',
    summary: 'Безупречный макияж и укладка — у вас дома, в отеле или апартаментах.',
    includes: ['Подготовка кожи и макияж премиальной косметикой', 'Причёска или укладка Dyson', 'Ресницы-пучки в подарок'],
    price: 35000,
    durationMin: 90,
    team: 'Визажист-стилист',
    addOns: beautyAddOns.slice(1),
    popular: true,
  },
  {
    id: 'pkg-star',
    categoryId: 'packages',
    tier: 'star',
    title: 'AiYa Star',
    summary: 'Сборы как у звезды: мы собираем вас, мобилограф снимает каждый момент.',
    includes: [
      'Всё из AiYa Base',
      'Мобилограф со светом снимает сборы',
      'Готовый Reels о вашем образе за 48 ч',
      'Халат, напиток и патчи — сервис уровня звезды',
    ],
    price: 65000,
    durationMin: 90,
    team: 'Визажист + мобилограф',
    addOns: [...beautyAddOns.slice(1), videoAddOns[0]],
    popular: true,
  },
  {
    id: 'pkg-icon',
    categoryId: 'packages',
    tier: 'icon',
    title: 'AiYa Icon',
    summary: 'Образ, бэкстейдж и фотосессия после сборов — контент на месяц вперёд.',
    includes: [
      'Всё из AiYa Star',
      'Фотограф: 1 ч съёмки после сборов',
      '20 фото в авторской ретуши',
      '2 Reels: бэкстейдж и финальный образ',
    ],
    price: 120000,
    durationMin: 180,
    team: 'Визажист + фотограф + мобилограф',
    addOns: [...beautyAddOns.slice(1), ...shootAddOns.slice(0, 2), videoAddOns[0]],
  },
  {
    id: 'pkg-bride',
    categoryId: 'packages',
    tier: 'bride',
    title: 'Утро невесты',
    summary: 'Свадьба или қыз ұзату: пробный образ, сборы, фото и видео бэкстейджа.',
    includes: [
      'Пробный образ за 1–2 недели',
      'Свадебный макияж и причёска',
      'Фотограф и видеограф на сборах (3 ч)',
      'Клип «утро невесты» 1–2 мин + 60 фото',
    ],
    price: 190000,
    priceFrom: true,
    durationMin: 180,
    team: 'Визажист + стилист + фотограф + видеограф',
    addOns: [beautyAddOns[1], beautyAddOns[3], videoAddOns[1]],
  },

  // Макияж
  { id: 'mk-day', categoryId: 'makeup', title: 'Дневной макияж', summary: 'Свежий естественный образ на каждый день, деловую встречу или фото.', includes: ['Подготовка кожи', 'Стойкий тон и лёгкие акценты'], price: 20000, durationMin: 60, team: 'Визажист', addOns: beautyAddOns },
  { id: 'mk-evening', categoryId: 'makeup', title: 'Вечерний макияж', summary: 'Выразительный стойкий макияж на той, день рождения или вечеринку.', includes: ['Подготовка кожи', 'Скульптурирование и стрелки', 'Ресницы-пучки'], price: 25000, durationMin: 75, team: 'Визажист', addOns: beautyAddOns.slice(1), popular: true },
  { id: 'mk-camera', categoryId: 'makeup', title: 'Макияж для съёмки', summary: 'Фотостойкий макияж с учётом света и камеры — для фотосессии и Reels.', includes: ['Матирующий стойкий тон', 'Коррекция под свет'], price: 25000, durationMin: 75, team: 'Визажист', addOns: beautyAddOns },
  { id: 'mk-bride', categoryId: 'makeup', title: 'Свадебный макияж', summary: 'Для свадьбы и қыз ұзату: держится весь день, красиво в кадре.', includes: ['Пробный образ', 'Водостойкие текстуры', 'Ресницы-пучки'], price: 45000, durationMin: 90, team: 'Визажист', addOns: [beautyAddOns[1], beautyAddOns[3]] },
  { id: 'mk-express', categoryId: 'makeup', title: 'Экспресс-макияж', summary: 'Быстро освежить образ за 40 минут.', includes: ['Тон, брови, ресницы, губы'], price: 15000, durationMin: 40, team: 'Визажист', addOns: beautyAddOns.slice(0, 2) },

  // Причёски
  { id: 'hr-style', categoryId: 'hair', title: 'Укладка Dyson', summary: 'Объём, гладкость или лёгкие волны.', includes: ['Термозащита', 'Укладка феном и стайлером'], price: 15000, durationMin: 45, team: 'Стилист по волосам', addOns: [beautyAddOns[1]] },
  { id: 'hr-waves', categoryId: 'hair', title: 'Голливудская волна', summary: 'Классическая блестящая волна для вечернего выхода.', includes: ['Фиксация на весь вечер'], price: 20000, durationMin: 60, team: 'Стилист по волосам', addOns: [beautyAddOns[1]] },
  { id: 'hr-updo', categoryId: 'hair', title: 'Вечерняя причёска', summary: 'Собранный или полусобранный образ на мероприятие.', includes: ['Укладка', 'Сборка и фиксация'], price: 20000, durationMin: 60, team: 'Стилист по волосам', addOns: [beautyAddOns[1]], popular: true },
  { id: 'hr-bride', categoryId: 'hair', title: 'Свадебная причёска', summary: 'С фатой, сәукеле или украшениями — держится весь день.', includes: ['Пробная причёска', 'Работа с аксессуарами'], price: 30000, durationMin: 90, team: 'Стилист по волосам', addOns: [beautyAddOns[1], beautyAddOns[3]] },

  // Фото
  { id: 'ph-after', categoryId: 'photo', title: 'Фото после сборов', summary: 'Короткая съёмка готового образа у вас дома или рядом.', includes: ['30 минут съёмки', '15 фото в ретуши', 'Все исходники'], price: 20000, durationMin: 30, team: 'Фотограф', addOns: shootAddOns },
  { id: 'ph-portrait', categoryId: 'photo', title: 'Портретная фотосессия', summary: 'Час съёмки в городе, дома или в студии.', includes: ['1 час съёмки', '25 фото в ретуши', 'Помощь с позированием'], price: 30000, durationMin: 60, team: 'Фотограф', addOns: shootAddOns, popular: true },
  { id: 'ph-love', categoryId: 'photo', title: 'Love story', summary: 'Фотосессия для пары: прогулка, эмоции, живые кадры.', includes: ['1,5 часа съёмки', '35 фото в ретуши'], price: 45000, durationMin: 90, team: 'Фотограф', addOns: shootAddOns },
  { id: 'ph-event', categoryId: 'photo', title: 'Фото на тое или празднике', summary: 'Репортаж с мероприятия: гости, детали, главные моменты.', includes: ['3 часа съёмки', '150+ фото в цветокоррекции'], price: 90000, durationMin: 180, team: 'Фотограф', addOns: shootAddOns },
  { id: 'ph-wedding', categoryId: 'photo', title: 'Свадебная фотосъёмка', summary: 'Полный день: сборы, прогулка, банкет.', includes: ['До 10 часов съёмки', '400+ фото', '80 фото в ретуши'], price: 220000, priceFrom: true, durationMin: 600, team: 'Фотограф', addOns: shootAddOns },

  // Видео
  { id: 'vd-reel', categoryId: 'video', title: 'Reels с вашего образа', summary: 'Один вертикальный ролик до 30 секунд с монтажом и музыкой.', includes: ['Съёмка до 1 часа', 'Монтаж и цветокоррекция'], price: 20000, durationMin: 60, team: 'Мобилограф', addOns: videoAddOns },
  { id: 'vd-reels3', categoryId: 'video', title: 'Пакет из 3 Reels', summary: 'Контент для блога или бизнеса: три ролика за одну съёмку.', includes: ['Съёмка до 2 часов', '3 ролика до 30 секунд', 'Сценарий-план'], price: 50000, durationMin: 120, team: 'Мобилограф', addOns: videoAddOns, popular: true },
  { id: 'vd-event', categoryId: 'video', title: 'Видео мероприятия', summary: 'Той, юбилей, день рождения: клип и полная запись.', includes: ['До 4 часов съёмки', 'Клип 2–3 мин', 'Вертикальная версия для соцсетей'], price: 100000, priceFrom: true, durationMin: 240, team: 'Видеограф', addOns: videoAddOns },
  { id: 'vd-wedding', categoryId: 'video', title: 'Свадебный фильм', summary: 'Полный день съёмки, клип и фильм о вашей свадьбе.', includes: ['До 10 часов съёмки', 'Клип 3–5 мин', 'Фильм 20–40 мин'], price: 250000, priceFrom: true, durationMin: 600, team: 'Видеограф', addOns: videoAddOns },

  // Бэкстейдж
  { id: 'bs-getready', categoryId: 'backstage', title: 'Бэкстейдж сборов', summary: 'Мобилограф снимает, как вас собирают: от первой кисти до финального образа.', includes: ['Свет и съёмка всех сборов', 'Reels за 48 ч', 'Лучшие кадры-скриншоты'], price: 30000, durationMin: 90, team: 'Мобилограф', addOns: videoAddOns, popular: true },
  { id: 'bs-photoshoot', categoryId: 'backstage', title: 'Бэкстейдж фотосессии', summary: 'Закулисье вашей съёмки — живые моменты для сторис и Reels.', includes: ['Съёмка до 2 часов', '1 Reels + 10 коротких видео'], price: 30000, durationMin: 120, team: 'Мобилограф', addOns: videoAddOns },
  { id: 'bs-bride', categoryId: 'backstage', title: 'Бэкстейдж утра невесты', summary: 'Фото и видео сборов невесты, мамы и подружек.', includes: ['3 часа съёмки', '40 фото', 'Клип 1 мин + Reels'], price: 90000, durationMin: 180, team: 'Фотограф + мобилограф', addOns: videoAddOns },
];

export const specialists: Specialist[] = [
  { id: 's1', name: 'Жанель Ахметова', roles: ['makeup', 'hair'], title: 'Ведущий визажист-стилист', rating: 5.0, reviews: 341, experienceYears: 8, about: 'Свадебные и вечерние образы, работа с камерой и светом.', tone: '#C9A27E' },
  { id: 's2', name: 'Мадина Тлеубаева', roles: ['makeup'], title: 'Визажист', rating: 4.9, reviews: 212, experienceYears: 6, about: 'Нюдовый и skin-focused макияж, фотостойкие техники.', tone: '#B98B7A' },
  { id: 's3', name: 'Айгерим Сапарова', roles: ['hair', 'makeup'], title: 'Стилист по волосам', rating: 4.9, reviews: 187, experienceYears: 7, about: 'Голливудская волна, собранные причёски, работа с сәукеле.', tone: '#A88B6D' },
  { id: 's4', name: 'Дана Ержанова', roles: ['makeup', 'hair'], title: 'Визажист-стилист', rating: 4.8, reviews: 129, experienceYears: 4, about: 'Лёгкие дневные образы и укладки Dyson.', tone: '#C7A992' },
  { id: 's5', name: 'Алия Нурланова', roles: ['photo'], title: 'Фотограф', rating: 4.9, reviews: 233, experienceYears: 9, about: 'Портрет, fashion, свадьбы. Мягкий кинематографичный цвет.', tone: '#8E7663' },
  { id: 's6', name: 'Тимур Рахимов', roles: ['photo', 'video'], title: 'Фото- и видеограф', rating: 4.8, reviews: 141, experienceYears: 6, about: 'Love story, тои, контент для брендов.', tone: '#7F6A5B' },
  { id: 's7', name: 'Камила Оспанова', roles: ['video'], title: 'Мобилограф', rating: 4.9, reviews: 176, experienceYears: 4, about: 'Бэкстейджи сборов и Reels, которые набирают охваты.', tone: '#B0907A' },
  { id: 's8', name: 'Нурлан Есенов', roles: ['video', 'photo'], title: 'Видеограф', rating: 4.9, reviews: 109, experienceYears: 11, about: 'Свадебные фильмы, съёмка с дрона, клипы утра невесты.', tone: '#6F5D50' },
];

export interface Occasion {
  id: string;
  title: string;
  serviceId: string;
}

export const occasions: Occasion[] = [
  { id: 'wedding', title: 'Свадьба', serviceId: 'pkg-bride' },
  { id: 'kyz', title: 'Қыз ұзату', serviceId: 'pkg-bride' },
  { id: 'toi', title: 'Той и юбилей', serviceId: 'pkg-star' },
  { id: 'bday', title: 'День рождения', serviceId: 'pkg-star' },
  { id: 'grad', title: 'Выпускной', serviceId: 'pkg-base' },
  { id: 'photoshoot', title: 'Фотосессия', serviceId: 'pkg-icon' },
  { id: 'reels', title: 'Контент и Reels', serviceId: 'vd-reels3' },
  { id: 'business', title: 'Деловая встреча', serviceId: 'mk-day' },
  { id: 'self', title: 'Для себя', serviceId: 'pkg-base' },
];

export const faq = [
  { q: 'Что подготовить к приезду мастера?', a: 'Место у окна с дневным светом, стул и розетку рядом. Кожа должна быть чистой, без крема — подготовку сделает визажист.' },
  { q: 'Чем Base отличается от Star?', a: 'В Base приезжает визажист-стилист: макияж и причёска. В Star вместе с ним приезжает мобилограф — ставит свет, снимает все сборы и через 48 часов присылает готовый Reels.' },
  { q: 'Можно записать нескольких человек?', a: 'Одна запись — на одного человека. Если собираетесь с мамой или подругами, оформите несколько записей на одно время или напишите нам — подберём команду.' },
  { q: 'Где проходит съёмка?', a: 'Там, где удобно вам: дома, в отеле, ресторане или на локации. Студию можно добавить к фотосессии отдельной опцией.' },
  { q: 'Как оплатить?', a: 'Через Kaspi или картой после подтверждения записи. Для свадебных пакетов — предоплата 30%.' },
  { q: 'Как перенести или отменить?', a: 'В разделе «Записи» или в WhatsApp. Бесплатно — не позднее чем за 24 часа.' },
];

export const getCategory = (id: string) => categories.find((c) => c.id === id);
export const getService = (id: string) => services.find((s) => s.id === id);
export const getSpecialist = (id: string) => specialists.find((m) => m.id === id);
export const servicesByCategory = (id: string) => services.filter((s) => s.categoryId === id);
export const specialistsForService = (service: Service) =>
  specialists.filter((m) => m.roles.includes(LEAD_ROLE[service.categoryId]));
export const packages = services.filter((s) => s.categoryId === 'packages');

/** Детерминированно «занятые» слоты, пока нет бэкенда */
export function isSlotBusy(specialistId: string, dateKey: string, time: string): boolean {
  const seed = `${specialistId}${dateKey}${time}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return hash % 4 === 0;
}

export const TIME_SLOTS = [
  '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
];

/** Запись не раньше чем за 3 часа */
export const MIN_LEAD_HOURS = 3;
