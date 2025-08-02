import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  Image,
  Platform,
  Alert,
  ListRenderItem
} from "react-native";
import { useRouter } from "expo-router";
import { Camera, Upload, MapPin, Send, Menu, User } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import { useSOS } from "@/hooks/useSOS";
import { useAuth } from "@/context/AuthContext";
import { TopSaviours } from "@/components/home/TopSaviours";
import { TopRescueCenters } from "@/components/home/TopRescueCenters";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { SupportSection } from "@/components/home/SupportSection";
import { AboutSummary } from "@/components/home/AboutSummary";
import { NavigationMenu } from "@/components/NavigationMenu";
import Colors from "@/constants/colors";

export default function HomeScreen() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [animalType, setAnimalType] = useState<string>("Other");
  const [description, setDescription] = useState<string>("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { submitSOS, isSubmitting } = useSOS();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need camera roll permissions to upload an image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need location permissions to find nearby rescue centers.");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    if (address && address.length > 0) {
      const { city, region } = address[0];
      setLocation(`${city}, ${region}`);
    }
  };

  const handleSubmitSOS = async () => {
    if (!image) {
      Alert.alert("Missing Image", "Please upload an image of the animal.");
      return;
    }

    if (!location) {
      Alert.alert("Missing Location", "Please provide your location.");
      return;
    }

    try {
      await submitSOS({
        image,
        location,
        animalType,
        description,
      });
      
      Alert.alert(
        "SOS Submitted", 
        "Your SOS has been sent to nearby rescue centers. They will contact you soon.",
        [{ text: "OK", onPress: () => {
          setImage(null);
          setDescription("");
        }}]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to submit SOS. Please try again.");
    }
  };

  const sections = [
    { type: 'header', id: 'header' },
    { type: 'sos', id: 'sos' },
    { type: 'topSaviours', id: 'topSaviours' },
    { type: 'topRescueCenters', id: 'topRescueCenters' },
    { type: 'support', id: 'support' },
    { type: 'products', id: 'products' },
    { type: 'about', id: 'about' },
  ];

  const renderSection: ListRenderItem<{ type: string; id: string }> = ({ item }) => {
    switch (item.type) {
      case 'header':
        return (
          <LinearGradient
            colors={[Colors.primary, Colors.secondary]}
            style={styles.header}
          >
            <View style={styles.headerContent}>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerTitle}>Animal Life Saver</Text>
                <Text style={styles.headerSubtitle}>Help save an animal in need</Text>
              </View>
              <View style={styles.headerButtons}>
                <TouchableOpacity 
                  style={styles.loginButton}
                  onPress={() => router.push(isAuthenticated ? '/profile' : '/login')}
                >
                  <User color={Colors.white} size={20} />
                  <Text style={styles.loginButtonText}>
                    {isAuthenticated ? 'Profile' : 'Login'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.menuButton}
                  onPress={() => setIsMenuVisible(true)}
                >
                  <Menu color={Colors.white} size={24} />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        );
      
      case 'sos':
        return (
          <View style={styles.sosCard}>
            <Text style={styles.sosTitle}>Report an Animal in Need</Text>
            
            <View style={styles.imageUploadContainer}>
              {image ? (
                <Image source={{ uri: image }} style={styles.previewImage} />
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <Upload color={Colors.primary} size={40} />
                  <Text style={styles.uploadText}>Upload Image</Text>
                </View>
              )}
              
              <View style={styles.imageButtonsContainer}>
                <TouchableOpacity 
                  style={styles.imageButton} 
                  onPress={takePhoto}
                  testID="take-photo-button"
                >
                  <Camera color={Colors.white} size={20} />
                  <Text style={styles.imageButtonText}>Camera</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.imageButton} 
                  onPress={pickImage}
                  testID="pick-image-button"
                >
                  <Upload color={Colors.white} size={20} />
                  <Text style={styles.imageButtonText}>Gallery</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.locationButton} 
              onPress={getLocation}
              testID="get-location-button"
            >
              <MapPin color={Colors.primary} size={20} />
              <Text style={styles.locationButtonText}>
                {location || "Get Current Location"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.submitButton} 
              onPress={handleSubmitSOS}
              disabled={isSubmitting}
              testID="submit-sos-button"
            >
              <Send color={Colors.white} size={20} />
              <Text style={styles.submitButtonText}>
                {isSubmitting ? "Sending SOS..." : "Send SOS"}
              </Text>
            </TouchableOpacity>
          </View>
        );
      
      case 'topSaviours':
        return <TopSaviours />;
      
      case 'topRescueCenters':
        return <TopRescueCenters />;
      
      case 'support':
        return <SupportSection />;
      
      case 'products':
        return <FeaturedProducts />;
      
      case 'about':
        return <AboutSummary />;
      
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
      
      <NavigationMenu 
        isVisible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.white,
    opacity: 0.9,
  },
  menuButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  sosCard: {
    margin: 16,
    padding: 16,
    backgroundColor: Colors.white,
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
  sosTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
    textAlign: "center",
  },
  imageUploadContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  uploadPlaceholder: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: Colors.lightGray,
  },
  uploadText: {
    marginTop: 8,
    color: Colors.textSecondary,
    fontSize: 16,
  },
  imageButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  imageButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 12,
    flex: 0.48,
  },
  imageButtonText: {
    color: Colors.white,
    marginLeft: 8,
    fontWeight: "500",
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  locationButtonText: {
    color: Colors.primary,
    marginLeft: 8,
    fontWeight: "500",
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
  },
  submitButtonText: {
    color: Colors.white,
    marginLeft: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
});