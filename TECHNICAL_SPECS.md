# 🔧 Liverpool FC Fan App - Технические спецификации

## 📱 Общая информация

### Платформа
- **Target**: iOS 16.0+
- **Language**: Swift 5.9
- **Framework**: SwiftUI
- **Architecture**: MVVM (Model-View-ViewModel)

### Зависимости
- **StoreKit**: Для обработки подписок
- **Combine**: Для реактивного программирования
- **Foundation**: Основной фреймворк
- **MapKit**: Для отображения карт (планируется)

## 🏗️ Архитектура приложения

### Паттерн MVVM

```
┌─────────────┐
│    View     │ ◄─── SwiftUI Views
└─────────────┘
       │
       │ Binding (@Published)
       ▼
┌─────────────┐
│  ViewModel  │ ◄─── Managers (ObservableObject)
└─────────────┘
       │
       │ Methods
       ▼
┌─────────────┐
│    Model    │ ◄─── Data Structures
└─────────────┘
```

### Структура слоев

#### 1. Presentation Layer (Views)
- `MainTabView`: Главная навигация с TabView
- Feature-specific views в папках по функционалу
- Reusable components

#### 2. Business Logic Layer (Managers)
- `AuthenticationManager`: Управление авторизацией
- `SubscriptionManager`: Обработка подписок
- `ChatManager`: Логика чата
- `MatchManager`: Данные о матчах
- `ShopManager`: Магазины и продукты
- `BulletinManager`: Объявления

#### 3. Data Layer (Models)
- Структуры данных (Codable)
- API response models
- Local storage models

## 📦 Модули приложения

### 1. Авторизация

**Файлы:**
- `LoginView.swift`
- `RegistrationView.swift`
- `AuthenticationManager.swift`

**Функционал:**
- Email/Password вход
- Регистрация пользователей
- Хранение токенов
- Автоматическая авторизация

**Хранилище:**
```swift
UserDefaults.standard // Временно для демо
// Планируется: Keychain для безопасного хранения
```

### 2. Подписка

**Файлы:**
- `SubscriptionView.swift`
- `SubscriptionManager.swift`

**Функционал:**
- Проверка статуса подписки
- Оформление подписки через StoreKit
- Восстановление покупок
- Управление подпиской

**StoreKit Integration:**
```swift
Product ID: "com.lfcfans.yearlysubscription"
Type: Auto-Renewable Subscription
Duration: 1 Year
Price: 15,000 KZT
```

### 3. Чат

**Файлы:**
- `MessengerView.swift`
- `ChatManager.swift`
- `ChatMessage.swift`

**Функционал:**
- Отправка сообщений
- Получение истории
- Real-time обновления (планируется WebSocket)
- Auto-scroll к новым сообщениям

**Состояние:**
```swift
@Published var messages: [ChatMessage] = []
```

### 4. Матчи

**Файлы:**
- `MatchesView.swift`
- `MatchDetailView.swift`
- `MatchManager.swift`
- `Match.swift`

**Функционал:**
- Список предстоящих матчей
- Турнирные таблицы (АПЛ, ЛЧ)
- Детали матча
- Текстовые трансляции
- Статистика матчей

**Источники данных:**
```
// Планируется интеграция с:
- Football-Data.org API
- LiveScore API
- Custom backend API
```

### 5. Магазины

**Файлы:**
- `ShopsView.swift`
- `ShopDetailView.swift`
- `ProductDetailView.swift`
- `ShopManager.swift`
- `Shop.swift`

**Функционал:**
- Список партнерских магазинов
- Каталог товаров
- Детали продукта
- Оформление заказов
- 10% скидка

**Ценообразование:**
```swift
let originalPrice: Int     // Исходная цена
let discountedPrice: Int   // originalPrice * 0.9
```

### 6. Доска объявлений

**Файлы:**
- `BulletinBoardView.swift`
- `GatheringDetailView.swift`
- `PostDetailView.swift`
- `NewPostView.swift`
- `BulletinManager.swift`
- `BulletinPost.swift`

