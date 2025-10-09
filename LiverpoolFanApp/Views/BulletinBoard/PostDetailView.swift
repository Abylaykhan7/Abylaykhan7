import SwiftUI

struct PostDetailView: View {
    let post: BulletinPost
    @State private var commentText = ""
    @State private var comments: [Comment] = []
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                // Post header
                HStack {
                    Image(systemName: "person.circle.fill")
                        .font(.system(size: 40))
                        .foregroundColor(.gray)
                    
                    VStack(alignment: .leading) {
                        Text(post.author)
                            .fontWeight(.semibold)
                        Text(post.timestamp, style: .relative)
                            .font(.caption)
                            .foregroundColor(.gray)
                    }
                    
                    Spacer()
                    
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
                
                // Post content
                Text(post.title)
                    .font(.title2)
                    .fontWeight(.bold)
                
                Text(post.content)
                    .font(.body)
                
                Divider()
                
                // Comments section
                VStack(alignment: .leading, spacing: 15) {
                    Text("Комментарии (\(comments.count))")
                        .font(.headline)
                    
                    ForEach(comments) { comment in
                        CommentView(comment: comment)
                    }
                    
                    // Comment input
                    HStack {
                        TextField("Добавить комментарий...", text: $commentText)
                            .textFieldStyle(RoundedBorderTextFieldStyle())
                        
                        Button(action: {
                            addComment()
                        }) {
                            Image(systemName: "arrow.up.circle.fill")
                                .foregroundColor(.red)
                                .font(.title2)
                        }
                        .disabled(commentText.isEmpty)
                    }
                }
            }
            .padding()
        }
        .navigationTitle("Объявление")
        .navigationBarTitleDisplayMode(.inline)
    }
    
    private func addComment() {
        let newComment = Comment(
            id: UUID().uuidString,
            author: "Текущий пользователь",
            text: commentText,
            timestamp: Date()
        )
        comments.append(newComment)
        commentText = ""
    }
}

struct CommentView: View {
    let comment: Comment
    
    var body: some View {
        HStack(alignment: .top, spacing: 10) {
            Image(systemName: "person.circle.fill")
                .foregroundColor(.gray)
            
            VStack(alignment: .leading, spacing: 5) {
                HStack {
                    Text(comment.author)
                        .fontWeight(.semibold)
                        .font(.subheadline)
                    Text(comment.timestamp, style: .relative)
                        .font(.caption)
                        .foregroundColor(.gray)
                }
                Text(comment.text)
                    .font(.body)
            }
        }
        .padding()
        .background(Color.gray.opacity(0.05))
        .cornerRadius(10)
    }
}
