import React from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  Platform
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import Colors from "@/constants/colors";

export function AboutSummary() {
  const router = useRouter();

  const navigateToAbout = () => {
    router.push("/(tabs)/about");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Animal Life Saver</Text>
      
      <Text style={styles.description}>
        Animal Life Saver (ALS) is a global network of animal rescuers and rescue centers 
        working together to ensure no animal in need is left behind. Our mission is to 
        connect people who find injured animals with nearby rescue centers in real-time.
      </Text>
      
      <TouchableOpacity 
        style={styles.learnMoreButton}
        onPress={navigateToAbout}
        testID="learn-more-button"
      >
        <Text style={styles.learnMoreText}>Learn More</Text>
        <ArrowRight color={Colors.primary} size={16} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginHorizontal: 16,
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  learnMoreButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  learnMoreText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.primary,
    marginRight: 8,
  },
});