import Foundation

struct Match: Identifiable, Codable {
    let id: String
    let homeTeam: String
    let awayTeam: String
    let competition: String
    let date: Date
    var score: String?
    var isLive: Bool
    var stats: MatchStats?
    
    init(id: String = UUID().uuidString,
         homeTeam: String,
         awayTeam: String,
         competition: String,
         date: Date,
         score: String? = nil,
         isLive: Bool = false,
         stats: MatchStats? = nil) {
        self.id = id
        self.homeTeam = homeTeam
        self.awayTeam = awayTeam
        self.competition = competition
        self.date = date
        self.score = score
        self.isLive = isLive
        self.stats = stats
    }
}

struct MatchStats: Codable {
    let possession: StatValue
    let shots: StatValue
    let shotsOnTarget: StatValue
    
    struct StatValue: Codable {
        let home: Int
        let away: Int
    }
}

struct TeamStanding: Identifiable, Codable {
    let id: String
    let position: Int
    let teamName: String
    let played: Int
    let won: Int
    let drawn: Int
    let lost: Int
    let points: Int
    
    init(id: String = UUID().uuidString,
         position: Int,
         teamName: String,
         played: Int,
         won: Int,
         drawn: Int,
         lost: Int,
         points: Int) {
        self.id = id
        self.position = position
        self.teamName = teamName
        self.played = played
        self.won = won
        self.drawn = drawn
        self.lost = lost
        self.points = points
    }
}

struct Commentary: Identifiable, Codable {
    let id: String
    let minute: Int
    let text: String
    let timestamp: Date
    
    init(id: String = UUID().uuidString,
         minute: Int,
         text: String,
         timestamp: Date = Date()) {
        self.id = id
        self.minute = minute
        self.text = text
        self.timestamp = timestamp
    }
}
