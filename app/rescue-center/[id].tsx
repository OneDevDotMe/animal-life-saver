import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator,
  Linking,
  Platform
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MapPin, Phone, Mail, Clock, Star, ExternalLink, MessageCircle } from "lucide-react-native";
import { useRescueCenter } from "@/hooks/useRescueCenter";
import { RescuesList } from "@/components/rescue-centers/RescuesList";
import Colors from "@/constants/colors";

export default function RescueCenterScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { rescueCenter, isLoading, error } = useRescueCenter(id);
  const [showContact, setShowContact] = useState(false);

  const openMap = () => {
    if (rescueCenter) {
      const { latitude, longitude } = rescueCenter.coordinates;
      const url = Platform.select({
        ios: `maps:0,0?q=${rescueCenter.name}@${latitude},${longitude}`,
        android: `geo:0,0?q=${latitude},${longitude}(${rescueCenter.name})`,
        web: `https://maps.google.com/?q=${latitude},${longitude}`,
      });
      
      if (url) {
        Linking.openURL(url);
      }
    }
  };

  const callRescueCenter = () => {
    if (rescueCenter) {
      Linking.openURL(`tel:${rescueCenter.phone}`);
    }
  };

  const emailRescueCenter = () => {
    if (rescueCenter) {
      Linking.openURL(`mailto:${rescueCenter.email}`);
    }
  };

  const visitWebsite = () => {
    if (rescueCenter && rescueCenter.website) {
      Linking.openURL(rescueCenter.website);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading rescue center details...</Text>
      </View>
    );
  }

  if (error || !rescueCenter) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load rescue center details.</Text>
        <TouchableOpacity style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: rescueCenter.image }}
        style={styles.headerImage}
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{rescueCenter.name}</Text>
          
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                color={star <= rescueCenter.rating ? Colors.gold : Colors.lightGray}
                fill={star <= rescueCenter.rating ? Colors.gold : "transparent"}
                size={20}
              />
            ))}
            <Text style={styles.ratingText}>{rescueCenter.rating.toFixed(1)}</Text>
          </View>
          
          <View style={styles.locationContainer}>
            <MapPin color={Colors.primary} size={16} />
            <Text style={styles.location}>{rescueCenter.location}</Text>
          </View>
        </View>
        
        <View style={styles.statusContainer}>
          <View style={[
            styles.statusIndicator,
            rescueCenter.isOpen ? styles.statusOpen : styles.statusClosed
          ]} />
          <Text style={styles.statusText}>
            {rescueCenter.isOpen ? "Open Now" : "Closed"}
          </Text>
          <Clock color={Colors.textSecondary} size={16} style={styles.clockIcon} />
          <Text style={styles.hoursText}>{rescueCenter.hours}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{rescueCenter.description}</Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{rescueCenter.rescuesCount}</Text>
            <Text style={styles.statLabel}>Rescues</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{rescueCenter.capacity}</Text>
            <Text style={styles.statLabel}>Capacity</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{rescueCenter.yearsActive}</Text>
            <Text style={styles.statLabel}>Years Active</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Rescues</Text>
          {rescueCenter.recentRescues && rescueCenter.recentRescues.length > 0 ? (
            <RescuesList rescues={rescueCenter.recentRescues} />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No recent rescues to display</Text>
            </View>
          )}
        </View>
        
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setShowContact(!showContact)}
            testID="contact-button"
          >
            <Text style={styles.actionButtonText}>
              {showContact ? "Hide Contact" : "Contact"}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.donateButton]}
            testID="donate-button"
          >
            <Text style={styles.donateButtonText}>Donate</Text>
          </TouchableOpacity>
        </View>
        
        {showContact && (
          <View style={styles.contactContainer}>
            {rescueCenter.phone && (
              <TouchableOpacity 
                style={styles.contactItem}
                onPress={callRescueCenter}
                testID="call-button"
              >
                <Phone color={Colors.primary} size={20} />
                <Text style={styles.contactText}>{rescueCenter.phone}</Text>
              </TouchableOpacity>
            )}
            
            {rescueCenter.email && (
              <TouchableOpacity 
                style={styles.contactItem}
                onPress={emailRescueCenter}
                testID="email-button"
              >
                <Mail color={Colors.primary} size={20} />
                <Text style={styles.contactText}>{rescueCenter.email}</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={styles.contactItem}
              onPress={openMap}
              testID="map-button"
            >
              <MapPin color={Colors.primary} size={20} />
              <Text style={styles.contactText}>{rescueCenter.address}</Text>
            </TouchableOpacity>
            
            {rescueCenter.website && (
              <TouchableOpacity 
                style={styles.contactItem}
                onPress={visitWebsite}
                testID="website-button"
              >
                <ExternalLink color={Colors.primary} size={20} />
                <Text style={styles.contactText}>{rescueCenter.website}</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={styles.messageButton}
              testID="message-button"
            >
              <MessageCircle color={Colors.white} size={20} />
              <Text style={styles.messageButtonText}>Send Message</Text>
            </TouchableOpacity>
          </View>
        )}
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
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    marginLeft: 8,
    fontSize: 16,
    color: Colors.textSecondary,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
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
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusOpen: {
    backgroundColor: Colors.success,
  },
  statusClosed: {
    backgroundColor: Colors.error,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
  },
  clockIcon: {
    marginLeft: 16,
    marginRight: 8,
  },
  hoursText: {
    fontSize: 16,
    color: Colors.textSecondary,
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
  description: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
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
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: "100%",
    backgroundColor: Colors.border,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginRight: 8,
  },
  actionButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
  donateButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    marginRight: 0,
    marginLeft: 8,
  },
  donateButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  contactContainer: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
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
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
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
  },
  messageButtonText: {
    color: Colors.white,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});