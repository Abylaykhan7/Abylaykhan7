import SwiftUI

struct MainTabView: View {
    @State private var selectedTab = 0
    
    var body: some View {
        TabView(selection: $selectedTab) {
            // Чат для фанатов
            MessengerView()
                .tabItem {
                    Label("Чат", systemImage: "message.fill")
                }
                .tag(0)
            
            // Матчи и таблицы
            MatchesView()
                .tabItem {
                    Label("Матчи", systemImage: "sportscourt.fill")
                }
                .tag(1)
            
            // Спортивные магазины
            ShopsView()
                .tabItem {
                    Label("Магазины", systemImage: "bag.fill")
                }
                .tag(2)
            
            // Доска объявлений
            BulletinBoardView()
                .tabItem {
                    Label("Объявления", systemImage: "list.bullet.rectangle")
                }
                .tag(3)
            
            // Профиль
            ProfileView()
                .tabItem {
                    Label("Профиль", systemImage: "person.fill")
                }
                .tag(4)
        }
        .accentColor(.red) // Liverpool red
    }
}
