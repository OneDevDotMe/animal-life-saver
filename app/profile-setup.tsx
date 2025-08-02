import React, { useState, useEffect } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
  Image
} from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Camera, MapPin, Phone, Mail, Building2, Heart } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/constants/colors";
import { useAuth } from "@/context/AuthContext";
import DataService from "@/services/DataService";

export default function ProfileSetupScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: string }>();
  const { user, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(user?.googlePicture || null);
  
  // Common fields - pre-fill with Google data if available
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [location, setLocation] = useState(user?.location || "");
  const [bio, setBio] = useState(user?.bio || "");
  
  // Saviour-specific fields
  const [experience, setExperience] = useState(user?.experience || "");
  const [specializations, setSpecializations] = useState(user?.specializations || "");
  
  // Rescue center-specific fields
  const [organizationName, setOrganizationName] = useState(user?.organizationName || "");
  const [website, setWebsite] = useState(user?.website || "");
  const [capacity, setCapacity] = useState(user?.capacity || "");
  const [services, setServices] = useState(user?.services || "");

  useEffect(() => {
    // If no user is authenticated, redirect to login
    if (!user) {
      router.replace('/login');
      return;
    }

    // If user has already completed their profile and no type is specified, redirect to home
    if (user.location && user.name && user.email && !type) {
      router.replace('/');
    }
  }, [user, type, router]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need camera roll permissions to upload a profile image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need camera permissions to take a photo.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!name || !email || !location) {
      Alert.alert("Missing Information", "Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    try {
      // Prepare profile data
      const profileData = {
        name,
        email,
        phone,
        location,
        bio,
        profileImage: profileImage || undefined,
        userType: type as 'saviour' | 'rescue-center' | 'both',
        experience,
        specializations,
        organizationName,
        website,
        capacity,
        services,
      };

      // Update the user profile
      await updateProfile(profileData);
      
      // Get the updated user profile
      const updatedUser = { ...user, ...profileData };
      
      // Add user to appropriate lists based on their type
      const dataService = DataService.getInstance();
      
      if (type === 'saviour' || type === 'both') {
        // Check if user already exists as a saviour
        const existingSaviours = await dataService.getSaviours();
        const existingSaviour = existingSaviours.find(s => s.id === user?.id);
        
        if (existingSaviour) {
          await dataService.updateSaviour(updatedUser);
        } else {
          await dataService.addSaviour(updatedUser);
        }
      }
      
      if (type === 'rescue-center' || type === 'both') {
        // Check if user already exists as a rescue center
        const existingRescueCenters = await dataService.getRescueCenters();
        const existingRescueCenter = existingRescueCenters.find(rc => rc.id === user?.id);
        
        if (existingRescueCenter) {
          await dataService.updateRescueCenter(updatedUser);
        } else {
          await dataService.addRescueCenter(updatedUser);
        }
      }
      
      const isNewProfile = !user?.userType || user.userType === 'saviour';
      const message = isNewProfile 
        ? "Your profile has been successfully created. Welcome to Animal Life Saver!"
        : "Your profile has been updated successfully!";
      
      Alert.alert(
        isNewProfile ? "Profile Created!" : "Profile Updated!", 
        message,
        [{ text: "OK", onPress: () => router.push("/") }]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to save profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getUserTypeTitle = () => {
    switch (type) {
      case 'saviour':
        return 'Individual Saviour';
      case 'rescue-center':
        return 'Rescue Center';
      case 'both':
        return 'Saviour & Rescue Center';
      default:
        return 'Profile Setup';
    }
  };

  const getUserTypeDescription = () => {
    switch (type) {
      case 'saviour':
        return 'Tell us about yourself as an animal saviour';
      case 'rescue-center':
        return 'Tell us about your rescue organization';
      case 'both':
        return 'Tell us about yourself and your organization';
      default:
        return 'Complete your profile';
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Profile Setup",
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
            <Text style={styles.headerTitle}>{getUserTypeTitle()}</Text>
            <Text style={styles.headerSubtitle}>{getUserTypeDescription()}</Text>
          </View>
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.profileImageSection}>
            <Text style={styles.sectionTitle}>Profile Photo</Text>
            
            <View style={styles.imageContainer}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Camera color={Colors.primary} size={40} />
                  <Text style={styles.imagePlaceholderText}>Add Photo</Text>
                </View>
              )}
              
              <View style={styles.imageButtons}>
                <TouchableOpacity 
                  style={styles.imageButton} 
                  onPress={takePhoto}
                >
                  <Camera color={Colors.white} size={16} />
                  <Text style={styles.imageButtonText}>Camera</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.imageButton} 
                  onPress={pickImage}
                >
                  <Text style={styles.imageButtonText}>Gallery</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name *</Text>
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email *</Text>
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={styles.textInput}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Location *</Text>
              <TextInput
                style={styles.textInput}
                value={location}
                onChangeText={setLocation}
                placeholder="Enter your location"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Bio</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={bio}
                onChangeText={setBio}
                placeholder="Tell us about yourself"
                multiline
                numberOfLines={4}
              />
            </View>

            {/* Saviour-specific fields */}
            {(type === 'saviour' || type === 'both') && (
              <View style={styles.saviourSection}>
                <Text style={styles.sectionTitle}>
                  <Heart color={Colors.primary} size={20} />
                  {" "}Saviour Information
                </Text>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Experience Level</Text>
                  <TextInput
                    style={styles.textInput}
                    value={experience}
                    onChangeText={setExperience}
                    placeholder="e.g., Beginner, Intermediate, Expert"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Specializations</Text>
                  <TextInput
                    style={styles.textInput}
                    value={specializations}
                    onChangeText={setSpecializations}
                    placeholder="e.g., Dogs, Cats, Wildlife, Emergency Response"
                  />
                </View>
              </View>
            )}

            {/* Rescue center-specific fields */}
            {(type === 'rescue-center' || type === 'both') && (
              <View style={styles.rescueCenterSection}>
                <Text style={styles.sectionTitle}>
                  <Building2 color={Colors.primary} size={20} />
                  {" "}Organization Information
                </Text>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Organization Name</Text>
                  <TextInput
                    style={styles.textInput}
                    value={organizationName}
                    onChangeText={setOrganizationName}
                    placeholder="Enter organization name"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Website</Text>
                  <TextInput
                    style={styles.textInput}
                    value={website}
                    onChangeText={setWebsite}
                    placeholder="Enter website URL"
                    keyboardType="url"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Capacity</Text>
                  <TextInput
                    style={styles.textInput}
                    value={capacity}
                    onChangeText={setCapacity}
                    placeholder="e.g., 50 animals, 24/7 emergency"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Services Offered</Text>
                  <TextInput
                    style={[styles.textInput, styles.textArea]}
                    value={services}
                    onChangeText={setServices}
                    placeholder="e.g., Emergency rescue, Medical care, Adoption, Rehabilitation"
                    multiline
                    numberOfLines={4}
                  />
                </View>
              </View>
            )}
          </View>

          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? "Saving..." : (!user?.userType || user.userType === 'saviour' ? "Create Profile" : "Update Profile")}
            </Text>
          </TouchableOpacity>
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
  profileImageSection: {
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
  imageContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
  },
  imagePlaceholderText: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  imageButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  imageButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  formSection: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: Colors.white,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saviourSection: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  rescueCenterSection: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 