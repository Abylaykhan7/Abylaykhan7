import Foundation

struct BulletinPost: Identifiable, Codable {
    let id: String
    let authorId: String
    let author: String
    let title: String
    let content: String
    let preview: String
    let timestamp: Date
    var category: String?
    
    init(id: String = UUID().uuidString,
         authorId: String,
         author: String,
         title: String,
         content: String,
         timestamp: Date = Date(),
         category: String? = nil) {
        self.id = id
        self.authorId = authorId
        self.author = author
        self.title = title
        self.content = content
        self.preview = String(content.prefix(100))
        self.timestamp = timestamp
        self.category = category
    }
}

struct PubGathering: Identifiable, Codable {
    let id: String
    let pubName: String
    let pubAddress: String
    let matchInfo: String
    let matchDate: Date
    var attendees: Int
    var latitude: Double?
    var longitude: Double?
    
    init(id: String = UUID().uuidString,
         pubName: String,
         pubAddress: String,
         matchInfo: String,
         matchDate: Date,
         attendees: Int = 0,
         latitude: Double? = nil,
         longitude: Double? = nil) {
        self.id = id
        self.pubName = pubName
        self.pubAddress = pubAddress
        self.matchInfo = matchInfo
        self.matchDate = matchDate
        self.attendees = attendees
        self.latitude = latitude
        self.longitude = longitude
    }
}

struct Comment: Identifiable, Codable {
    let id: String
    let author: String
    let text: String
    let timestamp: Date
    
    init(id: String = UUID().uuidString,
         author: String,
         text: String,
         timestamp: Date = Date()) {
        self.id = id
        self.author = author
        self.text = text
        self.timestamp = timestamp
    }
}
