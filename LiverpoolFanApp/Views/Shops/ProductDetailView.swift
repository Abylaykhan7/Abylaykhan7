import SwiftUI

struct ProductDetailView: View {
    let product: Product
    @State private var selectedSize = "M"
    @State private var showingOrderConfirmation = false
    
    let sizes = ["XS", "S", "M", "L", "XL", "XXL"]
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                // Product image
                Image(systemName: "tshirt.fill")
                    .font(.system(size: 150))
                    .foregroundColor(.red)
                    .frame(maxWidth: .infinity, minHeight: 250)
                    .background(Color.gray.opacity(0.1))
                    .cornerRadius(15)
                
                // Product info
                VStack(alignment: .leading, spacing: 10) {
                    Text(product.name)
                        .font(.title2)
                        .fontWeight(.bold)
                    
                    Text(product.shop.name)
                        .foregroundColor(.gray)
                    
                    HStack(alignment: .top, spacing: 15) {
                        VStack(alignment: .leading) {
                            Text("\(product.originalPrice) ₸")
                                .font(.title3)
                                .strikethrough()
                                .foregroundColor(.gray)
                            Text("\(product.discountedPrice) ₸")
                                .font(.title)
                                .fontWeight(.bold)
                                .foregroundColor(.red)
                        }
                        
                        Spacer()
                        
                        VStack {
                            Text("Скидка")
                                .font(.caption)
                                .foregroundColor(.white)
                            Text("10%")
                                .font(.title2)
                                .fontWeight(.bold)
                                .foregroundColor(.white)
                        }
                        .padding()
                        .background(Color.green)
                        .cornerRadius(10)
                    }
                }
                
                Divider()
                
                // Size selection
                VStack(alignment: .leading, spacing: 10) {
                    Text("Размер")
                        .font(.headline)
                    
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 10) {
                            ForEach(sizes, id: \.self) { size in
                                Button(action: {
                                    selectedSize = size
                                }) {
                                    Text(size)
                                        .fontWeight(selectedSize == size ? .bold : .regular)
                                        .foregroundColor(selectedSize == size ? .white : .primary)
                                        .frame(width: 50, height: 50)
                                        .background(selectedSize == size ? Color.red : Color.gray.opacity(0.2))
                                        .cornerRadius(10)
                                }
                            }
                        }
                    }
                }
                
                Divider()
                
                // Description
                VStack(alignment: .leading, spacing: 10) {
                    Text("Описание")
                        .font(.headline)
                    Text(product.description)
                        .foregroundColor(.gray)
                }
                
                // Order button
                Button(action: {
                    showingOrderConfirmation = true
                }) {
                    HStack {
                        Image(systemName: "cart.fill")
                        Text("Заказать со скидкой 10%")
                            .fontWeight(.semibold)
                    }
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.red)
                    .foregroundColor(.white)
                    .cornerRadius(15)
                }
                .padding(.top, 20)
            }
            .padding()
        }
        .navigationTitle("Детали товара")
        .navigationBarTitleDisplayMode(.inline)
        .alert("Заказ оформлен!", isPresented: $showingOrderConfirmation) {
            Button("OK", role: .cancel) { }
        } message: {
            Text("Ваш заказ успешно оформлен со скидкой 10%. Магазин свяжется с вами для подтверждения.")
        }
    }
}
