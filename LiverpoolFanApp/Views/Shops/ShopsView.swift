import SwiftUI

struct ShopsView: View {
    @StateObject private var shopManager = ShopManager()
    
    var body: some View {
        NavigationView {
            List {
                Section(header: Text("ПАРТНЕРСКИЕ МАГАЗИНЫ")) {
                    ForEach(shopManager.shops) { shop in
                        NavigationLink(destination: ShopDetailView(shop: shop)) {
                            ShopRowView(shop: shop)
                        }
                    }
                }
                
                Section(header: Text("ПОПУЛЯРНЫЕ ТОВАРЫ")) {
                    ForEach(shopManager.featuredProducts) { product in
                        NavigationLink(destination: ProductDetailView(product: product)) {
                            ProductRowView(product: product)
                        }
                    }
                }
            }
            .navigationTitle("Магазины")
            .onAppear {
                shopManager.fetchShops()
            }
        }
    }
}

struct ShopRowView: View {
    let shop: Shop
    
    var body: some View {
        HStack(spacing: 15) {
            Image(systemName: "bag.circle.fill")
                .font(.system(size: 40))
                .foregroundColor(.red)
            
            VStack(alignment: .leading, spacing: 5) {
                Text(shop.name)
                    .font(.headline)
                Text(shop.location)
                    .font(.subheadline)
                    .foregroundColor(.gray)
                
                HStack {
                    Image(systemName: "percent")
                        .foregroundColor(.green)
                    Text("10% скидка в приложении")
                        .font(.caption)
                        .foregroundColor(.green)
                }
            }
            
            Spacer()
        }
        .padding(.vertical, 5)
    }
}

struct ProductRowView: View {
    let product: Product
    
    var body: some View {
        HStack(spacing: 15) {
            Image(systemName: "tshirt.fill")
                .font(.system(size: 50))
                .foregroundColor(.red)
                .frame(width: 80, height: 80)
                .background(Color.gray.opacity(0.1))
                .cornerRadius(10)
            
            VStack(alignment: .leading, spacing: 5) {
                Text(product.name)
                    .font(.headline)
                Text(product.shop.name)
                    .font(.subheadline)
                    .foregroundColor(.gray)
                
                HStack {
                    Text("\(product.originalPrice) ₸")
                        .strikethrough()
                        .foregroundColor(.gray)
                    Text("\(product.discountedPrice) ₸")
                        .fontWeight(.bold)
                        .foregroundColor(.red)
                }
            }
            
            Spacer()
        }
        .padding(.vertical, 5)
    }
}
