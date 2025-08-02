import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Share2, Clock, User, Heart, MessageCircle } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useBlogArticles } from '@/hooks/useBlogArticles';

export default function BlogArticleScreen() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();
  const { data: articles } = useBlogArticles();

  const article = articles?.find(article => article.slug === slug);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (!article) return;
    
    try {
      await Share.share({
        message: `Check out this article: ${article.title}\n\n${article.excerpt}`,
        title: article.title,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share article');
    }
  };

  if (!article) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft color={Colors.text} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Article Not Found</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>The article you're looking for doesn't exist.</Text>
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
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <Share2 color={Colors.text} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Article Image */}
        <Image source={{ uri: article.imageUrl }} style={styles.articleImage} />
        
        {/* Article Meta */}
        <View style={styles.metaContainer}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{article.category.name}</Text>
          </View>
          
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Clock color={Colors.textSecondary} size={16} />
              <Text style={styles.metaText}>{article.readTime} min read</Text>
            </View>
            <View style={styles.metaItem}>
              <User color={Colors.textSecondary} size={16} />
              <Text style={styles.metaText}>{article.authorName}</Text>
            </View>
          </View>
          
          <Text style={styles.publishDate}>{formatDate(article.publishedAt)}</Text>
        </View>

        {/* Article Content */}
        <View style={styles.articleContent}>
          <Text style={styles.articleTitle}>{article.title}</Text>
          
          <Text style={styles.articleBody}>
            {article.content}
          </Text>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              <Text style={styles.tagsTitle}>Tags:</Text>
              <View style={styles.tagsList}>
                {article.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>#{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Article Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Heart color={Colors.primary} size={16} />
              <Text style={styles.statText}>{article.likeCount} likes</Text>
            </View>
            <View style={styles.statItem}>
              <MessageCircle color={Colors.primary} size={16} />
              <Text style={styles.statText}>{article.viewCount} views</Text>
            </View>
          </View>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: Colors.white,
  },
  backButton: {
    padding: 8,
  },
  shareButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  content: {
    flex: 1,
  },
  articleImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  metaContainer: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  categoryBadge: {
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
  publishDate: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  articleContent: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  articleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
    lineHeight: 32,
  },
  articleBody: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 24,
  },
  tagsContainer: {
    marginBottom: 24,
  },
  tagsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: Colors.background,
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 6,
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