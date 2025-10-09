import SwiftUI

struct MessengerView: View {
    @StateObject private var chatManager = ChatManager()
    @State private var messageText = ""
    
    var body: some View {
        NavigationView {
            VStack {
                // Chat messages
                ScrollViewReader { proxy in
                    ScrollView {
                        LazyVStack(alignment: .leading, spacing: 12) {
                            ForEach(chatManager.messages) { message in
                                MessageBubble(message: message)
                                    .id(message.id)
                            }
                        }
                        .padding()
                    }
                    .onChange(of: chatManager.messages.count) { _ in
                        if let lastMessage = chatManager.messages.last {
                            withAnimation {
                                proxy.scrollTo(lastMessage.id, anchor: .bottom)
                            }
                        }
                    }
                }
                
                // Message input
                HStack {
                    TextField("Сообщение...", text: $messageText)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                        .frame(minHeight: 30)
                    
                    Button(action: {
                        chatManager.sendMessage(text: messageText)
                        messageText = ""
                    }) {
                        Image(systemName: "paperplane.fill")
                            .foregroundColor(.red)
                            .frame(width: 44, height: 44)
                    }
                    .disabled(messageText.isEmpty)
                }
                .padding()
            }
            .navigationTitle("Чат фанатов LFC")
            .navigationBarTitleDisplayMode(.inline)
        }
    }
}

struct MessageBubble: View {
    let message: ChatMessage
    
    var body: some View {
        HStack {
            if message.isCurrentUser {
                Spacer()
            }
            
            VStack(alignment: message.isCurrentUser ? .trailing : .leading, spacing: 4) {
                Text(message.username)
                    .font(.caption)
                    .foregroundColor(.gray)
                
                Text(message.text)
                    .padding(10)
                    .background(message.isCurrentUser ? Color.red : Color.gray.opacity(0.2))
                    .foregroundColor(message.isCurrentUser ? .white : .primary)
                    .cornerRadius(15)
                
                Text(message.timestamp, style: .time)
                    .font(.caption2)
                    .foregroundColor(.gray)
            }
            
            if !message.isCurrentUser {
                Spacer()
            }
        }
    }
}
