import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Platform,
  Alert
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { ArrowLeft, Edit, LogOut, Heart, Building2, Mail, Phone, MapPin } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@/context/AuthContext";
import Colors from "@/constants/colors";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            setIsLoggingOut(true);
            try {
              await logout();
              router.push("/");
            } catch (error) {
              Alert.alert("Error", "Failed to logout. Please try again.");
            } finally {
              setIsLoggingOut(false);
            }
          },
        },
      ]
    );
  };

  const handleEditProfile = () => {
    router.push(`/profile-setup?type=${user?.userType}`);
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No user profile found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Profile",
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
            <Text style={styles.headerTitle}>My Profile</Text>
            <Text style={styles.headerSubtitle}>Manage your account</Text>
          </View>
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              {user.profileImage ? (
                <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
              ) : (
                <View style={styles.profileImagePlaceholder}>
                  <Text style={styles.profileImageText}>
                    {user.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
            </View>
            
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            
            <View style={styles.userTypeContainer}>
              {user.userType === 'saviour' && (
                <View style={styles.userTypeBadge}>
                  <Heart color={Colors.white} size={16} />
                  <Text style={styles.userTypeText}>Saviour</Text>
                </View>
              )}
              {user.userType === 'rescue-center' && (
                <View style={styles.userTypeBadge}>
                  <Building2 color={Colors.white} size={16} />
                  <Text style={styles.userTypeText}>Rescue Center</Text>
                </View>
              )}
              {user.userType === 'both' && (
                <View style={styles.userTypeBadges}>
                  <View style={styles.userTypeBadge}>
                    <Heart color={Colors.white} size={16} />
                    <Text style={styles.userTypeText}>Saviour</Text>
                  </View>
                  <View style={styles.userTypeBadge}>
                    <Building2 color={Colors.white} size={16} />
                    <Text style={styles.userTypeText}>Rescue Center</Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            
            <View style={styles.infoItem}>
              <Mail color={Colors.primary} size={20} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{user.email}</Text>
              </View>
            </View>

            {user.phone && (
              <View style={styles.infoItem}>
                <Phone color={Colors.primary} size={20} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Phone</Text>
                  <Text style={styles.infoValue}>{user.phone}</Text>
                </View>
              </View>
            )}

            <View style={styles.infoItem}>
              <MapPin color={Colors.primary} size={20} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoValue}>{user.location}</Text>
              </View>
            </View>
          </View>

          {user.bio && (
            <View style={styles.bioSection}>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.bioText}>{user.bio}</Text>
            </View>
          )}

          {/* Saviour-specific information */}
          {(user.userType === 'saviour' || user.userType === 'both') && (
            <View style={styles.saviourSection}>
              <Text style={styles.sectionTitle}>
                <Heart color={Colors.primary} size={20} />
                {" "}Saviour Information
              </Text>
              
              {user.experience && (
                <View style={styles.infoItem}>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Experience Level</Text>
                    <Text style={styles.infoValue}>{user.experience}</Text>
                  </View>
                </View>
              )}

              {user.specializations && (
                <View style={styles.infoItem}>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Specializations</Text>
                    <Text style={styles.infoValue}>{user.specializations}</Text>
                  </View>
                </View>
              )}
            </View>
          )}

          {/* Rescue center-specific information */}
          {(user.userType === 'rescue-center' || user.userType === 'both') && (
            <View style={styles.rescueCenterSection}>
              <Text style={styles.sectionTitle}>
                <Building2 color={Colors.primary} size={20} />
                {" "}Organization Information
              </Text>
              
              {user.organizationName && (
                <View style={styles.infoItem}>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Organization Name</Text>
                    <Text style={styles.infoValue}>{user.organizationName}</Text>
                  </View>
                </View>
              )}

              {user.website && (
                <View style={styles.infoItem}>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Website</Text>
                    <Text style={styles.infoValue}>{user.website}</Text>
                  </View>
                </View>
              )}

              {user.capacity && (
                <View style={styles.infoItem}>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Capacity</Text>
                    <Text style={styles.infoValue}>{user.capacity}</Text>
                  </View>
                </View>
              )}

              {user.services && (
                <View style={styles.infoItem}>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Services Offered</Text>
                    <Text style={styles.infoValue}>{user.services}</Text>
                  </View>
                </View>
              )}
            </View>
          )}

          <View style={styles.actionsSection}>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={handleEditProfile}
            >
              <Edit color={Colors.white} size={20} />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={handleLogout}
              disabled={isLoggingOut}
            >
              <LogOut color={Colors.error} size={20} />
              <Text style={styles.logoutButtonText}>
                {isLoggingOut ? "Logging out..." : "Logout"}
              </Text>
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
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.white,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  userTypeContainer: {
    alignItems: 'center',
  },
  userTypeBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  userTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  userTypeText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
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
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  bioSection: {
    marginBottom: 24,
  },
  bioText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    backgroundColor: Colors.white,
    padding: 16,
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
  saviourSection: {
    marginBottom: 24,
  },
  rescueCenterSection: {
    marginBottom: 24,
  },
  actionsSection: {
    marginBottom: 32,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  editButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.error,
    borderRadius: 8,
    padding: 16,
  },
  logoutButtonText: {
    color: Colors.error,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  errorText: {
    fontSize: 16,
    color: Colors.error,
    textAlign: 'center',
    marginTop: 100,
  },
}); 