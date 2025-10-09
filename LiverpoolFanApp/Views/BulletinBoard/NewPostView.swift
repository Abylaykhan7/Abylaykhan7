import SwiftUI

struct NewPostView: View {
    @Environment(\.dismiss) var dismiss
    @EnvironmentObject var bulletinManager: BulletinManager
    
    @State private var title = ""
    @State private var content = ""
    @State private var selectedCategory = "Общее"
    
    let categories = ["Общее", "Сбор в пабе", "Билеты", "Обмен", "Новости"]
    
    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Категория")) {
                    Picker("Категория", selection: $selectedCategory) {
                        ForEach(categories, id: \.self) { category in
                            Text(category).tag(category)
                        }
                    }
                    .pickerStyle(SegmentedPickerStyle())
                }
                
                Section(header: Text("Заголовок")) {
                    TextField("Введите заголовок", text: $title)
                }
                
                Section(header: Text("Описание")) {
                    TextEditor(text: $content)
                        .frame(minHeight: 150)
                }
                
                Section {
                    Button(action: {
                        bulletinManager.createPost(
                            title: title,
                            content: content,
                            category: selectedCategory
                        )
                        dismiss()
                    }) {
                        Text("Опубликовать")
                            .frame(maxWidth: .infinity)
                            .foregroundColor(.red)
                    }
                    .disabled(title.isEmpty || content.isEmpty)
                }
            }
            .navigationTitle("Новое объявление")
            .navigationBarItems(
                leading: Button("Отмена") {
                    dismiss()
                }
            )
        }
    }
}
