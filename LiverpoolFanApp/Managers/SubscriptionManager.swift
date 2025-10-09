import Foundation
import StoreKit

class SubscriptionManager: ObservableObject {
    @Published var hasActiveSubscription = false
    @Published var subscriptionExpiryDate: Date?
    
    private let productID = "com.lfcfans.yearlysubscription"
    
    init() {
        checkSubscriptionStatus()
    }
    
    func checkSubscriptionStatus() {
        // Check UserDefaults for subscription status
        if let expiryDate = UserDefaults.standard.object(forKey: "subscriptionExpiryDate") as? Date {
            self.subscriptionExpiryDate = expiryDate
            self.hasActiveSubscription = expiryDate > Date()
        } else {
            // For development, grant subscription by default
            grantSubscription()
        }
    }
    
    func purchaseSubscription() {
        // In production, integrate with StoreKit
        // For now, grant subscription
        grantSubscription()
    }
    
    func restorePurchases() {
        // In production, restore from App Store
        checkSubscriptionStatus()
    }
    
    func manageSubscription() {
        // Open subscription management in App Store
        if let url = URL(string: "https://apps.apple.com/account/subscriptions") {
            if UIKit.UIApplication.shared.canOpenURL(url) {
                UIKit.UIApplication.shared.open(url)
            }
        }
    }
    
    private func grantSubscription() {
        let expiryDate = Calendar.current.date(byAdding: .year, value: 1, to: Date())!
        UserDefaults.standard.set(expiryDate, forKey: "subscriptionExpiryDate")
        self.subscriptionExpiryDate = expiryDate
        self.hasActiveSubscription = true
    }
}
