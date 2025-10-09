import SwiftUI

struct MatchDetailView: View {
    let match: Match
    @StateObject private var liveCommentary = LiveCommentaryManager()
    
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                // Match header
                VStack(spacing: 15) {
                    Text(match.competition)
                        .font(.headline)
                        .foregroundColor(.gray)
                    
                    HStack(spacing: 30) {
                        VStack {
                            Image(systemName: "shield.fill")
                                .font(.system(size: 50))
                                .foregroundColor(.red)
                            Text(match.homeTeam)
                                .font(.title3)
                        }
                        
                        if let score = match.score {
                            Text(score)
                                .font(.system(size: 40, weight: .bold))
                        } else {
                            Text("vs")
                                .font(.title)
                                .foregroundColor(.gray)
                        }
                        
                        VStack {
                            Image(systemName: "shield")
                                .font(.system(size: 50))
                            Text(match.awayTeam)
                                .font(.title3)
                        }
                    }
                    
                    Text(match.date, style: .date)
                        .foregroundColor(.gray)
                }
                .padding()
                .background(Color.gray.opacity(0.1))
                .cornerRadius(15)
                
                // Live commentary
                if match.isLive {
                    VStack(alignment: .leading, spacing: 10) {
                        HStack {
                            Circle()
                                .fill(Color.red)
                                .frame(width: 8, height: 8)
                            Text("ПРЯМАЯ ТРАНСЛЯЦИЯ")
                                .font(.headline)
                                .foregroundColor(.red)
                        }
                        
                        Divider()
                        
                        ForEach(liveCommentary.comments) { comment in
                            CommentaryRow(comment: comment)
                        }
                    }
                    .padding()
                    .background(Color.gray.opacity(0.05))
                    .cornerRadius(15)
                }
                
                // Match stats
                if let stats = match.stats {
                    VStack(alignment: .leading, spacing: 15) {
                        Text("Статистика")
                            .font(.headline)
                        
                        StatRow(title: "Владение мячом", homeValue: stats.possession.home, awayValue: stats.possession.away, isPercentage: true)
                        StatRow(title: "Удары", homeValue: stats.shots.home, awayValue: stats.shots.away)
                        StatRow(title: "Удары в створ", homeValue: stats.shotsOnTarget.home, awayValue: stats.shotsOnTarget.away)
                    }
                    .padding()
                    .background(Color.gray.opacity(0.05))
                    .cornerRadius(15)
                }
            }
            .padding()
        }
        .navigationTitle("Детали матча")
        .navigationBarTitleDisplayMode(.inline)
        .onAppear {
            if match.isLive {
                liveCommentary.startUpdating(matchId: match.id)
            }
        }
    }
}

struct CommentaryRow: View {
    let comment: Commentary
    
    var body: some View {
        HStack(alignment: .top, spacing: 10) {
            Text("\(comment.minute)'")
                .font(.caption)
                .fontWeight(.bold)
                .foregroundColor(.red)
                .frame(width: 40, alignment: .trailing)
            
            VStack(alignment: .leading, spacing: 4) {
                Text(comment.text)
                    .font(.body)
                Text(comment.timestamp, style: .time)
                    .font(.caption2)
                    .foregroundColor(.gray)
            }
        }
        .padding(.vertical, 5)
    }
}

struct StatRow: View {
    let title: String
    let homeValue: Int
    let awayValue: Int
    var isPercentage: Bool = false
    
    var body: some View {
        VStack(spacing: 5) {
            HStack {
                Text("\(homeValue)\(isPercentage ? "%" : "")")
                    .fontWeight(.semibold)
                Spacer()
                Text(title)
                    .foregroundColor(.gray)
                Spacer()
                Text("\(awayValue)\(isPercentage ? "%" : "")")
                    .fontWeight(.semibold)
            }
            
            GeometryReader { geometry in
                HStack(spacing: 0) {
                    Rectangle()
                        .fill(Color.red)
                        .frame(width: geometry.size.width * CGFloat(homeValue) / CGFloat(homeValue + awayValue))
                    Rectangle()
                        .fill(Color.gray.opacity(0.3))
                        .frame(width: geometry.size.width * CGFloat(awayValue) / CGFloat(homeValue + awayValue))
                }
            }
            .frame(height: 6)
            .cornerRadius(3)
        }
    }
}
