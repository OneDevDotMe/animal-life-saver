import React from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image,
  TouchableOpacity,
  Platform
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { ArrowLeft, Heart, Users, MapPin, Award } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/colors";

export default function AboutScreen() {
  const router = useRouter();

  const stats = [
    { icon: Heart, value: "10,000+", label: "Animals Saved" },
    { icon: Users, value: "5,000+", label: "Active Saviours" },
    { icon: MapPin, value: "500+", label: "Rescue Centers" },
    { icon: Award, value: "50+", label: "Countries" },
  ];

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "About",
          headerShown: false 
        }} 
      />
      
      <View style={styles.container}>
        <LinearGradient
          colors={[Colors.primary, Colors.secondary]}
          style={styles.header}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft color={Colors.white} size={24} />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>About Animal Life Saver</Text>
            <Text style={styles.headerSubtitle}>Saving lives, one animal at a time</Text>
          </View>
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.missionSection}>
            <Text style={styles.sectionTitle}>Our Mission</Text>
            <Text style={styles.missionText}>
              Animal Life Saver (ALS) is a global platform dedicated to connecting people who find animals in distress with nearby rescue centers and individual saviours. Our mission is to ensure no animal in need is left behind.
            </Text>
          </View>

          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <stat.icon color={Colors.primary} size={24} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.storySection}>
            <Text style={styles.sectionTitle}>Our Story</Text>
            <Text style={styles.storyText}>
              Founded in 2023, ALS has grown into a community of thousands of rescuers, veterinarians, and animal welfare advocates working together to save animals across multiple countries.
            </Text>
            <Text style={styles.storyText}>
              What started as a simple idea to help one injured dog has evolved into a comprehensive platform that coordinates emergency responses, builds rescue networks, and educates the public on how to safely assist animals in distress.
            </Text>
          </View>

          <View style={styles.servicesSection}>
            <Text style={styles.sectionTitle}>What We Do</Text>
            
            <View style={styles.serviceItem}>
              <View style={styles.serviceIconContainer}>
                <Heart color={Colors.white} size={24} />
              </View>
              <View style={styles.serviceContent}>
                <Text style={styles.serviceTitle}>Emergency Response</Text>
                <Text style={styles.serviceDescription}>
                  Connect people who find injured animals with nearby rescue centers and trained saviours for immediate assistance.
                </Text>
              </View>
            </View>

            <View style={styles.serviceItem}>
              <View style={styles.serviceIconContainer}>
                <Users color={Colors.white} size={24} />
              </View>
              <View style={styles.serviceContent}>
                <Text style={styles.serviceTitle}>Network Building</Text>
                <Text style={styles.serviceDescription}>
                  Build and maintain a network of rescue centers, veterinarians, and individual saviours across the globe.
                </Text>
              </View>
            </View>

            <View style={styles.serviceItem}>
              <View style={styles.serviceIconContainer}>
                <Award color={Colors.white} size={24} />
              </View>
              <View style={styles.serviceContent}>
                <Text style={styles.serviceTitle}>Education & Training</Text>
                <Text style={styles.serviceDescription}>
                  Provide educational resources and training on how to safely assist animals in distress.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.valuesSection}>
            <Text style={styles.sectionTitle}>Our Values</Text>
            
            <View style={styles.valueItem}>
              <Text style={styles.valueTitle}>Compassion</Text>
              <Text style={styles.valueDescription}>
                Every animal deserves care, respect, and a chance at life, regardless of species or circumstance.
              </Text>
            </View>

            <View style={styles.valueItem}>
              <Text style={styles.valueTitle}>Community</Text>
              <Text style={styles.valueDescription}>
                We believe in the power of collective action and building strong networks of animal advocates.
              </Text>
            </View>

            <View style={styles.valueItem}>
              <Text style={styles.valueTitle}>Innovation</Text>
              <Text style={styles.valueDescription}>
                We use technology to create efficient, accessible solutions for animal rescue and welfare.
              </Text>
            </View>

            <View style={styles.valueItem}>
              <Text style={styles.valueTitle}>Transparency</Text>
              <Text style={styles.valueDescription}>
                We maintain open communication about our operations, impact, and how donations are used.
              </Text>
            </View>
          </View>

          <View style={styles.ctaSection}>
            <Text style={styles.ctaTitle}>Join Our Mission</Text>
            <Text style={styles.ctaText}>
              Whether you're a rescue center, an individual saviour, or someone who wants to help, there's a place for you in our community.
            </Text>
            <TouchableOpacity 
              style={styles.ctaButton}
              onPress={() => router.push("/support")}
            >
              <Text style={styles.ctaButtonText}>Get Involved</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.white,
    opacity: 0.9,
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
  missionSection: {
    padding: 20,
    backgroundColor: Colors.white,
    margin: 16,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
  },
  missionText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statItem: {
    width: "50%",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.white,
    marginBottom: 8,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
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
    textAlign: "center",
  },
  storySection: {
    padding: 20,
    backgroundColor: Colors.white,
    margin: 16,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  storyText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  servicesSection: {
    padding: 20,
    backgroundColor: Colors.white,
    margin: 16,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  serviceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  valuesSection: {
    padding: 20,
    backgroundColor: Colors.white,
    margin: 16,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  valueItem: {
    marginBottom: 20,
  },
  valueTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 8,
  },
  valueDescription: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  ctaSection: {
    padding: 20,
    backgroundColor: Colors.white,
    margin: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 32,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 12,
    textAlign: "center",
  },
  ctaText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
}); 