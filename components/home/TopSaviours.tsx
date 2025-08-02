import React from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Platform,
  Dimensions
} from "react-native";
import { useRouter } from "expo-router";
import { Award } from "lucide-react-native";
import { useTopSaviours } from "@/hooks/useTopSaviours";
import Colors from "@/constants/colors";

const { width: screenWidth } = Dimensions.get('window');

export function TopSaviours() {
  const router = useRouter();
  const { data: topSaviours, isLoading, error } = useTopSaviours();

  const navigateToSaviour = (id: string) => {
    router.push(`/saviour/${id}`);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Top Saviours</Text>
        </View>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Top Saviours</Text>
        </View>
        <Text style={styles.errorText}>{error?.message || 'An error occurred'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Top Saviours</Text>
        <TouchableOpacity onPress={() => router.push("/saviours")}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.savioursList}
        testID="top-saviours-scroll"
        decelerationRate="fast"
        snapToInterval={cardWidth + 12}
        snapToAlignment="start"
      >
        {topSaviours && topSaviours.length > 0 ? topSaviours.map((saviour) => (
          <TouchableOpacity 
            key={saviour.id} 
            style={styles.saviourCard}
            onPress={() => navigateToSaviour(saviour.id)}
            testID={`saviour-card-${saviour.id}`}
          >
            <View style={styles.badgeContainer}>
              <Award color={Colors.white} size={16} />
            </View>
            
            <Image 
              source={{ uri: saviour.image }} 
              style={styles.saviourImage} 
            />
            
            <Text style={styles.saviourName}>{saviour.name}</Text>
            <Text style={styles.saviourCount}>{saviour.rescuesCount} rescues</Text>
          </TouchableOpacity>
        )) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No saviours available</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const cardWidth = Math.min(140, Math.max(120, screenWidth * 0.3));

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
  savioursList: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  saviourCard: {
    width: cardWidth,
    alignItems: "center",
    marginHorizontal: 6,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
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
  badgeContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  saviourImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
  },
  saviourName: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 4,
  },
  saviourCount: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: Colors.textSecondary,
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: Colors.error,
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