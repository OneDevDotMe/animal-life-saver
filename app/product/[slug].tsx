import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, ShoppingCart, Heart, Star, Share2, Minus, Plus } from 'lucide-react-native';
import { useProduct } from '@/hooks/useProduct';
import { useCart } from '@/hooks/useCart';
import Colors from '@/constants/colors';
import { Product } from '@/types';

const { width } = Dimensions.get('window');

export default function ProductScreen() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();
  const { data: product, isLoading, error } = useProduct(slug as string);
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Add the product multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    Alert.alert(
      'Added to Cart',
      `${quantity} ${quantity === 1 ? 'item' : 'items'} added to cart`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        { text: 'View Cart', onPress: () => router.push('/cart') }
      ]
    );
  };

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity(prev => prev + 1);
    } else {
      setQuantity(prev => Math.max(1, prev - 1));
    }
  };

  const handleShare = () => {
    // Implement share functionality
    Alert.alert('Share', 'Share functionality coming soon!');
  };

  const handleWishlist = () => {
    // Implement wishlist functionality
    Alert.alert('Wishlist', 'Wishlist functionality coming soon!');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading product...</Text>
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const images = product.gallery && product.gallery.length > 0 
    ? [product.image_url, ...product.gallery]
    : [product.image_url];

  const currentPrice = product.sale_price || product.price;
  const hasDiscount = !!product.sale_price;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft color={Colors.text} size={24} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
            <Share2 color={Colors.text} size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleWishlist}>
            <Heart color={Colors.text} size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: images[selectedImageIndex] }}
            style={styles.mainImage}
            resizeMode="cover"
          />
          {hasDiscount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                {Math.round(((product.price - product.sale_price!) / product.price) * 100)}% OFF
              </Text>
            </View>
          )}
        </View>

        {/* Image Thumbnails */}
        {images.length > 1 && (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.thumbnailsContainer}
            contentContainerStyle={styles.thumbnailsContent}
          >
            {images.map((image, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.thumbnail,
                  selectedImageIndex === index && styles.selectedThumbnail,
                ]}
                onPress={() => setSelectedImageIndex(index)}
              >
                <Image
                  source={{ uri: image }}
                  style={styles.thumbnailImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          
          {/* Rating */}
          <TouchableOpacity 
            style={styles.ratingContainer}
            onPress={() => router.push(`/product-reviews/${product.id}`)}
          >
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  color={star <= Math.round(product.rating_average) ? Colors.tertiary : Colors.border}
                  fill={star <= Math.round(product.rating_average) ? Colors.tertiary : 'transparent'}
                />
              ))}
            </View>
            <Text style={styles.ratingText}>
              {product.rating_average.toFixed(1)} ({product.rating_count} reviews)
            </Text>
          </TouchableOpacity>

          {/* Price */}
          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>${currentPrice.toFixed(2)}</Text>
            {hasDiscount && (
              <Text style={styles.originalPrice}>${product.price.toFixed(2)}</Text>
            )}
          </View>

          {/* Stock Status */}
          <View style={styles.stockContainer}>
            <Text style={[
              styles.stockText,
              product.stock_quantity > 0 ? styles.inStock : styles.outOfStock
            ]}>
              {product.stock_quantity > 0 
                ? `${product.stock_quantity} in stock` 
                : 'Out of stock'
              }
            </Text>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              <Text style={styles.sectionTitle}>Tags</Text>
              <View style={styles.tagsList}>
                {product.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Category */}
          {product.category && (
            <View style={styles.categoryContainer}>
              <Text style={styles.sectionTitle}>Category</Text>
              <Text style={styles.categoryText}>{product.category.name}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(false)}
            disabled={quantity <= 1}
          >
            <Minus size={16} color={quantity <= 1 ? Colors.textSecondary : Colors.text} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(true)}
          >
            <Plus size={16} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.addToCartButton,
            product.stock_quantity <= 0 && styles.disabledButton
          ]}
          onPress={handleAddToCart}
          disabled={product.stock_quantity <= 0}
        >
          <ShoppingCart color={Colors.white} size={20} />
          <Text style={styles.addToCartText}>
            {product.stock_quantity <= 0 ? 'Out of Stock' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: Colors.error,
    textAlign: 'center',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: Colors.white,
  },
  backButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: Colors.white,
  },
  mainImage: {
    width: width,
    height: width,
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: Colors.error,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  thumbnailsContainer: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
  },
  thumbnailsContent: {
    paddingHorizontal: 16,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  selectedThumbnail: {
    borderColor: Colors.primary,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  productInfo: {
    backgroundColor: Colors.white,
    padding: 16,
    marginTop: 8,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  currentPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 18,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  stockContainer: {
    marginBottom: 16,
  },
  stockText: {
    fontSize: 14,
    fontWeight: '600',
  },
  inStock: {
    color: Colors.success,
  },
  outOfStock: {
    color: Colors.error,
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  tagsContainer: {
    marginBottom: 16,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  bottomActions: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    marginRight: 12,
  },
  quantityButton: {
    padding: 12,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    paddingHorizontal: 16,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: Colors.textSecondary,
  },
  addToCartText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 