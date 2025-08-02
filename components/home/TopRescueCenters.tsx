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
import { Award, MapPin } from "lucide-react-native";
import { useTopRescueCenters } from "@/hooks/useTopRescueCenters";
import Colors from "@/constants/colors";

const { width: screenWidth } = Dimensions.get('window');

export function TopRescueCenters() {
  const router = useRouter();
  const { data: topRescueCenters, isLoading, error } = useTopRescueCenters();

  const navigateToRescueCenter = (id: string) => {
    router.push(`/rescue-center/${id}`);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Top Rescue Centers</Text>
        </View>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Top Rescue Centers</Text>
        </View>
        <Text style={styles.errorText}>{error?.message || 'An error occurred'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Top Rescue Centers</Text>
        <TouchableOpacity onPress={() => router.push("/rescue-centers")}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.centersList}
        testID="top-rescue-centers-scroll"
        decelerationRate="fast"
        snapToInterval={cardWidth + 4}
        snapToAlignment="start"
        pagingEnabled={false}
      >
        {topRescueCenters && topRescueCenters.length > 0 ? topRescueCenters.map((center) => (
          <TouchableOpacity 
            key={center.id} 
            style={styles.centerCard}
            onPress={() => navigateToRescueCenter(center.id)}
            testID={`rescue-center-card-${center.id}`}
          >
            <View style={styles.badgeContainer}>
              <Award color={Colors.white} size={12} />
            </View>
            
            <Image 
              source={{ uri: center.image }} 
              style={styles.centerImage} 
            />
            
            <Text style={styles.centerName}>{center.name}</Text>
            <View style={styles.locationRow}>
              <MapPin color={Colors.textSecondary} size={10} />
              <Text style={styles.centerLocation}>
                {center.location.split(',')[0]}, {center.location.split(',').pop()?.trim()}
              </Text>
            </View>
            <Text style={styles.rescuesCount}>{center.rescuesCount} rescues</Text>
          </TouchableOpacity>
        )) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No rescue centers available</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const cardWidth = Math.min(200);

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
  centersList: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  centerCard: {
    width: cardWidth,
    alignItems: "center",
    marginHorizontal: 2,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 18,
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
    top: 6,
    right: 6,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  centerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 6,
  },
  centerName: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  centerLocation: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginLeft: 2,
  },
  rescuesCount: {
    fontSize: 10,
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