**Функционал:**
- Объявления о сборах
- Создание постов
- Комментарии
- Отметка участия
- Геолокация пабов

### 7. Профиль

**Файлы:**
- `ProfileView.swift`

**Функционал:**
- Информация о пользователе
- Статистика активности
- Настройки уведомлений
- Выбор языка
- Управление подпиской

## 🔄 Data Flow

### Пример: Отправка сообщения

```
User Input (View)
    ↓
MessengerView.sendMessage()
    ↓
ChatManager.sendMessage()
    ↓
API Request (Future)
    ↓
Update @Published messages
    ↓
View automatically updates
```

### State Management

```swift
// Manager (ViewModel)
class ChatManager: ObservableObject {
    @Published var messages: [ChatMessage] = []
    
    func sendMessage(text: String) {
        let message = ChatMessage(...)
        messages.append(message)
        // API call...
    }
}

// View
struct MessengerView: View {
    @StateObject private var chatManager = ChatManager()
    
    var body: some View {
        ForEach(chatManager.messages) { message in
            MessageBubble(message: message)
        }
    }
}
```

## 🗄️ Хранение данных

### UserDefaults (Текущая реализация)
```swift
// Пользователь
UserDefaults.standard.set(encoded, forKey: "currentUser")

// Подписка
UserDefaults.standard.set(expiryDate, forKey: "subscriptionExpiryDate")
```

### Планируется

#### Keychain (для токенов)
```swift
// Безопасное хранение токенов
KeychainManager.save(token: accessToken, for: "accessToken")
```

#### CoreData (для оффлайн режима)
```swift
// Кэширование сообщений, матчей
context.save()
```

#### FileManager (для медиа)
```swift
// Кэширование изображений
FileManager.default.createFile(...)
```

## 🌐 Сетевые запросы

### Планируемая структура NetworkService

```swift
class NetworkService {
    static let shared = NetworkService()
    private let baseURL = "https://api.lfcfans.kz"
    
    func request<T: Decodable>(
        _ endpoint: String,
        method: HTTPMethod = .get,
        body: Data? = nil,
        headers: [String: String]? = nil
    ) async throws -> T {
        var request = URLRequest(url: URL(string: baseURL + endpoint)!)
        request.httpMethod = method.rawValue
        request.httpBody = body
        
        // Add headers
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        if let token = AuthManager.shared.accessToken {
            request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        }
        
        let (data, response) = try await URLSession.shared.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
            throw NetworkError.invalidResponse
        }
        
        return try JSONDecoder().decode(T.self, from: data)
    }
}

enum HTTPMethod: String {
    case get = "GET"
    case post = "POST"
    case put = "PUT"
    case delete = "DELETE"
    case patch = "PATCH"
}
```

### WebSocket для чата

```swift
import Starscream

class ChatWebSocketManager: WebSocketDelegate {
    private var socket: WebSocket?
    private let url = "wss://api.lfcfans.kz/chat"
    
    func connect() {
        var request = URLRequest(url: URL(string: url)!)
        request.timeoutInterval = 5
        socket = WebSocket(request: request)
        socket?.delegate = self
        socket?.connect()
    }
    
    func disconnect() {
        socket?.disconnect()
    }
    
    func send(message: String) {
        socket?.write(string: message)
    }
    
    // WebSocketDelegate methods
    func didReceive(event: WebSocketEvent, client: WebSocket) {
        switch event {
        case .text(let string):
            handleMessage(string)
        case .connected:
            print("WebSocket connected")
        case .disconnected:
            print("WebSocket disconnected")
        default:
            break
        }
    }
}
```

## 🎨 UI/UX спецификации

### Цветовая палитра

```swift
extension Color {
    static let lfcRed = Color(red: 200/255, green: 16/255, blue: 46/255)
    static let lfcDarkRed = Color(red: 139/255, green: 0/255, blue: 0/255)
    static let lfcGold = Color(red: 255/255, green: 215/255, blue: 0/255)
}
```

