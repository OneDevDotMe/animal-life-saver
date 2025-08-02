import React from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
  Platform
} from "react-native";
import { MapPin, Star } from "lucide-react-native";
import Colors from "@/constants/colors";
import { RescueCenter } from "@/types";

interface RescueCenterCardProps {
  center: RescueCenter;
  onPress: () => void;
}

export function RescueCenterCard({ center, onPress }: RescueCenterCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      testID={`rescue-center-card-${center.id}`}
    >
      <Image 
        source={{ uri: center.image }} 
        style={styles.image} 
      />
      
      <View style={styles.content}>
        <Text style={styles.name}>{center.name}</Text>
        
        <View style={styles.locationContainer}>
          <MapPin color={Colors.primary} size={16} />
          <Text style={styles.location}>{center.location}</Text>
        </View>
        
        <View style={styles.ratingContainer}>
          <Star 
            color={Colors.gold} 
            fill={Colors.gold} 
            size={16} 
          />
          <Text style={styles.rating}>{center.rating.toFixed(1)}</Text>
          
          <View style={styles.statusContainer}>
            <View style={[
              styles.statusIndicator,
              center.isOpen ? styles.statusOpen : styles.statusClosed
            ]} />
            <Text style={styles.statusText}>
              {center.isOpen ? "Open" : "Closed"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
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
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.text,
    marginLeft: 4,
    marginRight: 12,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  statusOpen: {
    backgroundColor: Colors.success,
  },
  statusClosed: {
    backgroundColor: Colors.error,
  },
  statusText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});