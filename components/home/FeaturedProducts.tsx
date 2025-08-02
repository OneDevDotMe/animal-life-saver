import React from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Platform
} from "react-native";
import { useRouter } from "expo-router";
import { ShoppingBag } from "lucide-react-native";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import Colors from "@/constants/colors";
import { Product } from "@/types";

export function FeaturedProducts() {
  const router = useRouter();
  const { data: products, isLoading, error } = useProducts({ isFeatured: true, limit: 5 });
  const { addToCart } = useCart();

  const navigateToShop = () => {
    router.push("/(tabs)/shop");
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Featured Products</Text>
        <TouchableOpacity onPress={navigateToShop}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productsList}
        testID="featured-products-scroll"
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading products...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Failed to load products</Text>
          </View>
        ) : products && products.length > 0 ? (
          products.slice(0, 5).map((product) => (
          <TouchableOpacity 
            key={product.id} 
            style={styles.productCard}
            onPress={() => router.push(`/product/${product.slug}`)}
          >
            <Image 
              source={{ uri: product.image_url }} 
              style={styles.productImage} 
            />
            
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <View style={styles.priceContainer}>
                {product.sale_price ? (
                  <>
                    <Text style={styles.salePrice}>${product.sale_price.toFixed(2)}</Text>
                    <Text style={styles.originalPrice}>${product.price.toFixed(2)}</Text>
                  </>
                ) : (
                  <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                )}
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => handleAddToCart(product)}
              testID={`add-to-cart-${product.id}`}
            >
              <ShoppingBag color={Colors.white} size={16} />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products available</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "500",
  },
  productsList: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  productCard: {
    width: 160,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginHorizontal: 4,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  productImage: {
    width: "100%",
    height: 120,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.primary,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  salePrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.primary,
    marginRight: 4,
  },
  originalPrice: {
    fontSize: 12,
    color: Colors.textSecondary,
    textDecorationLine: "line-through",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    padding: 8,
  },
  addButtonText: {
    color: Colors.white,
    fontWeight: "bold",
    marginLeft: 8,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 14,
    color: Colors.error || '#ff0000',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});