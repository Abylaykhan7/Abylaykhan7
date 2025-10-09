import SwiftUI

struct BulletinBoardView: View {
    @StateObject private var bulletinManager = BulletinManager()
    @State private var showingNewPost = false
    
    var body: some View {
        NavigationView {
            List {
                Section(header: Text("БЛИЖАЙШИЕ СБОРЫ")) {
                    ForEach(bulletinManager.upcomingGatherings) { gathering in
                        NavigationLink(destination: GatheringDetailView(gathering: gathering)) {
                            GatheringRowView(gathering: gathering)
                        }
                    }
                }
                
                Section(header: Text("ВСЕ ОБЪЯВЛЕНИЯ")) {
                    ForEach(bulletinManager.allPosts) { post in
                        NavigationLink(destination: PostDetailView(post: post)) {
                            PostRowView(post: post)
                        }
                    }
                }
            }
            .navigationTitle("Доска объявлений")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: {
                        showingNewPost = true
                    }) {
                        Image(systemName: "plus.circle.fill")
                            .foregroundColor(.red)
                    }
                }
            }
            .sheet(isPresented: $showingNewPost) {
                NewPostView()
                    .environmentObject(bulletinManager)
            }
            .onAppear {
                bulletinManager.fetchPosts()
            }
        }
    }
}

struct GatheringRowView: View {
    let gathering: PubGathering
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Image(systemName: "location.fill")
                    .foregroundColor(.red)
                Text(gathering.pubName)
                    .font(.headline)
            }
            
            HStack {
                Image(systemName: "calendar")
                    .foregroundColor(.gray)
                Text(gathering.matchDate, style: .date)
                Text("в")
                Text(gathering.matchDate, style: .time)
            }
            .font(.subheadline)
            .foregroundColor(.gray)
            
            Text(gathering.matchInfo)
                .font(.subheadline)
                .foregroundColor(.red)
            
            HStack {
                Image(systemName: "person.3.fill")
                    .foregroundColor(.green)
                Text("\(gathering.attendees) фанатов идут")
                    .font(.caption)
                    .foregroundColor(.green)
            }
        }
        .padding(.vertical, 5)
    }
}

struct PostRowView: View {
    let post: BulletinPost
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Image(systemName: "person.circle.fill")
                    .foregroundColor(.gray)
                Text(post.author)
                    .font(.subheadline)
                    .foregroundColor(.gray)
                Spacer()
                Text(post.timestamp, style: .relative)
                    .font(.caption)
                    .foregroundColor(.gray)
            }
            
            Text(post.title)
                .font(.headline)
            
            Text(post.preview)
                .font(.subheadline)
                .foregroundColor(.gray)
                .lineLimit(2)
            
            if let category = post.category {
                Text(category.uppercased())
                    .font(.caption)
                    .fontWeight(.semibold)
                    .foregroundColor(.white)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color.red)
                    .cornerRadius(5)
            }
        }
        .padding(.vertical, 5)
    }
}
