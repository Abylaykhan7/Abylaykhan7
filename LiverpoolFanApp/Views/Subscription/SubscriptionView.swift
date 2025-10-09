import SwiftUI
import StoreKit

struct SubscriptionView: View {
    @EnvironmentObject var subscriptionManager: SubscriptionManager
    @EnvironmentObject var authManager: AuthenticationManager
    
    var body: some View {
        ZStack {
            // Liverpool colors background
            LinearGradient(
                gradient: Gradient(colors: [Color.red, Color(red: 0.8, green: 0, blue: 0)]),
                startPoint: .top,
                endPoint: .bottom
            )
            .ignoresSafeArea()
            
            ScrollView {
                VStack(spacing: 30) {
                    // Header
                    VStack(spacing: 15) {
                        Image(systemName: "shield.fill")
                            .font(.system(size: 80))
                            .foregroundColor(.white)
                        
                        Text("Liverpool FC Messenger")
                            .font(.title)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                        
                        Text("Присоединяйтесь к сообществу фанатов!")
                            .font(.subheadline)
                            .foregroundColor(.white.opacity(0.9))
                    }
                    .padding(.top, 40)
                    
                    // Features
                    VStack(alignment: .leading, spacing: 20) {
                        FeatureRow(
                            icon: "message.fill",
                            title: "Чат с фанатами",
                            description: "Общайтесь с фанатами по всему Казахстану"
                        )
                        
                        FeatureRow(
                            icon: "sportscourt.fill",
                            title: "Матчи и таблицы",
                            description: "Следите за АПЛ и Лигой Чемпионов в реальном времени"
                        )
                        
                        FeatureRow(
                            icon: "text.bubble.fill",
                            title: "Текстовые трансляции",
                            description: "Комментарии матчей минута за минутой"
                        )
                        
                        FeatureRow(
                            icon: "bag.fill",
                            title: "Скидки в магазинах",
                            description: "10% скидка на футбольную форму в партнерских магазинах"
                        )
                        
                        FeatureRow(
                            icon: "list.bullet.rectangle",
                            title: "Доска объявлений",
                            description: "Узнавайте о сборах в пабах для просмотра матчей"
                        )
                    }
                    .padding()
                    .background(Color.white.opacity(0.15))
                    .cornerRadius(20)
                    
                    // Subscription plan
                    VStack(spacing: 15) {
                        Text("Годовая подписка")
                            .font(.title2)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                        
                        HStack(alignment: .top, spacing: 5) {
                            Text("15,000")
                                .font(.system(size: 48, weight: .bold))
                                .foregroundColor(.white)
                            VStack(alignment: .leading, spacing: 0) {
                                Text("₸")
                                    .font(.title2)
                                    .foregroundColor(.white)
                                Text("/год")
                                    .font(.caption)
                                    .foregroundColor(.white.opacity(0.8))
                            }
                            .padding(.top, 8)
                        }
                        
                        Text("≈ 1,250 ₸ в месяц")
                            .foregroundColor(.white.opacity(0.8))
                        
                        Button(action: {
                            subscriptionManager.purchaseSubscription()
                        }) {
                            Text("Оформить подписку")
                                .fontWeight(.bold)
                                .frame(maxWidth: .infinity)
                                .padding()
                                .background(Color.white)
                                .foregroundColor(.red)
                                .cornerRadius(15)
                        }
                        .padding(.top, 10)
                        
                        Button(action: {
                            subscriptionManager.restorePurchases()
                        }) {
                            Text("Восстановить покупки")
                                .foregroundColor(.white.opacity(0.8))
                                .underline()
                        }
                    }
                    .padding()
                    .background(Color.white.opacity(0.2))
                    .cornerRadius(20)
                    
                    // Terms
                    Text("Автоматическое продление. Отмена в любое время.")
                        .font(.caption)
                        .foregroundColor(.white.opacity(0.6))
                        .multilineTextAlignment(.center)
                        .padding(.horizontal)
                    
                    // Logout button
                    Button(action: {
                        authManager.logout()
                    }) {
                        Text("Выйти")
                            .foregroundColor(.white.opacity(0.8))
                    }
                    .padding(.bottom, 30)
                }
                .padding()
            }
        }
    }
}

struct FeatureRow: View {
    let icon: String
    let title: String
    let description: String
    
    var body: some View {
        HStack(alignment: .top, spacing: 15) {
            Image(systemName: icon)
                .font(.title2)
                .foregroundColor(.white)
                .frame(width: 40)
            
            VStack(alignment: .leading, spacing: 5) {
                Text(title)
                    .font(.headline)
                    .foregroundColor(.white)
                Text(description)
                    .font(.subheadline)
                    .foregroundColor(.white.opacity(0.8))
            }
        }
    }
}
