import Foundation
import Combine

class AuthenticationManager: ObservableObject {
    @Published var isAuthenticated = false
    @Published var currentUser: User?
    
    init() {
        // Check if user is already logged in
        checkAuthStatus()
    }
    
    func checkAuthStatus() {
        // In production, check with backend/keychain
        if let userData = UserDefaults.standard.data(forKey: "currentUser"),
           let user = try? JSONDecoder().decode(User.self, from: userData) {
            self.currentUser = user
            self.isAuthenticated = true
        }
    }
    
    func login(email: String, password: String) {
        // In production, authenticate with backend
        // For now, create a mock user
        let user = User(
            username: email.components(separatedBy: "@").first ?? "Фанат",
            email: email,
            city: "Алматы"
        )
        
        saveUser(user)
        self.currentUser = user
        self.isAuthenticated = true
    }
    
    func register(email: String, password: String, username: String, city: String) {
        // In production, register with backend
        let user = User(
            username: username,
            email: email,
            city: city
        )
        
        saveUser(user)
        self.currentUser = user
        self.isAuthenticated = true
    }
    
    func logout() {
        UserDefaults.standard.removeObject(forKey: "currentUser")
        self.currentUser = nil
        self.isAuthenticated = false
    }
    
    private func saveUser(_ user: User) {
        if let encoded = try? JSONEncoder().encode(user) {
            UserDefaults.standard.set(encoded, forKey: "currentUser")
        }
    }
}
