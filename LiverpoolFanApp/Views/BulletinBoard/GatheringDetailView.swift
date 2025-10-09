import SwiftUI
import MapKit

struct GatheringDetailView: View {
    let gathering: PubGathering
    @State private var isAttending = false
    @State private var showingAttendees = false
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                // Match info
                VStack(spacing: 15) {
                    Text(gathering.matchInfo)
                        .font(.title2)
                        .fontWeight(.bold)
                        .multilineTextAlignment(.center)
                    
                    HStack {
                        VStack(alignment: .leading) {
                            Label(gathering.matchDate.formatted(date: .long, time: .omitted), systemImage: "calendar")
                            Label(gathering.matchDate.formatted(date: .omitted, time: .shortened), systemImage: "clock")
                        }
                        .font(.subheadline)
                    }
                    .padding()
                    .background(Color.red.opacity(0.1))
                    .cornerRadius(10)
                }
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color.gray.opacity(0.05))
                .cornerRadius(15)
                
                // Pub info
                VStack(alignment: .leading, spacing: 15) {
                    Text("Место сбора")
                        .font(.headline)
                    
                    HStack {
                        Image(systemName: "location.circle.fill")
                            .font(.system(size: 40))
                            .foregroundColor(.red)
                        
                        VStack(alignment: .leading) {
                            Text(gathering.pubName)
                                .font(.title3)
                                .fontWeight(.semibold)
                            Text(gathering.pubAddress)
                                .foregroundColor(.gray)
                        }
                    }
                    
                    // Map placeholder
                    RoundedRectangle(cornerRadius: 15)
                        .fill(Color.gray.opacity(0.2))
                        .frame(height: 200)
                        .overlay(
                            VStack {
                                Image(systemName: "map.fill")
                                    .font(.system(size: 50))
                                    .foregroundColor(.red)
                                Text("Карта")
                                    .foregroundColor(.gray)
                            }
                        )
                }
                
                // Attendees
                VStack(alignment: .leading, spacing: 10) {
                    HStack {
                        Text("Участники")
                            .font(.headline)
                        Spacer()
                        Button(action: {
                            showingAttendees = true
                        }) {
                            Text("Показать всех")
                                .font(.subheadline)
                                .foregroundColor(.red)
                        }
                    }
                    
                    HStack {
                        Image(systemName: "person.3.fill")
                            .foregroundColor(.green)
                        Text("\(gathering.attendees) фанатов")
                            .fontWeight(.semibold)
                    }
                }
                .padding()
                .background(Color.green.opacity(0.1))
                .cornerRadius(10)
                
                // Attend button
                Button(action: {
                    isAttending.toggle()
                }) {
                    HStack {
                        Image(systemName: isAttending ? "checkmark.circle.fill" : "plus.circle.fill")
                        Text(isAttending ? "Вы идете!" : "Я иду!")
                            .fontWeight(.semibold)
                    }
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(isAttending ? Color.green : Color.red)
                    .foregroundColor(.white)
                    .cornerRadius(15)
                }
            }
            .padding()
        }
        .navigationTitle("Сбор фанатов")
        .navigationBarTitleDisplayMode(.inline)
        .sheet(isPresented: $showingAttendees) {
            AttendeesListView(gathering: gathering)
        }
    }
}

struct AttendeesListView: View {
    let gathering: PubGathering
    @Environment(\.dismiss) var dismiss
    
    var body: some View {
        NavigationView {
            List {
                ForEach(1...gathering.attendees, id: \.self) { index in
                    HStack {
                        Image(systemName: "person.circle.fill")
                            .foregroundColor(.red)
                        Text("Фанат \(index)")
                    }
                }
            }
            .navigationTitle("Участники")
            .navigationBarItems(trailing: Button("Закрыть") {
                dismiss()
            })
        }
    }
}
