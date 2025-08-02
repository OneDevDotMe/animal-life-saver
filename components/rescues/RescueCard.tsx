import React from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
  Platform
} from "react-native";
import { Calendar, MapPin } from "lucide-react-native";
import Colors from "@/constants/colors";
import { Rescue } from "@/types";

interface RescueCardProps {
  rescue: Rescue;
  onPress: () => void;
}

export function RescueCard({ rescue, onPress }: RescueCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      testID={`rescue-card-${rescue.id}`}
    >
      <Image 
        source={{ uri: rescue.image }} 
        style={styles.image} 
      />
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {rescue.title}
        </Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Calendar color={Colors.textSecondary} size={14} />
            <Text style={styles.metaText}>{rescue.date}</Text>
          </View>
          
          <View style={styles.metaItem}>
            <MapPin color={Colors.textSecondary} size={14} />
            <Text style={styles.metaText}>{rescue.location}</Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.saviourContainer}>
            <Image 
              source={{ uri: rescue.saviour.image }} 
              style={styles.saviourImage} 
            />
            <Text style={styles.saviourName}>{rescue.saviour.name}</Text>
          </View>
          
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{rescue.status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
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
    width: "100%",
    height: 180,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  metaText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  saviourContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  saviourImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  saviourName: {
    fontSize: 14,
    color: Colors.text,
  },
  statusBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.white,
  },
});