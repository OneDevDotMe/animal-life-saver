import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  RefreshControl,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Clock, User, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useBlogArticles } from '@/hooks/useBlogArticles';
import { useBlogCategories } from '@/hooks/useBlogCategories';

export default function CategoryScreen() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();
  const { data: articles, isLoading: articlesLoading, refetch: refetchArticles } = useBlogArticles();
  const { data: categories } = useBlogCategories();

  const category = categories?.find(cat => cat.slug === slug);
  const categoryArticles = articles?.filter(article => article.category.slug === slug) || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleArticlePress = (article: any) => {
    router.push(`/blog/${article.slug}`);
  };

  if (!category) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft color={Colors.text} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Category Not Found</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>The category you're looking for doesn't exist.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={Colors.text} size={24} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{category.name}</Text>
          <Text style={styles.headerSubtitle}>
            {categoryArticles.length} article{categoryArticles.length !== 1 ? 's' : ''}
          </Text>
        </View>
      </View>

      {/* Category Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{category.description}</Text>
      </View>

      {/* Articles */}
      <ScrollView 
        style={styles.articlesContainer}
        refreshControl={
          <RefreshControl refreshing={articlesLoading} onRefresh={refetchArticles} />
        }
      >
        {categoryArticles.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No articles available in this category yet.
            </Text>
          </View>
        ) : (
          categoryArticles.map(article => (
            <TouchableOpacity
              key={article.id}
              style={styles.articleCard}
              onPress={() => handleArticlePress(article)}
            >
              <Image source={{ uri: article.imageUrl }} style={styles.articleImage} />
              <View style={styles.articleContent}>
                <View style={styles.articleMeta}>
                  <View style={styles.articleStats}>
                    <Clock color={Colors.text} size={14} />
                    <Text style={styles.articleStatsText}>{article.readTime} min read</Text>
                  </View>
                </View>
                
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articleExcerpt} numberOfLines={2}>
                  {article.excerpt}
                </Text>
                
                <View style={styles.articleFooter}>
                  <View style={styles.articleAuthor}>
                    <User color={Colors.text} size={14} />
                    <Text style={styles.articleAuthorText}>{article.authorName}</Text>
                  </View>
                  <Text style={styles.articleDate}>{formatDate(article.publishedAt)}</Text>
                </View>
              </View>
              
              <ChevronRight color={Colors.text} size={20} style={styles.articleArrow} />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: Colors.white,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  descriptionContainer: {
    padding: 20,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  descriptionText: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  articlesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  articleCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  articleImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  articleContent: {
    padding: 16,
  },
  articleMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  articleStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleStatsText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
    lineHeight: 24,
  },
  articleExcerpt: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  articleAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleAuthorText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  articleDate: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  articleArrow: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -10,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
}); 