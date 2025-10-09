import SwiftUI

struct RegistrationView: View {
    @Environment(\.dismiss) var dismiss
    @EnvironmentObject var authManager: AuthenticationManager
    
    @State private var email = ""
    @State private var password = ""
    @State private var confirmPassword = ""
    @State private var username = ""
    @State private var city = ""
    
    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Личные данные")) {
                    TextField("Имя пользователя", text: $username)
                    TextField("Email", text: $email)
                        .textInputAutocapitalization(.never)
                        .keyboardType(.emailAddress)
                    TextField("Город", text: $city)
                }
                
                Section(header: Text("Пароль")) {
                    SecureField("Пароль", text: $password)
                    SecureField("Подтвердите пароль", text: $confirmPassword)
                }
                
                Section {
                    Button(action: {
                        if password == confirmPassword {
                            authManager.register(email: email, password: password, username: username, city: city)
                            dismiss()
                        }
                    }) {
                        Text("Зарегистрироваться")
                            .frame(maxWidth: .infinity)
                            .foregroundColor(.red)
                    }
                }
            }
            .navigationTitle("Регистрация")
            .navigationBarItems(trailing: Button("Отмена") {
                dismiss()
            })
        }
    }
}
