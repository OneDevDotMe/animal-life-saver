import React from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator,
  Share,
  Platform
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Calendar, MapPin, Heart, Share2, User } from "lucide-react-native";
import { useRescue } from "@/hooks/useRescue";
import Colors from "@/constants/colors";

export default function RescueStoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { rescue, isLoading, error } = useRescue(id);

  const shareRescue = async () => {
    if (rescue) {
      try {
        await Share.share({
          message: `Check out this amazing rescue story: ${rescue.title} - Animal Life Saver App`,
          url: `https://animallifesaver.org/rescue/${id}`,
        });
      } catch (error) {
        console.error("Error sharing rescue:", error);
      }
    }
  };

  const navigateToSaviour = (saviourId: string) => {
    router.push(`/saviour/${saviourId}`);
  };

  const navigateToRescueCenter = (rescueCenterId: string) => {
    router.push(`/rescue-center/${rescueCenterId}`);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading rescue story...</Text>
      </View>
    );
  }

  if (error || !rescue) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load rescue story.</Text>
        <TouchableOpacity style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: rescue.image }}
        style={styles.headerImage}
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{rescue.title}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Calendar color={Colors.textSecondary} size={16} />
              <Text style={styles.metaText}>{rescue.date}</Text>
            </View>
            
            <View style={styles.metaItem}>
              <MapPin color={Colors.textSecondary} size={16} />
              <Text style={styles.metaText}>{rescue.location}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.statusContainer}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{rescue.status}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={shareRescue}
            testID="share-button"
          >
            <Share2 color={Colors.primary} size={20} />
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>The Story</Text>
          <Text style={styles.storyText}>{rescue.story}</Text>
        </View>
        
        {rescue.beforeAfterImages && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Before & After</Text>
            <View style={styles.beforeAfterContainer}>
              <View style={styles.beforeAfterItem}>
                <Image
                  source={{ uri: rescue.beforeAfterImages.before }}
                  style={styles.beforeAfterImage}
                />
                <Text style={styles.beforeAfterLabel}>Before</Text>
              </View>
              
              <View style={styles.beforeAfterItem}>
                <Image
                  source={{ uri: rescue.beforeAfterImages.after }}
                  style={styles.beforeAfterImage}
                />
                <Text style={styles.beforeAfterLabel}>After</Text>
              </View>
            </View>
          </View>
        )}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rescued By</Text>
          
          <TouchableOpacity 
            style={styles.rescuerContainer}
            onPress={() => navigateToSaviour(rescue.saviour.id)}
            testID="saviour-profile-button"
          >
            <Image
              source={{ uri: rescue.saviour.image }}
              style={styles.rescuerImage}
            />
            
            <View style={styles.rescuerInfo}>
              <Text style={styles.rescuerName}>{rescue.saviour.name}</Text>
              <Text style={styles.rescuerRole}>{rescue.saviour.role}</Text>
              
              <View style={styles.rescuerStats}>
                <View style={styles.rescuerStatItem}>
                  <Heart color={Colors.primary} size={16} />
                  <Text style={styles.rescuerStatText}>
                    {rescue.saviour.rescuesCount} rescues
                  </Text>
                </View>
              </View>
            </View>
            
            <User color={Colors.primary} size={24} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rescue Center</Text>
          
          <TouchableOpacity 
            style={styles.rescueCenterContainer}
            onPress={() => navigateToRescueCenter(rescue.rescueCenter.id)}
            testID="rescue-center-button"
          >
            <Image
              source={{ uri: rescue.rescueCenter.image }}
              style={styles.rescueCenterImage}
            />
            
            <View style={styles.rescueCenterInfo}>
              <Text style={styles.rescueCenterName}>
                {rescue.rescueCenter.name}
              </Text>
              <Text style={styles.rescueCenterLocation}>
                {rescue.rescueCenter.location}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.supportButton}
          testID="support-button"
        >
          <Heart color={Colors.white} size={20} />
          <Text style={styles.supportButtonText}>Support This Cause</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: Colors.error,
    marginBottom: 16,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
  headerImage: {
    width: "100%",
    height: 250,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 8,
  },
  metaText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  statusBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 14,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  shareButtonText: {
    marginLeft: 8,
    color: Colors.primary,
    fontWeight: "500",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 12,
  },
  storyText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  beforeAfterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  beforeAfterItem: {
    width: "48%",
  },
  beforeAfterImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  beforeAfterLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
  },
  rescuerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 8,
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
  rescuerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  rescuerInfo: {
    flex: 1,
  },
  rescuerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  rescuerRole: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  rescuerStats: {
    flexDirection: "row",
  },
  rescuerStatItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  rescuerStatText: {
    marginLeft: 6,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  rescueCenterContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 8,
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
  rescueCenterImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  rescueCenterInfo: {
    flex: 1,
  },
  rescueCenterName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  rescueCenterLocation: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  supportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  supportButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});