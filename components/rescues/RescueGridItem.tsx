import React from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
  Platform
} from "react-native";
import Colors from "@/constants/colors";
import { Rescue } from "@/types";

interface RescueGridItemProps {
  rescue: Rescue;
  onPress: () => void;
}

export function RescueGridItem({ rescue, onPress }: RescueGridItemProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      testID={`rescue-grid-item-${rescue.id}`}
    >
      <Image 
        source={{ uri: rescue.image }} 
        style={styles.image} 
      />
      
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {rescue.title}
          </Text>
          
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
    flex: 1,
    margin: 8,
    borderRadius: 12,
    overflow: "hidden",
    height: 180,
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
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-end",
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: "flex-start",
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