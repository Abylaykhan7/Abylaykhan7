import Foundation

class BulletinManager: ObservableObject {
    @Published var upcomingGatherings: [PubGathering] = []
    @Published var allPosts: [BulletinPost] = []
    
    func fetchPosts() {
        loadMockGatherings()
        loadMockPosts()
    }
    
    func createPost(title: String, content: String, category: String) {
        let post = BulletinPost(
            authorId: "current-user",
            author: "Текущий пользователь",
            title: title,
            content: content,
            category: category
        )
        allPosts.insert(post, at: 0)
    }
    
    private func loadMockGatherings() {
        upcomingGatherings = [
            PubGathering(
                pubName: "Chelsea Pub",
                pubAddress: "ул. Абая 150/230, Алматы",
                matchInfo: "Liverpool vs Manchester City",
                matchDate: Date().addingTimeInterval(86400 * 3),
                attendees: 23,
                latitude: 43.2220,
                longitude: 76.8512
            ),
            PubGathering(
                pubName: "Harat's Pub",
                pubAddress: "пр. Достык 104, Алматы",
                matchInfo: "Liverpool vs Real Madrid - Лига Чемпионов",
                matchDate: Date().addingTimeInterval(86400 * 7),
                attendees: 45,
                latitude: 43.2361,
                longitude: 76.9457
            ),
            PubGathering(
                pubName: "The Office Pub",
                pubAddress: "ул. Желтоксан 111, Нур-Султан",
                matchInfo: "Arsenal vs Liverpool",
                matchDate: Date().addingTimeInterval(86400 * 10),
                attendees: 18,
                latitude: 51.1605,
                longitude: 71.4704
            )
        ]
    }
    
    private func loadMockPosts() {
        allPosts = [
            BulletinPost(
                authorId: "1",
                author: "Ержан",
                title: "Продаю оригинальную форму сезона 21/22",
                content: "Продаю домашнюю форму Liverpool FC сезона 2021/2022, размер L. Состояние отличное, носил пару раз. Цена 25000 тенге. Контакт: +7 777 111 2233",
                timestamp: Date().addingTimeInterval(-86400),
                category: "Обмен"
            ),
            BulletinPost(
                authorId: "2",
                author: "Айдар",
                title: "Сбор перед матчем с Челси",
                content: "Друзья! Организуем сбор в Harat's Pub на следующей неделе для просмотра матча Liverpool - Chelsea. Начало в 20:00. Кто с нами?",
                timestamp: Date().addingTimeInterval(-172800),
                category: "Сбор в пабе"
            ),
            BulletinPost(
                authorId: "3",
                author: "Нурлан",
                title: "Ищу билеты на Anfield",
                content: "Планирую поездку в Ливерпуль в марте. Может кто знает где можно достать билеты на матч? Или может кто-то едет тоже?",
                timestamp: Date().addingTimeInterval(-259200),
                category: "Билеты"
            ),
            BulletinPost(
                authorId: "4",
                author: "Болат",
                title: "Салах - игрок месяца!",
                content: "Мо Салах снова признан игроком месяца в Премьер-лиге! 🔥 Наш египетский король продолжает творить чудеса!",
                timestamp: Date().addingTimeInterval(-345600),
                category: "Новости"
            ),
            BulletinPost(
                authorId: "5",
                author: "Асан",
                title: "Встреча фанатов в Алматы",
                content: "Создаем официальный фан-клуб Liverpool в Алматы! Первая встреча состоится 15 числа. Всех заинтересованных приглашаем!",
                timestamp: Date().addingTimeInterval(-432000),
                category: "Общее"
            )
        ]
    }
}