### Типографика

```swift
// Heading
.font(.title)
.fontWeight(.bold)

// Body
.font(.body)

// Caption
.font(.caption)
.foregroundColor(.gray)
```

### Spacing

```swift
// Padding
.padding()              // 16pt
.padding(.horizontal)   // 16pt horizontal
.padding(.vertical)     // 16pt vertical

// Custom
.padding(20)
```

## 🔒 Безопасность

### Текущая реализация
- ✅ Secure password fields
- ✅ HTTPS для API (планируется)
- ⚠️ UserDefaults для хранения (временно)

### Планируется
- 🔲 Keychain для токенов
- 🔲 SSL Pinning
- 🔲 Biometric authentication (Face ID / Touch ID)
- 🔲 Шифрование локальных данных
- 🔲 Rate limiting
- 🔲 Input validation

## ⚡ Производительность

### Оптимизации

#### Ленивая загрузка
```swift
LazyVStack {
    ForEach(items) { item in
        ItemView(item: item)
    }
}
```

#### Кэширование изображений
```swift
// Планируется
AsyncImage(url: url) { image in
    image.resizable()
} placeholder: {
    ProgressView()
}
```

#### Pagination
```swift
func loadMore() {
    guard !isLoading, hasMore else { return }
    offset += limit
    fetchData()
}
```

## 🧪 Тестирование

### Unit Tests (Планируется)

```swift
class AuthenticationManagerTests: XCTestCase {
    func testLogin() {
        let manager = AuthenticationManager()
        manager.login(email: "test@test.com", password: "password")
        XCTAssertTrue(manager.isAuthenticated)
    }
}
```

### UI Tests (Планируется)

```swift
class LiverpoolFanAppUITests: XCTestCase {
    func testLoginFlow() {
        let app = XCUIApplication()
        app.launch()
        
        app.textFields["Email"].tap()
        app.textFields["Email"].typeText("test@test.com")
        
        app.secureTextFields["Password"].tap()
        app.secureTextFields["Password"].typeText("password")
        
        app.buttons["Login"].tap()
        
        XCTAssertTrue(app.tabBars.exists)
    }
}
```

## 📊 Аналитика (Планируется)

### События для отслеживания

```swift
enum AnalyticsEvent {
    case userRegistered
    case userLoggedIn
    case subscriptionPurchased
    case messageSent
    case productViewed(productId: String)
    case orderPlaced(orderId: String)
    case gatheringAttended(gatheringId: String)
}

// Firebase Analytics
Analytics.logEvent("message_sent", parameters: nil)
```

## 🌍 Локализация

### Поддерживаемые языки
- 🇷🇺 Русский (ru)
- 🇰🇿 Қазақша (kk)
- 🇬🇧 English (en)

### Структура

```swift
// Localizable.strings (ru)
"chat.title" = "Чат фанатов";
"matches.title" = "Матчи";

// Localizable.strings (kk)
"chat.title" = "Жанкүйерлер чаты";
"matches.title" = "Матчтар";

// Localizable.strings (en)
"chat.title" = "Fans Chat";
"matches.title" = "Matches";
```

### Использование

```swift
Text(NSLocalizedString("chat.title", comment: ""))
// или
Text("chat.title")
```

## 🚀 Развертывание

### Build Configurations

#### Debug
- Development API
- Verbose logging
- Mock data enabled

#### Release
- Production API
- Error logging only
- Real data only

### Versioning

```
Version: MAJOR.MINOR.PATCH
Example: 1.0.0

MAJOR: Breaking changes
MINOR: New features
PATCH: Bug fixes
```

## 📈 Метрики производительности

### Целевые показатели
- **Launch time**: < 2s
- **API response time**: < 500ms
- **UI responsiveness**: 60 FPS
- **Memory usage**: < 100MB
- **Battery impact**: Low

---

**Документ обновлен: 09.10.2025**
