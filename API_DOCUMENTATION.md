# 🔌 Liverpool FC Fan App - API Documentation

Документация для backend API интеграции приложения Liverpool FC Fan Messenger.

## 📋 Содержание

1. [Обзор API](#обзор-api)
2. [Авторизация](#авторизация)
3. [Endpoints](#endpoints)
4. [Модели данных](#модели-данных)
5. [WebSocket](#websocket)
6. [Ошибки](#ошибки)

## 🌐 Обзор API

### Base URL
```
Production: https://api.lfcfans.kz/v1
Development: https://dev-api.lfcfans.kz/v1
```

### Формат запросов
- **Content-Type**: `application/json`
- **Authorization**: `Bearer {access_token}`

### Формат ответов
```json
{
  "success": true,
  "data": { ... },
  "message": "Success",
  "timestamp": "2025-10-09T12:00:00Z"
}
```

## 🔐 Авторизация

### Регистрация
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "username": "FanLFC",
  "city": "Алматы"
}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "username": "FanLFC",
      "city": "Алматы",
      "createdAt": "2025-10-09T12:00:00Z"
    },
    "tokens": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc...",
      "expiresIn": 3600
    }
  }
}
```

### Вход
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

### Обновление токена
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..."
}
```

### Выход
```http
POST /auth/logout
Authorization: Bearer {access_token}
```

## 📡 Endpoints

### 👤 Пользователи

#### Получить профиль
```http
GET /users/me
Authorization: Bearer {access_token}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "username": "FanLFC",
    "email": "user@example.com",
    "city": "Алматы",
    "avatarURL": "https://cdn.lfcfans.kz/avatars/uuid.jpg",
    "stats": {
      "messageCount": 124,
      "gatheringsAttended": 8,
      "ordersPlaced": 3
    },
    "subscription": {
      "isActive": true,
      "expiryDate": "2026-10-09T12:00:00Z"
    }
  }
}
```

#### Обновить профиль
```http
PATCH /users/me
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "username": "NewUsername",
  "city": "Нур-Султан"
}
```

### 💬 Чат

#### Получить сообщения
```http
GET /messages?limit=50&offset=0
Authorization: Bearer {access_token}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "uuid",
        "userId": "uuid",
        "username": "FanLFC",
        "text": "YNWA!",
        "timestamp": "2025-10-09T12:00:00Z",
        "avatarURL": "https://..."
      }
    ],
    "pagination": {
      "total": 1000,
      "limit": 50,
      "offset": 0,
      "hasMore": true
    }
  }
}
```

#### Отправить сообщение
```http
POST /messages
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "text": "Привет всем фанатам!"
}
```

### ⚽ Матчи

#### Получить список матчей
```http
GET /matches?status=upcoming&limit=10
Authorization: Bearer {access_token}
```

**Параметры:**
- `status`: `upcoming` | `live` | `finished`
- `competition`: `premier-league` | `champions-league` | `all`
- `limit`: число (default: 10)

**Ответ:**
```json
{
  "success": true,
  "data": {
    "matches": [
      {
        "id": "uuid",
        "homeTeam": "Liverpool",
        "awayTeam": "Manchester City",
        "competition": "АПЛ",
        "date": "2025-10-12T17:30:00Z",
        "score": null,
        "isLive": false,
        "venue": "Anfield"
      }
    ]
  }
}
```

#### Получить детали матча
```http
GET /matches/{matchId}
Authorization: Bearer {access_token}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "homeTeam": "Liverpool",
    "awayTeam": "Manchester City",
    "competition": "АПЛ",
    "date": "2025-10-12T17:30:00Z",
    "score": "2-1",
    "isLive": true,
    "stats": {
      "possession": { "home": 58, "away": 42 },
      "shots": { "home": 15, "away": 9 },
      "shotsOnTarget": { "home": 7, "away": 4 }
    },
    "events": [
      {
        "minute": 23,
        "type": "goal",
        "player": "Núñez",
        "team": "home"
      }
    ]
  }
}
```

#### Получить текстовую трансляцию
```http
GET /matches/{matchId}/commentary
Authorization: Bearer {access_token}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "commentary": [
      {
        "id": "uuid",
        "minute": 67,
        "text": "ГОООЛ! Салах! 2-1 Ливерпуль впереди!",
        "timestamp": "2025-10-12T18:37:00Z",
        "isHighlight": true
      }
    ]
  }
}
```

#### Получить турнирные таблицы
```http
GET /standings/{competition}
Authorization: Bearer {access_token}
```

**Параметры:**
- `competition`: `premier-league` | `champions-league`

**Ответ:**
```json
{
  "success": true,
  "data": {
    "standings": [
      {
        "position": 1,
        "teamName": "Liverpool",
        "played": 28,
        "won": 20,
        "drawn": 5,
        "lost": 3,
        "goalsFor": 65,
        "goalsAgainst": 28,
        "goalDifference": 37,
        "points": 65,
        "form": ["W", "W", "D", "W", "W"]
      }
    ],
    "updated": "2025-10-09T12:00:00Z"
  }
}
```

### 🛍️ Магазины

#### Получить список магазинов
```http
GET /shops?city=Алматы
Authorization: Bearer {access_token}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "shops": [
      {
        "id": "uuid",
        "name": "Спорт Мастер",
        "location": "Алматы",
        "address": "ТРЦ Mega Alma-Ata",
        "phone": "+7 777 123 4567",
        "logoURL": "https://cdn.lfcfans.kz/logos/sportmaster.png",
        "discountPercent": 10
      }
    ]
  }
}
```

#### Получить товары магазина
```http
GET /shops/{shopId}/products
Authorization: Bearer {access_token}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "uuid",
        "name": "Домашняя форма Ливерпуля 24/25",
        "description": "Оригинальная домашняя форма...",
        "category": "Форма",
        "originalPrice": 35000,
        "discountedPrice": 31500,
        "imageURL": "https://cdn.lfcfans.kz/products/jersey-home.jpg",
        "sizes": ["S", "M", "L", "XL"],
        "inStock": true
      }
    ]
  }
}
```

#### Оформить заказ
```http
POST /orders
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "productId": "uuid",
  "size": "L",
  "quantity": 1,
  "shopId": "uuid"
}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "orderId": "uuid",
    "status": "pending",
    "totalPrice": 31500,
    "discountApplied": 3500,
    "createdAt": "2025-10-09T12:00:00Z"
  }
}
```

### 📢 Доска объявлений

#### Получить объявления
```http
GET /bulletins?category=all&limit=20
Authorization: Bearer {access_token}
```

**Параметры:**
- `category`: `all` | `gathering` | `tickets` | `exchange` | `news`

**Ответ:**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "uuid",
        "authorId": "uuid",
        "author": "Ержан",
        "title": "Сбор перед матчем с Челси",
        "content": "Друзья! Организуем сбор...",
        "category": "gathering",
        "timestamp": "2025-10-09T12:00:00Z",
        "commentsCount": 5,
        "likesCount": 12
      }
    ]
  }
}
```

#### Создать объявление
```http
POST /bulletins
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "title": "Новое объявление",
  "content": "Текст объявления...",
  "category": "gathering"
}
```

#### Получить сборы в пабах
```http
GET /gatherings?upcoming=true
Authorization: Bearer {access_token}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "gatherings": [
      {
        "id": "uuid",
        "pubName": "Chelsea Pub",
        "pubAddress": "ул. Абая 150/230, Алматы",
        "matchInfo": "Liverpool vs Manchester City",
        "matchDate": "2025-10-12T17:30:00Z",
        "attendees": 23,
        "coordinates": {
          "latitude": 43.2220,
          "longitude": 76.8512
        }
      }
    ]
  }
}
```

#### Отметиться на сборе
```http
POST /gatherings/{gatheringId}/attend
Authorization: Bearer {access_token}
```

#### Получить комментарии
```http
GET /bulletins/{postId}/comments
Authorization: Bearer {access_token}
```

#### Добавить комментарий
```http
POST /bulletins/{postId}/comments
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "text": "Отличная идея!"
}
```

### 💳 Подписка

#### Проверить статус подписки
```http
GET /subscription/status
Authorization: Bearer {access_token}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "isActive": true,
    "type": "yearly",
    "startDate": "2025-10-09T12:00:00Z",
    "expiryDate": "2026-10-09T12:00:00Z",
    "autoRenew": true,
    "price": 15000,
    "currency": "KZT"
  }
}
```

#### Верифицировать покупку (App Store)
```http
POST /subscription/verify
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "receipt": "base64_encoded_receipt"
}
```

## 🔌 WebSocket

### Подключение к чату
```
wss://api.lfcfans.kz/v1/chat
```

**Авторизация:**
```json
{
  "type": "auth",
  "token": "Bearer {access_token}"
}
```

**Подписка на сообщения:**
```json
{
  "type": "subscribe",
  "channel": "main_chat"
}
```

**Отправка сообщения:**
```json
{
  "type": "message",
  "text": "Hello everyone!"
}
```

**Получение сообщения:**
```json
{
  "type": "message",
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "username": "FanLFC",
    "text": "Hello everyone!",
    "timestamp": "2025-10-09T12:00:00Z"
  }
}
```

### Подключение к трансляции матча
```
wss://api.lfcfans.kz/v1/matches/{matchId}/live
```

**Получение обновлений:**
```json
{
  "type": "commentary",
  "data": {
    "minute": 67,
    "text": "ГОООЛ! Салах!",
    "isHighlight": true
  }
}
```

```json
{
  "type": "score_update",
  "data": {
    "homeScore": 2,
    "awayScore": 1
  }
}
```

## 📊 Модели данных

### User
```typescript
interface User {
  id: string;
  username: string;
  email: string;
  city: string;
  avatarURL?: string;
  createdAt: Date;
  messageCount: number;
  gatheringsAttended: number;
  ordersPlaced: number;
}
```

### Match
```typescript
interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  competition: string;
  date: Date;
  score?: string;
  isLive: boolean;
  stats?: MatchStats;
}
```

### Shop
```typescript
interface Shop {
  id: string;
  name: string;
  location: string;
  phone: string;
  address: string;
  logoURL?: string;
}
```

### Product
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  shop: Shop;
  imageURL?: string;
  category: string;
}
```

## ❌ Ошибки

### Формат ошибки
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token",
    "details": {}
  },
  "timestamp": "2025-10-09T12:00:00Z"
}
```

### Коды ошибок

| Код | Описание |
|-----|----------|
| `UNAUTHORIZED` | Не авторизован |
| `FORBIDDEN` | Нет доступа |
| `NOT_FOUND` | Ресурс не найден |
| `VALIDATION_ERROR` | Ошибка валидации |
| `SUBSCRIPTION_REQUIRED` | Требуется подписка |
| `RATE_LIMIT_EXCEEDED` | Превышен лимит запросов |
| `SERVER_ERROR` | Внутренняя ошибка сервера |

### HTTP статусы

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `429` - Too Many Requests
- `500` - Internal Server Error

## 🔄 Rate Limiting

### Лимиты
- **Авторизация**: 5 запросов в минуту
- **API**: 100 запросов в минуту
- **WebSocket**: 50 сообщений в минуту

### Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1633536000
```

## 📝 Примечания

1. Все даты в формате ISO 8601 (UTC)
2. Цены в тенге (KZT)
3. Токены действительны 1 час
4. Refresh токены действительны 30 дней
5. WebSocket автоматически переподключается при разрыве

---

**Документация обновлена: 09.10.2025**
