import React from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity,
  Platform
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { ArrowLeft, Shield, Eye, Lock, Users, Globe } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/colors";

export default function PrivacyScreen() {
  const router = useRouter();

  const privacyPrinciples = [
    { icon: Shield, title: "Data Protection", description: "Your personal information is protected with industry-standard security measures" },
    { icon: Eye, title: "Transparency", description: "We clearly explain how we collect, use, and share your data" },
    { icon: Lock, title: "Control", description: "You have control over your data and can request changes or deletion" },
    { icon: Users, title: "Minimal Collection", description: "We only collect data necessary to provide our services" },
  ];

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Privacy Policy",
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
            <Text style={styles.headerTitle}>Privacy Policy</Text>
            <Text style={styles.headerSubtitle}>How we protect your information</Text>
          </View>
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.updateSection}>
            <Text style={styles.updateText}>
              <Globe color={Colors.primary} size={16} />
              {" "}Last updated: January 2025
            </Text>
          </View>

          <View style={styles.introSection}>
            <Text style={styles.sectionTitle}>Introduction</Text>
            <Text style={styles.introText}>
              Animal Life Saver ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our mobile application and related services.
            </Text>
            <Text style={styles.introText}>
              By using Animal Life Saver, you agree to the collection and use of information in accordance with this policy. If you have any questions about this Privacy Policy, please contact us.
            </Text>
          </View>

          <View style={styles.principlesSection}>
            <Text style={styles.sectionTitle}>Our Privacy Principles</Text>
            <View style={styles.principlesGrid}>
              {privacyPrinciples.map((principle, index) => (
                <View key={index} style={styles.principleItem}>
                  <View style={styles.principleIconContainer}>
                    <principle.icon color={Colors.white} size={24} />
                  </View>
                  <Text style={styles.principleTitle}>{principle.title}</Text>
                  <Text style={styles.principleDescription}>{principle.description}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Information We Collect</Text>
            
            <View style={styles.infoCategory}>
              <Text style={styles.infoCategoryTitle}>Personal Information</Text>
              <Text style={styles.infoText}>
                • Name and contact information (email, phone number)
                • Profile information and preferences
                • Location data (when you report an animal in distress)
                • Photos and descriptions of animals you report
              </Text>
            </View>

            <View style={styles.infoCategory}>
              <Text style={styles.infoCategoryTitle}>Device Information</Text>
              <Text style={styles.infoText}>
                • Device type and operating system
                • App usage statistics and crash reports
                • IP address and network information
                • Device identifiers
              </Text>
            </View>

            <View style={styles.infoCategory}>
              <Text style={styles.infoCategoryTitle}>Usage Information</Text>
              <Text style={styles.infoText}>
                • How you interact with our app
                • Features you use most frequently
                • Search queries and preferences
                • Communication with rescue centers
              </Text>
            </View>
          </View>

          <View style={styles.useSection}>
            <Text style={styles.sectionTitle}>How We Use Your Information</Text>
            
            <View style={styles.useItem}>
              <Text style={styles.useTitle}>Emergency Response</Text>
              <Text style={styles.useDescription}>
                Connect you with nearby rescue centers and coordinate emergency responses for animals in distress.
              </Text>
            </View>

            <View style={styles.useItem}>
              <Text style={styles.useTitle}>Service Improvement</Text>
              <Text style={styles.useDescription}>
                Analyze usage patterns to improve our app features, user experience, and rescue coordination.
              </Text>
            </View>

            <View style={styles.useItem}>
              <Text style={styles.useTitle}>Communication</Text>
              <Text style={styles.useDescription}>
                Send you updates about rescue operations, app features, and important announcements.
              </Text>
            </View>

            <View style={styles.useItem}>
              <Text style={styles.useTitle}>Safety & Security</Text>
              <Text style={styles.useDescription}>
                Ensure the safety of our users and prevent misuse of our emergency response system.
              </Text>
            </View>
          </View>

          <View style={styles.sharingSection}>
            <Text style={styles.sectionTitle}>Information Sharing</Text>
            <Text style={styles.sharingText}>
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </Text>
            
            <View style={styles.sharingItem}>
              <Text style={styles.sharingItemTitle}>With Rescue Centers</Text>
              <Text style={styles.sharingItemText}>
                When you report an animal in distress, we share relevant information with nearby rescue centers to coordinate the response.
              </Text>
            </View>

            <View style={styles.sharingItem}>
              <Text style={styles.sharingItemTitle}>Legal Requirements</Text>
              <Text style={styles.sharingItemText}>
                We may disclose information if required by law or to protect our rights, property, or safety.
              </Text>
            </View>

            <View style={styles.sharingItem}>
              <Text style={styles.sharingItemTitle}>Service Providers</Text>
              <Text style={styles.sharingItemText}>
                We work with trusted service providers who help us operate our platform (hosting, analytics, etc.).
              </Text>
            </View>
          </View>

          <View style={styles.securitySection}>
            <Text style={styles.sectionTitle}>Data Security</Text>
            <Text style={styles.securityText}>
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </Text>
            
            <View style={styles.securityList}>
              <Text style={styles.securityListItem}>• Encryption of data in transit and at rest</Text>
              <Text style={styles.securityListItem}>• Regular security assessments and updates</Text>
              <Text style={styles.securityListItem}>• Access controls and authentication</Text>
              <Text style={styles.securityListItem}>• Secure data storage practices</Text>
            </View>
          </View>

          <View style={styles.rightsSection}>
            <Text style={styles.sectionTitle}>Your Rights</Text>
            
            <View style={styles.rightsItem}>
              <Text style={styles.rightsTitle}>Access & Update</Text>
              <Text style={styles.rightsDescription}>
                You can access and update your personal information through the app settings.
              </Text>
            </View>

            <View style={styles.rightsItem}>
              <Text style={styles.rightsTitle}>Deletion</Text>
              <Text style={styles.rightsDescription}>
                You can request deletion of your account and associated data at any time.
              </Text>
            </View>

            <View style={styles.rightsItem}>
              <Text style={styles.rightsTitle}>Opt-out</Text>
              <Text style={styles.rightsDescription}>
                You can opt out of non-essential communications and data collection.
              </Text>
            </View>

            <View style={styles.rightsItem}>
              <Text style={styles.rightsTitle}>Data Portability</Text>
              <Text style={styles.rightsDescription}>
                You can request a copy of your data in a portable format.
              </Text>
            </View>
          </View>

          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Contact Us</Text>
            <Text style={styles.contactText}>
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </Text>
            
            <View style={styles.contactInfo}>
              <Text style={styles.contactInfoItem}>Email: privacy@animallifesaver.org</Text>
              <Text style={styles.contactInfoItem}>Phone: +1 (555) 123-4567</Text>
              <Text style={styles.contactInfoItem}>Address: 123 Animal Rescue St, City, Country</Text>
            </View>
          </View>

          <View style={styles.changesSection}>
            <Text style={styles.sectionTitle}>Changes to This Policy</Text>
            <Text style={styles.changesText}>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </Text>
            <Text style={styles.changesText}>
              We encourage you to review this Privacy Policy periodically for any changes. Your continued use of the app after any changes constitutes acceptance of the updated policy.
            </Text>
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
  updateSection: {
    padding: 16,
    backgroundColor: Colors.primaryLight,
    margin: 16,
    borderRadius: 8,
  },
  updateText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "500",
    flexDirection: "row",
    alignItems: "center",
  },
  introSection: {
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
  introText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  principlesSection: {
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
  principlesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  principleItem: {
    width: "50%",
    alignItems: "center",
    padding: 16,
    marginBottom: 16,
  },
  principleIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  principleTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 8,
  },
  principleDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
  infoSection: {
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
  infoCategory: {
    marginBottom: 20,
  },
  infoCategoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  useSection: {
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
  useItem: {
    marginBottom: 20,
  },
  useTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 8,
  },
  useDescription: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  sharingSection: {
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
  sharingText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  sharingItem: {
    marginBottom: 16,
  },
  sharingItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  sharingItemText: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  securitySection: {
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
  securityText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  securityList: {
    marginLeft: 16,
  },
  securityListItem: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 8,
  },
  rightsSection: {
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
  rightsItem: {
    marginBottom: 16,
  },
  rightsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 4,
  },
  rightsDescription: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
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
    marginBottom: 16,
  },
  contactInfo: {
    backgroundColor: Colors.primaryLight,
    padding: 16,
    borderRadius: 8,
  },
  contactInfoItem: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 8,
  },
  changesSection: {
    padding: 20,
    backgroundColor: Colors.white,
    margin: 16,
    borderRadius: 12,
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
  changesText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
}); 