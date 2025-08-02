import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  Platform,
  Alert
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { ArrowLeft, Heart } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/colors";
import { useAuth } from "@/context/AuthContext";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement Google OAuth
      // For now, we'll simulate the login process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate Google OAuth response
      const googleUserData = {
        googleId: 'google_123456',
        googleEmail: 'user@example.com',
        googleName: 'John Doe',
        googlePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
        name: 'John Doe',
        email: 'user@example.com',
      };
      
      // Login with Google data (this will create a basic user profile)
      await login(googleUserData);
      
      // After successful login, navigate to user type selection
      router.push('/user-type-selection');
    } catch (error) {
      Alert.alert("Login Failed", "Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Login",
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
            <Text style={styles.headerTitle}>Welcome to Animal Life Saver</Text>
            <Text style={styles.headerSubtitle}>Join our mission to save animals</Text>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.welcomeSection}>
            <View style={styles.iconContainer}>
              <Heart color={Colors.primary} size={48} />
            </View>
            <Text style={styles.welcomeTitle}>Animal Life Saver</Text>
            <Text style={styles.welcomeSubtitle}>
              Connect with rescue centers and fellow animal lovers to make a difference in animal welfare
            </Text>
          </View>

          <View style={styles.loginSection}>
            <Text style={styles.sectionTitle}>Get Started</Text>
            <Text style={styles.sectionDescription}>
              Sign in with your Google account to join our community
            </Text>

            <TouchableOpacity 
              style={styles.googleButton}
              onPress={handleGoogleLogin}
              disabled={isLoading}
            >
              <View style={styles.googleButtonContent}>
                <Text style={styles.googleButtonText}>
                  {isLoading ? "Signing in..." : "Continue with Google"}
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>What happens next?</Text>
              <View style={styles.infoSteps}>
                <View style={styles.infoStep}>
                  <View style={styles.stepNumber}>1</View>
                  <Text style={styles.stepText}>Sign in with Google</Text>
                </View>
                <View style={styles.infoStep}>
                  <View style={styles.stepNumber}>2</View>
                  <Text style={styles.stepText}>Choose your role (Saviour, Rescue Center, or Both)</Text>
                </View>
                <View style={styles.infoStep}>
                  <View style={styles.stepNumber}>3</View>
                  <Text style={styles.stepText}>Complete your profile</Text>
                </View>
                <View style={styles.infoStep}>
                  <View style={styles.stepNumber}>4</View>
                  <Text style={styles.stepText}>Start helping animals in need!</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By continuing, you agree to our Terms of Service and Privacy Policy
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
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },
  loginSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  googleButton: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
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
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
  },
  infoSection: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
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
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
  },
  infoSteps: {
    gap: 12,
  },
  infoStep: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepText: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
  },
  footer: {
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
}); 