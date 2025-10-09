import SwiftUI

struct MatchesView: View {
    @StateObject private var matchManager = MatchManager()
    @State private var selectedTab = 0
    
    var body: some View {
        NavigationView {
            VStack {
                Picker("", selection: $selectedTab) {
                    Text("Матчи").tag(0)
                    Text("АПЛ").tag(1)
                    Text("ЛЧ").tag(2)
                }
                .pickerStyle(SegmentedPickerStyle())
                .padding()
                
                if selectedTab == 0 {
                    MatchesListView(matches: matchManager.upcomingMatches)
                } else if selectedTab == 1 {
                    StandingsView(standings: matchManager.premierLeagueStandings, title: "Английская Премьер-Лига")
                } else {
                    StandingsView(standings: matchManager.championsLeagueStandings, title: "Лига Чемпионов")
                }
            }
            .navigationTitle("Матчи и Таблицы")
            .navigationBarTitleDisplayMode(.inline)
            .onAppear {
                matchManager.fetchData()
            }
        }
    }
}

struct MatchesListView: View {
    let matches: [Match]
    
    var body: some View {
        List(matches) { match in
            NavigationLink(destination: MatchDetailView(match: match)) {
                MatchRowView(match: match)
            }
        }
    }
}

struct MatchRowView: View {
    let match: Match
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Text(match.competition)
                    .font(.caption)
                    .foregroundColor(.gray)
                Spacer()
                Text(match.date, style: .date)
                    .font(.caption)
                    .foregroundColor(.gray)
            }
            
            HStack {
                VStack(alignment: .center) {
                    Image(systemName: "shield.fill")
                        .foregroundColor(.red)
                    Text(match.homeTeam)
                        .font(.subheadline)
                }
                .frame(maxWidth: .infinity)
                
                if let score = match.score {
                    Text(score)
                        .font(.title2)
                        .fontWeight(.bold)
                } else {
                    Text("vs")
                        .foregroundColor(.gray)
                }
                
                VStack(alignment: .center) {
                    Image(systemName: "shield")
                    Text(match.awayTeam)
                        .font(.subheadline)
                }
                .frame(maxWidth: .infinity)
            }
        }
        .padding(.vertical, 8)
    }
}

struct StandingsView: View {
    let standings: [TeamStanding]
    let title: String
    
    var body: some View {
        List(standings) { standing in
            HStack {
                Text("\(standing.position)")
                    .fontWeight(.bold)
                    .frame(width: 30)
                
                Image(systemName: standing.teamName.contains("Liverpool") ? "shield.fill" : "shield")
                    .foregroundColor(standing.teamName.contains("Liverpool") ? .red : .gray)
                
                VStack(alignment: .leading) {
                    Text(standing.teamName)
                        .fontWeight(standing.teamName.contains("Liverpool") ? .bold : .regular)
                    Text("\(standing.played) игр")
                        .font(.caption)
                        .foregroundColor(.gray)
                }
                
                Spacer()
                
                Text("\(standing.points)")
                    .fontWeight(.bold)
                    .foregroundColor(.red)
            }
        }
        .navigationTitle(title)
    }
}
