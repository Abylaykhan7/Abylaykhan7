import Foundation

struct User: Identifiable, Codable {
    let id: String
    var username: String
    var email: String
    var city: String
    var avatarURL: String?
    var createdAt: Date
    var messageCount: Int
    var gatheringsAttended: Int
    var ordersPlaced: Int
    
    init(id: String = UUID().uuidString,
         username: String,
         email: String,
         city: String,
         avatarURL: String? = nil,
         createdAt: Date = Date(),
         messageCount: Int = 0,
         gatheringsAttended: Int = 0,
         ordersPlaced: Int = 0) {
        self.id = id
        self.username = username
        self.email = email
        self.city = city
        self.avatarURL = avatarURL
        self.createdAt = createdAt
        self.messageCount = messageCount
        self.gatheringsAttended = gatheringsAttended
        self.ordersPlaced = ordersPlaced
    }
}
