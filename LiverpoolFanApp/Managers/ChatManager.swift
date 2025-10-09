import Foundation
import Combine

class ChatManager: ObservableObject {
    @Published var messages: [ChatMessage] = []
    
    init() {
        loadMockMessages()
    }
    
    func sendMessage(text: String) {
        let message = ChatMessage(
            userId: "current-user",
            username: "Вы",
            text: text,
            isCurrentUser: true
        )
        messages.append(message)
        
        // In production, send to backend via WebSocket or API
        // For demo, simulate a response
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
            self.simulateResponse()
        }
    }
    
    private func simulateResponse() {
        let responses = [
            "YNWA! 🔴",
            "Какая игра была! 🔥",
            "Салах лучший!",
            "Когда следующий матч?",
            "Кто идет на просмотр в паб?"
        ]
        
        let randomResponse = responses.randomElement() ?? "👍"
        let message = ChatMessage(
            userId: UUID().uuidString,
            username: "Фанат LFC",
            text: randomResponse,
            isCurrentUser: false
        )
        messages.append(message)
    }
    
    private func loadMockMessages() {
        messages = [
            ChatMessage(
                userId: "1",
                username: "Асан",
                text: "Привет всем! YNWA! ⚽️",
                timestamp: Date().addingTimeInterval(-3600),
                isCurrentUser: false
            ),
            ChatMessage(
                userId: "2",
                username: "Болат",
                text: "Кто-нибудь идет на матч в паб?",
                timestamp: Date().addingTimeInterval(-2400),
                isCurrentUser: false
            ),
            ChatMessage(
                userId: "3",
                username: "Нурлан",
                text: "Я в Chelsea Pub буду! 🍺",
                timestamp: Date().addingTimeInterval(-1800),
                isCurrentUser: false
            ),
            ChatMessage(
                userId: "current",
                username: "Вы",
                text: "Отличная идея! И я приду!",
                timestamp: Date().addingTimeInterval(-900),
                isCurrentUser: true
            )
        ]
    }
}
