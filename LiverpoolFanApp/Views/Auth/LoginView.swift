import SwiftUI

struct LoginView: View {
    @EnvironmentObject var authManager: AuthenticationManager
    @State private var email = ""
    @State private var password = ""
    @State private var showingRegistration = false
    
    var body: some View {
        NavigationView {
            ZStack {
                // Liverpool colors background
                LinearGradient(
                    gradient: Gradient(colors: [Color.red, Color(red: 0.8, green: 0, blue: 0)]),
                    startPoint: .top,
                    endPoint: .bottom
                )
                .ignoresSafeArea()
                
                VStack(spacing: 25) {
                    // Logo
                    Image(systemName: "shield.fill")
                        .resizable()
                        .frame(width: 100, height: 120)
                        .foregroundColor(.white)
                    
                    Text("Liverpool FC Messenger")
                        .font(.title)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                    
                    Text("Для фанатов в Казахстане")
                        .font(.subheadline)
                        .foregroundColor(.white.opacity(0.9))
                    
                    VStack(spacing: 15) {
                        TextField("Email", text: $email)
                            .textFieldStyle(RoundedBorderTextFieldStyle())
                            .textInputAutocapitalization(.never)
                            .keyboardType(.emailAddress)
                        
                        SecureField("Пароль", text: $password)
                            .textFieldStyle(RoundedBorderTextFieldStyle())
                        
                        Button(action: {
                            authManager.login(email: email, password: password)
                        }) {
                            Text("Войти")
                                .fontWeight(.semibold)
                                .frame(maxWidth: .infinity)
                                .padding()
                                .background(Color.white)
                                .foregroundColor(.red)
                                .cornerRadius(10)
                        }
                        
                        Button(action: {
                            showingRegistration = true
                        }) {
                            Text("Создать аккаунт")
                                .foregroundColor(.white)
                        }
                    }
                    .padding(.horizontal, 30)
                }
            }
            .sheet(isPresented: $showingRegistration) {
                RegistrationView()
                    .environmentObject(authManager)
            }
        }
    }
}
