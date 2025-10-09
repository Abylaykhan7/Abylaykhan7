import Foundation

struct Shop: Identifiable, Codable {
    let id: String
    let name: String
    let location: String
    let phone: String
    let address: String
    var logoURL: String?
    
    init(id: String = UUID().uuidString,
         name: String,
         location: String,
         phone: String,
         address: String,
         logoURL: String? = nil) {
        self.id = id
        self.name = name
        self.location = location
        self.phone = phone
        self.address = address
        self.logoURL = logoURL
    }
}

struct Product: Identifiable, Codable {
    let id: String
    let name: String
    let description: String
    let originalPrice: Int
    let discountedPrice: Int
    let shop: Shop
    var imageURL: String?
    var category: String
    
    init(id: String = UUID().uuidString,
         name: String,
         description: String,
         originalPrice: Int,
         discountedPrice: Int,
         shop: Shop,
         imageURL: String? = nil,
         category: String = "Форма") {
        self.id = id
        self.name = name
        self.description = description
        self.originalPrice = originalPrice
        self.discountedPrice = discountedPrice
        self.shop = shop
        self.imageURL = imageURL
        self.category = category
    }
}
