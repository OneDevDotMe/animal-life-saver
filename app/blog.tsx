import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Search, BookOpen, Clock, User, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useBlogArticles } from '@/hooks/useBlogArticles';
import { useBlogCategories } from '@/hooks/useBlogCategories';

export default function BlogScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { data: articles, isLoading: articlesLoading, refetch: refetchArticles } = useBlogArticles();
  const { data: categories, isLoading: categoriesLoading } = useBlogCategories();

  const filteredArticles = articles?.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || article.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

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

  const handleCategoryPress = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Knowledge Base</Text>
        <Text style={styles.headerSubtitle}>Learn about animal care and behavior</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search color={Colors.text} size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search articles..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        <TouchableOpacity
          style={[styles.categoryChip, !selectedCategory && styles.categoryChipActive]}
          onPress={() => handleCategoryPress(null)}
        >
          <Text style={[styles.categoryChipText, !selectedCategory && styles.categoryChipTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        
        {categories?.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[styles.categoryChip, selectedCategory === category.id && styles.categoryChipActive]}
            onPress={() => handleCategoryPress(category.id)}
          >
            <Text style={[styles.categoryChipText, selectedCategory === category.id && styles.categoryChipTextActive]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Articles */}
      <ScrollView 
        style={styles.articlesContainer}
        refreshControl={
          <RefreshControl refreshing={articlesLoading} onRefresh={refetchArticles} />
        }
      >
        {filteredArticles.length === 0 ? (
          <View style={styles.emptyState}>
            <BookOpen color={Colors.text} size={48} />
            <Text style={styles.emptyStateText}>
              {searchQuery || selectedCategory 
                ? 'No articles found matching your criteria'
                : 'No articles available yet'
              }
            </Text>
          </View>
        ) : (
          filteredArticles.map(article => (
            <TouchableOpacity
              key={article.id}
              style={styles.articleCard}
              onPress={() => handleArticlePress(article)}
            >
              <Image source={{ uri: article.imageUrl }} style={styles.articleImage} />
              <View style={styles.articleContent}>
                <View style={styles.articleMeta}>
                  <View style={styles.articleCategory}>
                    <Text style={styles.articleCategoryText}>{article.category.name}</Text>
                  </View>
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
    padding: 20,
    paddingTop: 60,
    backgroundColor: Colors.white,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryChipText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: Colors.white,
  },
  articlesContainer: {
    flex: 1,
    paddingHorizontal: 20,
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
    height: 200,
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
  articleCategory: {
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  articleCategoryText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
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
    marginTop: 16,
    paddingHorizontal: 40,
  },
}); 