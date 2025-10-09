# 📱 Liverpool FC Fan App - Руководство по настройке

Подробное руководство по настройке и запуску приложения Liverpool FC Fan Messenger.

## 📋 Содержание

1. [Системные требования](#системные-требования)
2. [Установка Xcode](#установка-xcode)
3. [Настройка проекта](#настройка-проекта)
4. [Конфигурация подписок](#конфигурация-подписок)
5. [Backend интеграция](#backend-интеграция)
6. [Тестирование](#тестирование)
7. [Публикация в App Store](#публикация-в-app-store)

## 🖥️ Системные требования

### Для разработки:
- **macOS**: 13.0 (Ventura) или новее
- **Xcode**: 15.0 или новее
- **iOS Simulator**: iPhone с iOS 16.0+
- **RAM**: минимум 8 GB (рекомендуется 16 GB)
- **Свободное место**: ~20 GB

### Для запуска на устройстве:
- **iPhone**: iOS 16.0 или новее
- **Apple Developer Account** (для установки на физическое устройство)

## 🔧 Установка Xcode

### Способ 1: App Store (рекомендуется)
1. Откройте App Store
2. Найдите "Xcode"
3. Нажмите "Получить" или "Установить"
4. Дождитесь завершения установки (~12 GB)

### Способ 2: Developer Downloads
1. Перейдите на [developer.apple.com](https://developer.apple.com/download/)
2. Войдите с Apple ID
3. Скачайте Xcode
4. Установите из .xip файла

### Проверка установки
```bash
xcode-select --install
xcodebuild -version
```

## 🚀 Настройка проекта

### 1. Клонирование репозитория
```bash
git clone <repository-url>
cd LiverpoolFanApp
```

### 2. Открытие проекта
```bash
open LiverpoolFanApp.xcodeproj
```

### 3. Настройка Bundle Identifier
1. Выберите проект в навигаторе
2. Перейдите в Target → General
3. Измените Bundle Identifier на уникальный:
   ```
   com.вашакомпания.liverpoolFanApp
   ```

### 4. Настройка команды разработки
1. В General → Signing & Capabilities
2. Выберите вашу Team
3. Убедитесь, что "Automatically manage signing" включено

### 5. Первый запуск
1. Выберите симулятор: iPhone 14 Pro или новее
2. Нажмите ⌘ + R или кнопку Run
3. Дождитесь сборки и запуска

## 💳 Конфигурация подписок (StoreKit)

### Настройка In-App Purchases

#### 1. App Store Connect
1. Войдите в [App Store Connect](https://appstoreconnect.apple.com)
2. Выберите ваше приложение
3. Перейдите в Features → In-App Purchases
4. Создайте новую подписку:
   - **Type**: Auto-Renewable Subscription
   - **Product ID**: `com.lfcfans.yearlysubscription`
   - **Price**: $40 USD (или эквивалент в ₸)
   - **Duration**: 1 Year

#### 2. Локальное тестирование StoreKit
1. В Xcode: Product → Scheme → Edit Scheme
2. Run → Options
3. StoreKit Configuration: Создайте новый файл
4. Добавьте продукт:
```json
{
  "identifier": "com.lfcfans.yearlysubscription",
  "type": "auto-renewable",
  "price": 15000,
  "currency": "KZT",
  "subscriptionDuration": "P1Y"
}
```

#### 3. Обновление SubscriptionManager
```swift
// В LiverpoolFanApp/Managers/SubscriptionManager.swift
// Замените mock логику на реальную интеграцию StoreKit
```

## 🌐 Backend интеграция

### API Endpoints (примеры для backend разработки)

#### Авторизация
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/verify
```

#### Чат
```
GET    /api/messages
POST   /api/messages
WS     /api/chat/socket
```

#### Матчи
```
GET /api/matches
GET /api/matches/:id
GET /api/matches/:id/commentary
GET /api/standings/premier-league
GET /api/standings/champions-league
```

#### Магазины
```
GET  /api/shops
GET  /api/shops/:id/products
POST /api/orders
```

#### Объявления
```
GET  /api/bulletins
POST /api/bulletins
GET  /api/gatherings
POST /api/gatherings/:id/attend
```

### Интеграция с API

#### 1. Создайте NetworkService
```swift
// Services/NetworkService.swift
class NetworkService {
    static let shared = NetworkService()
    private let baseURL = "https://api.lfcfans.kz"
    
    func request<T: Decodable>(_ endpoint: String, method: String = "GET") async throws -> T {
        // Реализация запросов
    }
}
```

#### 2. Обновите Managers
Замените mock данные на реальные API вызовы в:
- `AuthenticationManager.swift`
- `ChatManager.swift`
- `MatchManager.swift`
- `ShopManager.swift`
- `BulletinManager.swift`

### WebSocket для чата
```swift
import Starscream

class ChatWebSocketManager: WebSocketDelegate {
    private var socket: WebSocket?
    
    func connect() {
        var request = URLRequest(url: URL(string: "wss://api.lfcfans.kz/chat")!)
        socket = WebSocket(request: request)
        socket?.delegate = self
        socket?.connect()
    }
}
```

## 🧪 Тестирование

### Unit Tests
```bash
# Запуск тестов
⌘ + U
# или
xcodebuild test -scheme LiverpoolFanApp -destination 'platform=iOS Simulator,name=iPhone 14 Pro'
```

### UI Tests
```swift
// LiverpoolFanAppUITests/LiverpoolFanAppUITests.swift
func testLogin() {
    let app = XCUIApplication()
    app.launch()
    
    let emailField = app.textFields["Email"]
    emailField.tap()
    emailField.typeText("test@example.com")
    
    let passwordField = app.secureTextFields["Пароль"]
    passwordField.tap()
    passwordField.typeText("password123")
    
    app.buttons["Войти"].tap()
    
    XCTAssertTrue(app.tabBars.exists)
}
```

### Тестовые пользователи
Создайте тестовых пользователей:
```
Email: test1@lfcfans.kz / Password: Test123!
Email: test2@lfcfans.kz / Password: Test123!
```

## 📤 Публикация в App Store

### 1. Подготовка приложения

#### Иконки и ресурсы
- **App Icon**: 1024x1024px PNG (без прозрачности)
- **Screenshots**: для всех размеров iPhone
  - 6.7" (iPhone 14 Pro Max)
  - 6.5" (iPhone 11 Pro Max)
  - 5.5" (iPhone 8 Plus)

#### Метаданные
- **Название**: Liverpool FC Messenger
- **Подзаголовок**: Для фанатов в Казахстане
- **Описание**: (подготовьте на русском и английском)
- **Ключевые слова**: liverpool, football, soccer, messenger, kazakhstan, lfc, ynwa
- **Категория**: Sports / Social Networking

### 2. Архивирование
```bash
# В Xcode
Product → Archive
```

### 3. Загрузка в App Store Connect
1. После архивирования: Window → Organizer
2. Выберите архив
3. Distribute App → App Store Connect
4. Следуйте инструкциям

### 4. App Store Connect настройки
1. Заполните метаданные
2. Загрузите скриншоты
3. Добавьте описание конфиденциальности
4. Настройте ценообразование:
   - Казахстан: 15,000 ₸/год
   - Россия: 2,990 ₽/год
   - США: $39.99/год

### 5. Проверка перед отправкой
- [ ] Все функции работают
- [ ] Нет крашей
- [ ] Подписки настроены
- [ ] Политика конфиденциальности готова
- [ ] Скриншоты загружены
- [ ] Метаданные на всех языках

### 6. Отправка на ревью
1. Submit for Review
2. Ответьте на вопросы проверки
3. Дождитесь одобрения (обычно 24-48 часов)

## 🔧 Troubleshooting

### Проблема: Ошибка подписи кода
**Решение**: Убедитесь, что у вас есть действующий сертификат разработчика

### Проблема: Симулятор не запускается
**Решение**: 
```bash
xcrun simctl delete unavailable
xcrun simctl erase all
```

### Проблема: Build failed
**Решение**: 
1. Product → Clean Build Folder (⇧⌘K)
2. Удалите DerivedData:
```bash
rm -rf ~/Library/Developer/Xcode/DerivedData
```

### Проблема: StoreKit не работает
**Решение**: Убедитесь, что StoreKit Configuration файл выбран в схеме

## 📚 Дополнительные ресурсы

- [Apple Developer Documentation](https://developer.apple.com/documentation/)
- [SwiftUI Tutorials](https://developer.apple.com/tutorials/swiftui)
- [StoreKit Guide](https://developer.apple.com/storekit/)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)

## 🆘 Поддержка

Если у вас возникли вопросы:
- Email: dev@lfcfans.kz
- Telegram: @lfcfans_dev
- GitHub Issues: [создать issue](https://github.com/...)

---

**Удачи в разработке! YNWA! 🔴**
