import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Star } from 'lucide-react-native';
import { useProduct } from '@/hooks/useProduct';
import Colors from '@/constants/colors';

export default function ProductReviewsScreen() {
  const { productId } = useLocalSearchParams();
  const router = useRouter();
  const { data: product, isLoading, error } = useProduct(productId as string);

  // Mock reviews data - in a real app, you'd fetch this from the API
  const reviews = [
    {
      id: '1',
      rating: 5,
      title: 'Excellent product',
      comment: 'This product has been amazing for our rescue operations. Highly recommended!',
      reviewerName: 'Sarah Johnson',
      date: '2024-01-15',
    },
    {
      id: '2',
      rating: 4,
      title: 'Great quality',
      comment: 'Good quality and durable. Perfect for rescue work.',
      reviewerName: 'Mike Chen',
      date: '2024-01-10',
    },
    {
      id: '3',
      rating: 5,
      title: 'Highly recommended',
      comment: 'As a rescue volunteer, I highly recommend this product.',
      reviewerName: 'Emma Davis',
      date: '2024-01-05',
    },
    {
      id: '4',
      rating: 4,
      title: 'Good value',
      comment: 'Affordable price for the quality it provides.',
      reviewerName: 'David Wilson',
      date: '2024-01-01',
    },
    {
      id: '5',
      rating: 5,
      title: 'Essential equipment',
      comment: 'This has become essential equipment for our rescue team.',
      reviewerName: 'Lisa Brown',
      date: '2023-12-28',
    },
  ];

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading reviews...</Text>
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        color={index < rating ? Colors.tertiary : Colors.border}
        fill={index < rating ? Colors.tertiary : 'transparent'}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft color={Colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Reviews</Text>
      </View>

      {/* Product Info */}
      <View style={styles.productInfo}>
        <Image source={{ uri: product.image_url }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {renderStars(Math.round(product.rating_average))}
            </View>
            <Text style={styles.ratingText}>
              {product.rating_average.toFixed(1)} ({product.rating_count} reviews)
            </Text>
          </View>
        </View>
      </View>

      {/* Reviews List */}
      <ScrollView style={styles.reviewsContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.reviewsTitle}>Customer Reviews</Text>
        
        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewerInfo}>
                <Text style={styles.reviewerName}>{review.reviewerName}</Text>
                <Text style={styles.reviewDate}>{formatDate(review.date)}</Text>
              </View>
              <View style={styles.starsContainer}>
                {renderStars(review.rating)}
              </View>
            </View>
            
            {review.title && (
              <Text style={styles.reviewTitle}>{review.title}</Text>
            )}
            
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}
      </ScrollView>
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
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 8,
  },
  productInfo: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  reviewsContainer: {
    flex: 1,
    padding: 16,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  reviewCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  reviewComment: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
}); 