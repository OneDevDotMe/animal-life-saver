import React from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  Platform
} from "react-native";
import { useRouter } from "expo-router";
import { Heart, Building2, Package } from "lucide-react-native";
import Colors from "@/constants/colors";

export function SupportSection() {
  const router = useRouter();

  const navigateToSupport = (tab: "donate" | "rescue-center" | "send-supplies") => {
    if (tab === "rescue-center") {
      router.push("/(tabs)/support?tab=rescue-center");
    } else if (tab === "send-supplies") {
      router.push("/(tabs)/support?tab=send-supplies");
    } else {
      router.push({
        pathname: "/(tabs)/support",
        params: { tab },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Support Our Mission</Text>
      
      <View style={styles.cardsContainer}>
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigateToSupport("donate")}
          testID="donate-card"
        >
          <View style={[styles.iconContainer, { backgroundColor: Colors.primary }]}>
            <Heart color={Colors.white} size={24} />
          </View>
          <Text style={styles.cardTitle}>Donate</Text>
          <Text style={styles.cardDescription}>
            Support our rescue operations with a donation
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigateToSupport("rescue-center")}
          testID="rescue-center-card"
        >
          <View style={[styles.iconContainer, { backgroundColor: Colors.secondary }]}>
            <Building2 color={Colors.white} size={24} />
          </View>
          <Text style={styles.cardTitle}>Rescue Center</Text>
          <Text style={styles.cardDescription}>
            Become a rescue center partner
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigateToSupport("send-supplies")}
          testID="send-supplies-card"
        >
          <View style={[styles.iconContainer, { backgroundColor: Colors.tertiary }]}>
            <Package color={Colors.white} size={24} />
          </View>
          <Text style={styles.cardTitle}>Send Supplies</Text>
          <Text style={styles.cardDescription}>
            Send supplies to rescue centers
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: "center",
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
    textAlign: "center",
  },
  cardDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});