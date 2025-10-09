import Foundation

class ShopManager: ObservableObject {
    @Published var shops: [Shop] = []
    @Published var featuredProducts: [Product] = []
    
    func fetchShops() {
        loadMockShops()
        loadMockProducts()
    }
    
    func getProducts(for shop: Shop) -> [Product] {
        return featuredProducts.filter { $0.shop.id == shop.id }
    }
    
    private func loadMockShops() {
        shops = [
            Shop(
                name: "Спорт Мастер",
                location: "Алматы",
                phone: "+7 777 123 4567",
                address: "ТРЦ Mega Alma-Ata"
            ),
            Shop(
                name: "Nike Store",
                location: "Алматы",
                phone: "+7 777 234 5678",
                address: "ТРЦ Dostyk Plaza"
            ),
            Shop(
                name: "Adidas",
                location: "Нур-Султан",
                phone: "+7 777 345 6789",
                address: "ТРЦ Khan Shatyr"
            ),
            Shop(
                name: "Decathlon",
                location: "Алматы",
                phone: "+7 777 456 7890",
                address: "пр. Аль-Фараби"
            )
        ]
    }
    
    private func loadMockProducts() {
        let sportMaster = shops[0]
        let nikeStore = shops[1]
        let adidas = shops[2]
        
        featuredProducts = [
            Product(
                name: "Домашняя форма Ливерпуля 24/25",
                description: "Оригинальная домашняя форма Liverpool FC сезона 2024/2025. Изготовлена из дышащей ткани с технологией отвода влаги.",
                originalPrice: 35000,
                discountedPrice: 31500,
                shop: nikeStore
            ),
            Product(
                name: "Выездная форма Ливерпуля",
                description: "Стильная выездная форма белого цвета с красными акцентами.",
                originalPrice: 33000,
                discountedPrice: 29700,
                shop: nikeStore
            ),
            Product(
                name: "Тренировочная куртка LFC",
                description: "Легкая тренировочная куртка с символикой клуба.",
                originalPrice: 28000,
                discountedPrice: 25200,
                shop: sportMaster
            ),
            Product(
                name: "Шарф Liverpool FC",
                description: "Классический красный шарф с надписью 'You'll Never Walk Alone'.",
                originalPrice: 8000,
                discountedPrice: 7200,
                shop: sportMaster
            ),
            Product(
                name: "Мяч Liverpool FC",
                description: "Официальный футбольный мяч с логотипом клуба.",
                originalPrice: 15000,
                discountedPrice: 13500,
                shop: adidas
            ),
            Product(
                name: "Кепка LFC",
                description: "Стильная кепка с вышитым логотипом Liverpool.",
                originalPrice: 6000,
                discountedPrice: 5400,
                shop: sportMaster
            )
        ]
    }
}
