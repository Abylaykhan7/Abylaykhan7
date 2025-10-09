import SwiftUI

struct ProfileView: View {
    @EnvironmentObject var authManager: AuthenticationManager
    @EnvironmentObject var subscriptionManager: SubscriptionManager
    @State private var showingSettings = false
    
    var body: some View {
        NavigationView {
            List {
                Section {
                    HStack(spacing: 15) {
                        Image(systemName: "person.circle.fill")
                            .font(.system(size: 60))
                            .foregroundColor(.red)
                        
                        VStack(alignment: .leading, spacing: 5) {
                            Text(authManager.currentUser?.username ?? "Фанат LFC")
                                .font(.title3)
                                .fontWeight(.bold)
                            Text(authManager.currentUser?.city ?? "Казахстан")
                                .foregroundColor(.gray)
                        }
                    }
                    .padding(.vertical, 10)
                }
                
                Section(header: Text("ПОДПИСКА")) {
                    HStack {
                        Image(systemName: "crown.fill")
                            .foregroundColor(.yellow)
                        Text("Статус")
                        Spacer()
                        Text(subscriptionManager.hasActiveSubscription ? "Активна" : "Неактивна")
                            .foregroundColor(.green)
                    }
                    
                    if let expiryDate = subscriptionManager.subscriptionExpiryDate {
                        HStack {
                            Image(systemName: "calendar")
                            Text("Действительна до")
                            Spacer()
                            Text(expiryDate, style: .date)
                                .foregroundColor(.gray)
                        }
                    }
                    
                    Button(action: {
                        subscriptionManager.manageSubscription()
                    }) {
                        HStack {
                            Image(systemName: "gearshape.fill")
                            Text("Управление подпиской")
                            Spacer()
                            Image(systemName: "chevron.right")
                                .foregroundColor(.gray)
                        }
                    }
                }
                
                Section(header: Text("СТАТИСТИКА")) {
                    HStack {
                        Image(systemName: "message.fill")
                        Text("Сообщений отправлено")
                        Spacer()
                        Text("124")
                            .foregroundColor(.gray)
                    }
                    
                    HStack {
                        Image(systemName: "calendar.badge.clock")
                        Text("Посещено сборов")
                        Spacer()
                        Text("8")
                            .foregroundColor(.gray)
                    }
                    
                    HStack {
                        Image(systemName: "bag.fill")
                        Text("Заказов сделано")
                        Spacer()
                        Text("3")
                            .foregroundColor(.gray)
                    }
                }
                
                Section(header: Text("НАСТРОЙКИ")) {
                    NavigationLink(destination: NotificationsSettingsView()) {
                        Label("Уведомления", systemImage: "bell.fill")
                    }
                    
                    NavigationLink(destination: LanguageSettingsView()) {
                        Label("Язык", systemImage: "globe")
                    }
                    
                    NavigationLink(destination: AboutView()) {
                        Label("О приложении", systemImage: "info.circle")
                    }
                }
                
                Section {
                    Button(action: {
                        authManager.logout()
                    }) {
                        HStack {
                            Spacer()
                            Text("Выйти")
                                .foregroundColor(.red)
                            Spacer()
                        }
                    }
                }
            }
            .navigationTitle("Профиль")
        }
    }
}

struct NotificationsSettingsView: View {
    @State private var matchNotifications = true
    @State private var chatNotifications = true
    @State private var gatheringNotifications = true
    @State private var shopNotifications = false
    
    var body: some View {
        Form {
            Section(header: Text("УВЕДОМЛЕНИЯ")) {
                Toggle("Матчи", isOn: $matchNotifications)
                Toggle("Чат", isOn: $chatNotifications)
                Toggle("Сборы в пабах", isOn: $gatheringNotifications)
                Toggle("Скидки в магазинах", isOn: $shopNotifications)
            }
        }
        .navigationTitle("Уведомления")
    }
}

struct LanguageSettingsView: View {
    @State private var selectedLanguage = "Русский"
    let languages = ["Русский", "Қазақша", "English"]
    
    var body: some View {
        Form {
            Section {
                ForEach(languages, id: \.self) { language in
                    HStack {
                        Text(language)
                        Spacer()
                        if language == selectedLanguage {
                            Image(systemName: "checkmark")
                                .foregroundColor(.red)
                        }
                    }
                    .contentShape(Rectangle())
                    .onTapGesture {
                        selectedLanguage = language
                    }
                }
            }
        }
        .navigationTitle("Язык")
    }
}

struct AboutView: View {
    var body: some View {
        Form {
            Section(header: Text("ИНФОРМАЦИЯ")) {
                HStack {
                    Text("Версия")
                    Spacer()
                    Text("1.0.0")
                        .foregroundColor(.gray)
                }
                
                HStack {
                    Text("Разработчик")
                    Spacer()
                    Text("LFC Fans KZ")
                        .foregroundColor(.gray)
                }
            }
            
            Section(header: Text("ПОДДЕРЖКА")) {
                Link(destination: URL(string: "mailto:support@lfcfans.kz")!) {
                    HStack {
                        Text("Email")
                        Spacer()
                        Text("support@lfcfans.kz")
                            .foregroundColor(.gray)
                        Image(systemName: "chevron.right")
                            .foregroundColor(.gray)
                    }
                }
                
                Link(destination: URL(string: "https://instagram.com/lfcfans_kz")!) {
                    HStack {
                        Text("Instagram")
                        Spacer()
                        Text("@lfcfans_kz")
                            .foregroundColor(.gray)
                        Image(systemName: "chevron.right")
                            .foregroundColor(.gray)
                    }
                }
            }
            
            Section {
                Button("Условия использования") {
                    // Open terms
                }
                Button("Политика конфиденциальности") {
                    // Open privacy policy
                }
            }
        }
        .navigationTitle("О приложении")
    }
}
