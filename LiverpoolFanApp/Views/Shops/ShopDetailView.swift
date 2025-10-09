import SwiftUI

struct ShopDetailView: View {
    let shop: Shop
    @StateObject private var shopManager = ShopManager()
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                // Shop header
                VStack(alignment: .leading, spacing: 10) {
                    Image(systemName: "storefront")
                        .font(.system(size: 80))
                        .foregroundColor(.red)
                        .frame(maxWidth: .infinity)
                    
                    Text(shop.name)
                        .font(.title)
                        .fontWeight(.bold)
                    
                    HStack {
                        Image(systemName: "location.fill")
                        Text(shop.location)
                    }
                    .foregroundColor(.gray)
                    
                    HStack {
                        Image(systemName: "phone.fill")
                        Text(shop.phone)
                    }
                    .foregroundColor(.gray)
                }
                .padding()
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(Color.gray.opacity(0.1))
                .cornerRadius(15)
                
                // Discount banner
                HStack {
                    Image(systemName: "gift.fill")
                        .foregroundColor(.white)
                    Text("Получите 10% скидку при заказе через приложение!")
                        .foregroundColor(.white)
                        .fontWeight(.semibold)
                }
                .padding()
                .frame(maxWidth: .infinity)
                .background(
                    LinearGradient(
                        gradient: Gradient(colors: [Color.green, Color.green.opacity(0.8)]),
                        startPoint: .leading,
                        endPoint: .trailing
                    )
                )
                .cornerRadius(10)
                
                // Products
                Text("Товары")
                    .font(.title2)
                    .fontWeight(.bold)
                
                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 15) {
                    ForEach(shopManager.getProducts(for: shop)) { product in
                        NavigationLink(destination: ProductDetailView(product: product)) {
                            ProductCardView(product: product)
                        }
                    }
                }
            }
            .padding()
        }
        .navigationTitle(shop.name)
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct ProductCardView: View {
    let product: Product
    
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Image(systemName: "tshirt.fill")
                .font(.system(size: 60))
                .foregroundColor(.red)
                .frame(maxWidth: .infinity, minHeight: 120)
                .background(Color.gray.opacity(0.1))
                .cornerRadius(10)
            
            Text(product.name)
                .font(.subheadline)
                .fontWeight(.semibold)
                .lineLimit(2)
            
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text("\(product.originalPrice) ₸")
                        .font(.caption)
                        .strikethrough()
                        .foregroundColor(.gray)
                    Text("\(product.discountedPrice) ₸")
                        .font(.headline)
                        .foregroundColor(.red)
                }
                Spacer()
                Text("-10%")
                    .font(.caption)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                    .padding(5)
                    .background(Color.green)
                    .cornerRadius(5)
            }
        }
        .padding(10)
        .background(Color.white)
        .cornerRadius(15)
        .shadow(radius: 2)
    }
}
