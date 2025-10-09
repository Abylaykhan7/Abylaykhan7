import SwiftUI

@main
struct LiverpoolFanApp: App {
    @StateObject private var authManager = AuthenticationManager()
    @StateObject private var subscriptionManager = SubscriptionManager()
    
    var body: some Scene {
        WindowGroup {
            if authManager.isAuthenticated && subscriptionManager.hasActiveSubscription {
                MainTabView()
                    .environmentObject(authManager)
                    .environmentObject(subscriptionManager)
            } else if authManager.isAuthenticated {
                SubscriptionView()
                    .environmentObject(authManager)
                    .environmentObject(subscriptionManager)
            } else {
                LoginView()
                    .environmentObject(authManager)
            }
        }
    }
}
