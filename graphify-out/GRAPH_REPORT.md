# Graph Report - Abylaykhan7  (2026-11-15)

## Corpus Check
- 35 files · ~11,026 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .plist 1)

## Summary
- 439 nodes · 653 edges · 29 communities (27 shown, 2 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 52 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `58f4b84e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ⚽ Liverpool FC Fan Messenger - Краткое описание проекта
- 📱 Liverpool FC Fan App - Руководство по настройке
- View
- PubGathering
- 🔌 Liverpool FC Fan App - API Documentation
- 🔴 Liverpool FC Fan Messenger - Kazakhstan
- Product
- 📡 Endpoints
- Foundation
- SubscriptionManager
- MatchManager
- AuthenticationManager
- LiveCommentaryManager
- API Endpoints (примеры для backend разработки)
- 📦 Модули приложения
- 🔧 Liverpool FC Fan App - Технические спецификации
- Планируется
- playwright
- Build Configurations
- Оптимизации
- 🎨 UI/UX спецификации
- 🌍 Локализация
- 🔄 Data Flow
- 🧪 Тестирование
- 🌐 Сетевые запросы
- 🔒 Безопасность
- 📱 Общая информация
- CLAUDE.md
- Package.swift

## God Nodes (most connected - your core abstractions)
1. `⚽ Liverpool FC Fan Messenger - Краткое описание проекта` - 18 edges
2. `AuthenticationManager` - 15 edges
3. `🔧 Liverpool FC Fan App - Технические спецификации` - 15 edges
4. `SubscriptionManager` - 13 edges
5. `PubGathering` - 13 edges
6. `Match` - 12 edges
7. `Product` - 12 edges
8. `🔴 Liverpool FC Fan Messenger - Kazakhstan` - 12 edges
9. `📱 Liverpool FC Fan App - Руководство по настройке` - 12 edges
10. `BulletinManager` - 11 edges

## Surprising Connections (you probably didn't know these)
- `1. Presentation Layer (Views)` --references--> `MainTabView`  [INFERRED]
  TECHNICAL_SPECS.md → LiverpoolFanApp/Views/MainTabView.swift
- `2. Business Logic Layer (Managers)` --references--> `AuthenticationManager`  [INFERRED]
  TECHNICAL_SPECS.md → LiverpoolFanApp/Managers/AuthenticationManager.swift
- `2. Business Logic Layer (Managers)` --references--> `BulletinManager`  [INFERRED]
  TECHNICAL_SPECS.md → LiverpoolFanApp/Managers/BulletinManager.swift
- `2. Business Logic Layer (Managers)` --references--> `ChatManager`  [INFERRED]
  TECHNICAL_SPECS.md → LiverpoolFanApp/Managers/ChatManager.swift
- `2. Business Logic Layer (Managers)` --references--> `ShopManager`  [INFERRED]
  TECHNICAL_SPECS.md → LiverpoolFanApp/Managers/ShopManager.swift

## Import Cycles
- None detected.

## Communities (29 total, 2 thin omitted)

### Community 0 - "⚽ Liverpool FC Fan Messenger - Краткое описание проекта"
Cohesion: 0.05
Nodes (43): 1. 🔐 Авторизация, 2. 💳 Система подписки, 3. 💬 Мессенджер, 4. ⚽ Матчи и таблицы, 5. 🛍️ Спортивные магазины, 6. 📢 Доска объявлений, 7. 👤 Профиль, 🔌 Backend интеграция (+35 more)

### Community 1 - "📱 Liverpool FC Fan App - Руководство по настройке"
Cohesion: 0.05
Nodes (40): 1. App Store Connect, 1. Клонирование репозитория, 1. Подготовка приложения, 2. Архивирование, 2. Локальное тестирование StoreKit, 2. Открытие проекта, 3. Загрузка в App Store Connect, 3. Настройка Bundle Identifier (+32 more)

### Community 2 - "View"
Cohesion: 0.10
Nodes (25): BulletinManager, BulletinBoardView, .body, GatheringRowView, .body, PostRowView, .body, AttendeesListView (+17 more)

### Community 3 - "PubGathering"
Cohesion: 0.15
Nodes (12): BulletinPost, Comment, PubGathering, Commentary, Match, MatchStats, StatValue, TeamStanding (+4 more)

### Community 4 - "🔌 Liverpool FC Fan App - API Documentation"
Cohesion: 0.07
Nodes (27): Base URL, Headers, HTTP статусы, 🔌 Liverpool FC Fan App - API Documentation, Match, Product, 🔄 Rate Limiting, Shop (+19 more)

### Community 5 - "🔴 Liverpool FC Fan Messenger - Kazakhstan"
Cohesion: 0.07
Nodes (27): 🔴 Liverpool FC Fan Messenger - Kazakhstan, UI/UX принципы, 🏗️ Архитектура приложения, 🔐 Безопасность, 🙏 Благодарности, 🎨 Дизайн, 📢 Доска объявлений, 📞 Контакты и поддержка (+19 more)

### Community 6 - "Product"
Cohesion: 0.14
Nodes (15): ShopManager, Product, Shop, ProductDetailView, .body, ProductCardView, .body, ShopDetailView (+7 more)

### Community 7 - "📡 Endpoints"
Cohesion: 0.08
Nodes (26): 📡 Endpoints, Верифицировать покупку (App Store), Добавить комментарий, 📢 Доска объявлений, 🛍️ Магазины, ⚽ Матчи, Обновить профиль, Отметиться на сборе (+18 more)

### Community 8 - "Foundation"
Cohesion: 0.12
Nodes (8): Combine, Foundation, ChatManager, ChatMessage, MessageBubble, .body, MessengerView, .body

### Community 9 - "SubscriptionManager"
Cohesion: 0.14
Nodes (8): LiverpoolFanApp, .body, SubscriptionManager, FeatureRow, .body, SubscriptionView, .body, StoreKit

### Community 10 - "MatchManager"
Cohesion: 0.13
Nodes (15): MatchManager, MatchesListView, .body, MatchesView, .body, MatchRowView, .body, StandingsView (+7 more)

### Community 11 - "AuthenticationManager"
Cohesion: 0.17
Nodes (6): AuthenticationManager, User, LoginView, .body, RegistrationView, .body

### Community 12 - "LiveCommentaryManager"
Cohesion: 0.14
Nodes (7): LiveCommentaryManager, CommentaryRow, .body, MatchDetailView, .body, StatRow, .body

### Community 13 - "API Endpoints (примеры для backend разработки)"
Cohesion: 0.18
Nodes (11): 1. Создайте NetworkService, 2. Обновите Managers, API Endpoints (примеры для backend разработки), 🌐 Backend интеграция, WebSocket для чата, Авторизация, Интеграция с API, Магазины (+3 more)

### Community 14 - "📦 Модули приложения"
Cohesion: 0.25
Nodes (8): 1. Авторизация, 2. Подписка, 3. Чат, 4. Матчи, 5. Магазины, 6. Доска объявлений, 7. Профиль, 📦 Модули приложения

### Community 15 - "🔧 Liverpool FC Fan App - Технические спецификации"
Cohesion: 0.33
Nodes (5): 🔧 Liverpool FC Fan App - Технические спецификации, 📊 Аналитика (Планируется), 📈 Метрики производительности, События для отслеживания, Целевые показатели

### Community 16 - "Планируется"
Cohesion: 0.33
Nodes (6): CoreData (для оффлайн режима), FileManager (для медиа), Keychain (для токенов), UserDefaults (Текущая реализация), Планируется, 🗄️ Хранение данных

### Community 17 - "playwright"
Cohesion: 0.40
Nodes (4): npx, figma, playwright, @playwright/mcp

### Community 18 - "Build Configurations"
Cohesion: 0.40
Nodes (5): Build Configurations, Debug, Release, Versioning, 🚀 Развертывание

### Community 19 - "Оптимизации"
Cohesion: 0.40
Nodes (5): Pagination, Кэширование изображений, Ленивая загрузка, Оптимизации, ⚡ Производительность

### Community 20 - "🎨 UI/UX спецификации"
Cohesion: 0.50
Nodes (4): Spacing, 🎨 UI/UX спецификации, Типографика, Цветовая палитра

### Community 21 - "🌍 Локализация"
Cohesion: 0.50
Nodes (4): Использование, 🌍 Локализация, Поддерживаемые языки, Структура

### Community 22 - "🔄 Data Flow"
Cohesion: 0.67
Nodes (3): 🔄 Data Flow, State Management, Пример: Отправка сообщения

### Community 23 - "🧪 Тестирование"
Cohesion: 0.67
Nodes (3): UI Tests (Планируется), Unit Tests (Планируется), 🧪 Тестирование

### Community 24 - "🌐 Сетевые запросы"
Cohesion: 0.67
Nodes (3): WebSocket для чата, Планируемая структура NetworkService, 🌐 Сетевые запросы

### Community 25 - "🔒 Безопасность"
Cohesion: 0.67
Nodes (3): 🔒 Безопасность, Планируется, Текущая реализация

### Community 26 - "📱 Общая информация"
Cohesion: 0.67
Nodes (3): Зависимости, 📱 Общая информация, Платформа

## Knowledge Gaps
- **21 isolated node(s):** `npx`, `@playwright/mcp`, `.body`, `.body`, `MapKit` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 208 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `🔧 Liverpool FC Fan App - Технические спецификации` connect `🔧 Liverpool FC Fan App - Технические спецификации` to `MatchManager`, `📦 Модули приложения`, `Планируется`, `Build Configurations`, `Оптимизации`, `🎨 UI/UX спецификации`, `🌍 Локализация`, `🔄 Data Flow`, `🧪 Тестирование`, `🌐 Сетевые запросы`, `🔒 Безопасность`, `📱 Общая информация`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `AuthenticationManager` (e.g. with `LiverpoolFanApp` and `2. Business Logic Layer (Managers)`) actually correct?**
  _`AuthenticationManager` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `npx`, `@playwright/mcp`, `.body` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `⚽ Liverpool FC Fan Messenger - Краткое описание проекта` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Why does `🏗️ Архитектура приложения` connect `MatchManager` to `🔧 Liverpool FC Fan App - Технические спецификации`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Should `📱 Liverpool FC Fan App - Руководство по настройке` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._
- **Should `View` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._