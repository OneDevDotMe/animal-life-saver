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
import { ArrowLeft, Heart, Code, Award, MapPin, Mail, Phone } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/colors";

export default function FounderScreen() {
  const router = useRouter();

  const achievements = [
    { icon: Heart, title: "10,000+ Animals Saved", description: "Through the ALS platform" },
    { icon: Code, title: "8+ Years Experience", description: "In software development" },
    { icon: Award, title: "50+ Countries", description: "Platform available worldwide" },
    { icon: MapPin, value: "500+ Rescue Centers", description: "Connected through ALS" },
  ];

  const skills = [
    "Software Development",
    "Animal Welfare",
    "Emergency Response Coordination",
    "Community Building",
    "Project Management",
    "Public Speaking"
  ];

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Meet the Founder",
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
            <Text style={styles.headerTitle}>Meet the Founder</Text>
            <Text style={styles.headerSubtitle}>The story behind Animal Life Saver</Text>
          </View>
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.profileSection}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" }}
              style={styles.profileImage}
            />
            <Text style={styles.founderName}>Shubham Singh</Text>
            <Text style={styles.founderTitle}>Tech Developer & Animal Lover</Text>
            <Text style={styles.founderLocation}>
              <MapPin color={Colors.primary} size={16} />
              {" "}Based in India, Serving Globally
            </Text>
          </View>

          <View style={styles.storySection}>
            <Text style={styles.sectionTitle}>The Journey</Text>
            <Text style={styles.storyText}>
              Shubham Singh is a passionate tech developer and avid animal lover who founded Animal Life Saver after witnessing the critical gap in emergency response for injured animals.
            </Text>
            <Text style={styles.storyText}>
              In 2023, while walking home from work, Shubham encountered a severely injured dog on the side of the road. Despite his best efforts, he struggled to find immediate help for the animal. This experience became the catalyst for creating a platform that could connect people who find animals in distress with nearby rescue centers and trained saviours.
            </Text>
            <Text style={styles.storyText}>
              With over 8 years of experience in software development and a deep love for animals, Shubham combined his technical expertise with his passion for animal welfare to create a platform that could save lives.
            </Text>
          </View>

          <View style={styles.achievementsSection}>
            <Text style={styles.sectionTitle}>Key Achievements</Text>
            <View style={styles.achievementsGrid}>
              {achievements.map((achievement, index) => (
                <View key={index} style={styles.achievementItem}>
                  <View style={styles.achievementIconContainer}>
                    <achievement.icon color={Colors.white} size={24} />
                  </View>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.skillsSection}>
            <Text style={styles.sectionTitle}>Expertise & Skills</Text>
            <View style={styles.skillsContainer}>
              {skills.map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.personalSection}>
            <Text style={styles.sectionTitle}>Personal Life</Text>
            <Text style={styles.personalText}>
              When not coding or rescuing animals, Shubham enjoys hiking with his rescued dogs and volunteering at local animal shelters. He believes that technology can be a powerful force for good in animal welfare.
            </Text>
            <Text style={styles.personalText}>
              Shubham is also an advocate for responsible pet ownership and frequently speaks at community events about animal welfare and the importance of spaying/neutering pets.
            </Text>
          </View>

          <View style={styles.quoteSection}>
            <Text style={styles.quoteText}>
              "Every animal deserves a chance at life, and every person who finds an animal in distress deserves to know where to turn for help. That's what drives me every day."
            </Text>
            <Text style={styles.quoteAuthor}>- Shubham Singh</Text>
          </View>

          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Get in Touch</Text>
            <Text style={styles.contactText}>
              Shubham is always open to connecting with fellow animal lovers, rescue organizations, and anyone interested in making a difference in animal welfare.
            </Text>
            
            <View style={styles.contactButtons}>
              <TouchableOpacity style={styles.contactButton}>
                <Mail color={Colors.white} size={20} />
                <Text style={styles.contactButtonText}>Email</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.contactButton}>
                <Phone color={Colors.white} size={20} />
                <Text style={styles.contactButtonText}>Call</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.ctaSection}>
            <Text style={styles.ctaTitle}>Join the Mission</Text>
            <Text style={styles.ctaText}>
              Inspired by Shubham's story? Join our community of animal advocates and help save more lives.
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
  profileSection: {
    alignItems: 'center',
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
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  founderName: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  founderTitle: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "500",
    marginBottom: 8,
  },
  founderLocation: {
    fontSize: 14,
    color: Colors.textSecondary,
    flexDirection: "row",
    alignItems: "center",
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
  },
  storyText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  achievementsSection: {
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
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  achievementItem: {
    width: "50%",
    alignItems: "center",
    padding: 16,
    marginBottom: 16,
  },
  achievementIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  skillsSection: {
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
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillItem: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "500",
  },
  personalSection: {
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
  personalText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  quoteSection: {
    padding: 20,
    backgroundColor: Colors.primaryLight,
    margin: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  quoteText: {
    fontSize: 18,
    color: Colors.text,
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 12,
  },
  quoteAuthor: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "bold",
  },
  contactSection: {
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
  contactText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 20,
  },
  contactButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  contactButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
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