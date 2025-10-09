import Foundation

struct ChatMessage: Identifiable, Codable {
    let id: String
    let userId: String
    let username: String
    let text: String
    let timestamp: Date
    var isCurrentUser: Bool = false
    
    init(id: String = UUID().uuidString,
         userId: String,
         username: String,
         text: String,
         timestamp: Date = Date(),
         isCurrentUser: Bool = false) {
        self.id = id
        self.userId = userId
        self.username = username
        self.text = text
        self.timestamp = timestamp
        self.isCurrentUser = isCurrentUser
    }
}
