import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator,
  FlatList,
  Linking,
  Platform,
  Alert
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MapPin, Heart, Award, Calendar, Phone, Mail, MessageCircle, ExternalLink, Star, Users, Clock, Shield } from "lucide-react-native";
import { useSaviour } from "@/hooks/useSaviour";
import { RescueCard } from "@/components/rescues/RescueCard";
import Colors from "@/constants/colors";
import { Rescue, Badge } from "@/types";

export default function SaviourProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { saviour, isLoading, error } = useSaviour(id);
  const [showContact, setShowContact] = useState(false);

  const navigateToRescue = (rescueId: string) => {
    router.push(`/rescue/${rescueId}`);
  };

  const handleContact = (type: 'phone' | 'email' | 'message') => {
    if (!saviour) return;

    switch (type) {
      case 'phone':
        if (saviour.contactNumber) {
          Linking.openURL(`tel:${saviour.contactNumber}`);
        } else {
          Alert.alert('Contact Info', 'Phone number not available');
        }
        break;
      case 'email':
        if (saviour.email) {
          Linking.openURL(`mailto:${saviour.email}`);
        } else {
          Alert.alert('Contact Info', 'Email not available');
        }
        break;
      case 'message':
        // This would typically open a messaging interface
        Alert.alert('Message', 'Messaging feature coming soon!');
        break;
    }
  };

  const openSocialLink = (platform: string, url?: string) => {
    if (url) {
      Linking.openURL(url);
    } else {
      Alert.alert('Social Media', `${platform} profile not available`);
    }
  };

  const renderRescue = ({ item }: { item: Rescue }) => (
    <RescueCard 
      rescue={item} 
      onPress={() => navigateToRescue(item.id)} 
    />
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading saviour profile...</Text>
      </View>
    );
  }

  if (error || !saviour) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load saviour profile.</Text>
        <TouchableOpacity style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={{ uri: saviour.image }}
          style={styles.profileImage}
        />
        
        <View style={styles.profileInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{saviour.name}</Text>
            {saviour.verified && (
              <Shield color={Colors.primary} size={20} style={styles.verifiedIcon} />
            )}
          </View>
          
          <Text style={styles.role}>{saviour.role}</Text>
          
          <View style={styles.locationContainer}>
            <MapPin color={Colors.primary} size={16} />
            <Text style={styles.location}>{saviour.location}</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Heart color={Colors.primary} size={16} />
              <Text style={styles.statText}>{saviour.rescuesCount} rescues</Text>
            </View>
            
            <View style={styles.statItem}>
              <Calendar color={Colors.primary} size={16} />
              <Text style={styles.statText}>Since {saviour.memberSince}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Contact Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <TouchableOpacity 
            onPress={() => setShowContact(!showContact)}
            style={styles.toggleButton}
          >
            <Text style={styles.toggleButtonText}>
              {showContact ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>
        
        {showContact && (
          <View style={styles.contactContainer}>
            {saviour.contactNumber && (
              <TouchableOpacity 
                style={styles.contactItem}
                onPress={() => handleContact('phone')}
              >
                <Phone color={Colors.primary} size={20} />
                <Text style={styles.contactText}>{saviour.contactNumber}</Text>
              </TouchableOpacity>
            )}
            
            {saviour.email && (
              <TouchableOpacity 
                style={styles.contactItem}
                onPress={() => handleContact('email')}
              >
                <Mail color={Colors.primary} size={20} />
                <Text style={styles.contactText}>{saviour.email}</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={styles.messageButton}
              onPress={() => handleContact('message')}
            >
              <MessageCircle color={Colors.white} size={20} />
              <Text style={styles.messageButtonText}>Send Message</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      {/* Badges Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Badges & Achievements</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.badgesList}
        >
          {saviour.badges && saviour.badges.length > 0 ? (
            saviour.badges.map((badge: Badge, index: number) => (
              <View key={index} style={styles.badgeItem}>
                <View style={styles.badgeIconContainer}>
                  <Award color={Colors.white} size={24} />
                </View>
                <Text style={styles.badgeName}>{badge.name}</Text>
                <Text style={styles.badgeDescription}>{badge.description}</Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No badges yet</Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Specializations Section */}
      {saviour.specializations && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specializations</Text>
          <View style={styles.specializationsContainer}>
            <Text style={styles.specializationsText}>{saviour.specializations}</Text>
          </View>
        </View>
      )}
      
      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.bio}>{saviour.bio}</Text>
      </View>

      {/* Social Media Section */}
      {saviour.socialLinks && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Follow</Text>
          <View style={styles.socialContainer}>
            {saviour.socialLinks.instagram && (
              <TouchableOpacity 
                style={styles.socialButton}
                onPress={() => openSocialLink('Instagram', saviour.socialLinks?.instagram)}
              >
                <Text style={styles.socialButtonText}>Instagram</Text>
                <ExternalLink color={Colors.primary} size={16} />
              </TouchableOpacity>
            )}
            
            {saviour.socialLinks.facebook && (
              <TouchableOpacity 
                style={styles.socialButton}
                onPress={() => openSocialLink('Facebook', saviour.socialLinks?.facebook)}
              >
                <Text style={styles.socialButtonText}>Facebook</Text>
                <ExternalLink color={Colors.primary} size={16} />
              </TouchableOpacity>
            )}
            
            {saviour.socialLinks.youtube && (
              <TouchableOpacity 
                style={styles.socialButton}
                onPress={() => openSocialLink('YouTube', saviour.socialLinks?.youtube)}
              >
                <Text style={styles.socialButtonText}>YouTube</Text>
                <ExternalLink color={Colors.primary} size={16} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
      
      {/* Recent Activity Section */}
      {saviour.mostRecentActivity && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityContainer}>
            <Clock color={Colors.textSecondary} size={16} />
            <Text style={styles.activityText}>{saviour.mostRecentActivity}</Text>
          </View>
        </View>
      )}
      
      {/* Recent Rescues Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Rescues</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {saviour.recentRescues && saviour.recentRescues.length > 0 ? (
          <FlatList
            data={saviour.recentRescues}
            renderItem={renderRescue}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.rescuesList}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No recent rescues to display</Text>
          </View>
        )}
      </View>
      
      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => setShowContact(true)}
          testID="contact-saviour-button"
        >
          <MessageCircle color={Colors.white} size={20} />
          <Text style={styles.primaryButtonText}>Contact {saviour.name}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          testID="support-saviour-button"
        >
          <Heart color={Colors.primary} size={20} />
          <Text style={styles.secondaryButtonText}>Support Work</Text>
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
  header: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: Colors.white,
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
    justifyContent: "center",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginRight: 8,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  role: {
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  location: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 4,
  },
  statText: {
    marginLeft: 6,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  section: {
    padding: 16,
    backgroundColor: Colors.white,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
  },
  toggleButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  toggleButtonText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  contactContainer: {
    marginTop: 8,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingVertical: 8,
  },
  contactText: {
    marginLeft: 12,
    fontSize: 16,
    color: Colors.text,
  },
  messageButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  messageButtonText: {
    color: Colors.white,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  badgesList: {
    paddingVertical: 8,
  },
  badgeItem: {
    alignItems: "center",
    marginRight: 16,
    width: 120,
  },
  badgeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 16,
  },
  specializationsContainer: {
    backgroundColor: Colors.lightGray,
    padding: 12,
    borderRadius: 8,
  },
  specializationsText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  bio: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  socialContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  socialButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "500",
    marginRight: 4,
  },
  activityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    padding: 12,
    borderRadius: 8,
  },
  activityText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  seeAllText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "500",
  },
  rescuesList: {
    paddingBottom: 8,
  },
  emptyContainer: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  actionButtonsContainer: {
    padding: 16,
    gap: 12,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});