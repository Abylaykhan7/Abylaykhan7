import Foundation

class MatchManager: ObservableObject {
    @Published var upcomingMatches: [Match] = []
    @Published var premierLeagueStandings: [TeamStanding] = []
    @Published var championsLeagueStandings: [TeamStanding] = []
    
    func fetchData() {
        loadMockMatches()
        loadMockStandings()
    }
    
    private func loadMockMatches() {
        upcomingMatches = [
            Match(
                homeTeam: "Liverpool",
                awayTeam: "Manchester City",
                competition: "АПЛ",
                date: Date().addingTimeInterval(86400 * 3),
                isLive: false
            ),
            Match(
                homeTeam: "Liverpool",
                awayTeam: "Real Madrid",
                competition: "Лига Чемпионов",
                date: Date().addingTimeInterval(86400 * 7),
                score: "2-1",
                isLive: true,
                stats: MatchStats(
                    possession: MatchStats.StatValue(home: 58, away: 42),
                    shots: MatchStats.StatValue(home: 15, away: 9),
                    shotsOnTarget: MatchStats.StatValue(home: 7, away: 4)
                )
            ),
            Match(
                homeTeam: "Arsenal",
                awayTeam: "Liverpool",
                competition: "АПЛ",
                date: Date().addingTimeInterval(86400 * 10),
                isLive: false
            ),
            Match(
                homeTeam: "Liverpool",
                awayTeam: "Chelsea",
                competition: "Кубок Англии",
                date: Date().addingTimeInterval(86400 * 14),
                isLive: false
            )
        ]
    }
    
    private func loadMockStandings() {
        premierLeagueStandings = [
            TeamStanding(position: 1, teamName: "Liverpool", played: 28, won: 20, drawn: 5, lost: 3, points: 65),
            TeamStanding(position: 2, teamName: "Arsenal", played: 28, won: 19, drawn: 6, lost: 3, points: 63),
            TeamStanding(position: 3, teamName: "Manchester City", played: 28, won: 18, drawn: 7, lost: 3, points: 61),
            TeamStanding(position: 4, teamName: "Aston Villa", played: 28, won: 16, drawn: 6, lost: 6, points: 54),
            TeamStanding(position: 5, teamName: "Tottenham", played: 28, won: 15, drawn: 7, lost: 6, points: 52),
            TeamStanding(position: 6, teamName: "Manchester United", played: 28, won: 14, drawn: 5, lost: 9, points: 47),
            TeamStanding(position: 7, teamName: "West Ham", played: 28, won: 13, drawn: 7, lost: 8, points: 46),
            TeamStanding(position: 8, teamName: "Brighton", played: 28, won: 12, drawn: 8, lost: 8, points: 44)
        ]
        
        championsLeagueStandings = [
            TeamStanding(position: 1, teamName: "Liverpool", played: 10, won: 8, drawn: 1, lost: 1, points: 25),
            TeamStanding(position: 2, teamName: "Bayern Munich", played: 10, won: 7, drawn: 2, lost: 1, points: 23),
            TeamStanding(position: 3, teamName: "Barcelona", played: 10, won: 7, drawn: 1, lost: 2, points: 22),
            TeamStanding(position: 4, teamName: "Real Madrid", played: 10, won: 6, drawn: 3, lost: 1, points: 21),
            TeamStanding(position: 5, teamName: "Inter Milan", played: 10, won: 6, drawn: 2, lost: 2, points: 20),
            TeamStanding(position: 6, teamName: "PSG", played: 10, won: 5, drawn: 3, lost: 2, points: 18)
        ]
    }
}

class LiveCommentaryManager: ObservableObject {
    @Published var comments: [Commentary] = []
    private var timer: Timer?
    
    func startUpdating(matchId: String) {
        loadMockCommentary()
        
        // Simulate live updates
        timer = Timer.scheduledTimer(withTimeInterval: 30, repeats: true) { [weak self] _ in
            self?.addNewCommentary()
        }
    }
    
    func stopUpdating() {
        timer?.invalidate()
        timer = nil
    }
    
    private func loadMockCommentary() {
        comments = [
            Commentary(minute: 1, text: "Матч начался! Ливерпуль начинает с центра поля.", timestamp: Date().addingTimeInterval(-3600)),
            Commentary(minute: 12, text: "Отличный удар Салаха! Мяч чуть выше ворот.", timestamp: Date().addingTimeInterval(-3000)),
            Commentary(minute: 23, text: "ГОООЛ! Нуньес забивает! 1-0 для Ливерпуля!", timestamp: Date().addingTimeInterval(-2400)),
            Commentary(minute: 35, text: "Реал Мадрид увеличивает давление.", timestamp: Date().addingTimeInterval(-1800)),
            Commentary(minute: 42, text: "Гол Реала. 1-1.", timestamp: Date().addingTimeInterval(-1200)),
            Commentary(minute: 67, text: "ГОООЛ! Салах! 2-1 Ливерпуль впереди!", timestamp: Date().addingTimeInterval(-600))
        ]
    }
    
    private func addNewCommentary() {
        let newMinute = (comments.last?.minute ?? 0) + Int.random(in: 3...8)
        let commentTexts = [
            "Опасный момент у ворот!",
            "Хорошая игра в защите.",
            "Замена готовится.",
            "Угловой удар.",
            "Желтая карточка!",
            "Отличное владение мячом."
        ]
        
        let comment = Commentary(
            minute: newMinute,
            text: commentTexts.randomElement() ?? "Продолжается игра."
        )
        comments.append(comment)
    }
    
    deinit {
        stopUpdating()
    }
}
