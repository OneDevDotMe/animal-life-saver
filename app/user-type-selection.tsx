import React, { useEffect } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  Platform,
  Image
} from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Heart, Shield, Users } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/colors";
import { useAuth } from "@/context/AuthContext";

export default function UserTypeSelectionScreen() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // If user has already completed their profile setup (has location and other required fields), redirect to home
    if (user && user.location && user.name && user.email) {
      router.replace('/');
    }
  }, [user, router]);

  const handleUserTypeSelection = (userType: 'saviour' | 'rescue-center' | 'both') => {
    // Navigate to profile setup with the selected user type
    router.push(`/profile-setup?type=${userType}`);
  };

  const handleBack = () => {
    // Go back to login screen
    router.push('/login');
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Choose Your Role",
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
            onPress={handleBack}
          >
            <ArrowLeft color={Colors.white} size={24} />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Welcome!</Text>
            <Text style={styles.headerSubtitle}>How would you like to help animals?</Text>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.welcomeSection}>
            {user?.googlePicture && (
              <Image 
                source={{ uri: user.googlePicture }} 
                style={styles.profileImage} 
              />
            )}
            <Text style={styles.welcomeText}>
              Hi {user?.name || 'there'}! Let's get you set up to help animals in need.
            </Text>
            <Text style={styles.welcomeSubtext}>
              Choose how you'd like to contribute to our mission
            </Text>
          </View>

          <View style={styles.userTypesContainer}>
            <TouchableOpacity 
              style={styles.userTypeCard}
              onPress={() => handleUserTypeSelection('saviour')}
            >
              <View style={styles.userTypeIcon}>
                <Heart color={Colors.primary} size={32} />
              </View>
              <View style={styles.userTypeContent}>
                <Text style={styles.userTypeTitle}>Individual Saviour</Text>
                <Text style={styles.userTypeDescription}>
                  I want to help animals in distress and report emergencies. I can respond to SOS calls and assist with rescues.
                </Text>
                <View style={styles.userTypeFeatures}>
                  <Text style={styles.featureText}>• Report animals in need</Text>
                  <Text style={styles.featureText}>• Respond to emergency calls</Text>
                  <Text style={styles.featureText}>• Track your rescue activities</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.userTypeCard}
              onPress={() => handleUserTypeSelection('rescue-center')}
            >
              <View style={styles.userTypeIcon}>
                <Shield color={Colors.primary} size={32} />
              </View>
              <View style={styles.userTypeContent}>
                <Text style={styles.userTypeTitle}>Rescue Organization</Text>
                <Text style={styles.userTypeDescription}>
                  I represent an organization that rescues and cares for animals. We have facilities and resources to help.
                </Text>
                <View style={styles.userTypeFeatures}>
                  <Text style={styles.featureText}>• Receive SOS alerts</Text>
                  <Text style={styles.featureText}>• Manage rescue operations</Text>
                  <Text style={styles.featureText}>• Showcase your organization</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.userTypeCard}
              onPress={() => handleUserTypeSelection('both')}
            >
              <View style={styles.userTypeIcon}>
                <Users color={Colors.primary} size={32} />
              </View>
              <View style={styles.userTypeContent}>
                <Text style={styles.userTypeTitle}>Both Roles</Text>
                <Text style={styles.userTypeDescription}>
                  I want to be both a saviour and represent a rescue organization. I can help individually and organizationally.
                </Text>
                <View style={styles.userTypeFeatures}>
                  <Text style={styles.featureText}>• All individual saviour features</Text>
                  <Text style={styles.featureText}>• All organization features</Text>
                  <Text style={styles.featureText}>• Maximum impact potential</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              You can change your role preferences later in your profile settings
            </Text>
          </View>
        </View>
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
    padding: 20,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 8,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  userTypesContainer: {
    flex: 1,
  },
  userTypeCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  userTypeIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userTypeContent: {
    flex: 1,
  },
  userTypeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  userTypeDescription: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 16,
  },
  userTypeFeatures: {
    marginTop: 8,
  },
  featureText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  footer: {
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
}); 