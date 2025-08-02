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
import { ArrowLeft, FileText, Shield, AlertTriangle, CheckCircle, Globe } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/colors";

export default function TermsScreen() {
  const router = useRouter();

  const keyTerms = [
    { icon: Shield, title: "Acceptance", description: "By using our app, you agree to these terms" },
    { icon: CheckCircle, title: "Responsible Use", description: "Use the platform safely and responsibly" },
    { icon: AlertTriangle, title: "Emergency Only", description: "Reserve emergency features for real emergencies" },
    { icon: FileText, title: "Legal Compliance", description: "Follow all applicable laws and regulations" },
  ];

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Terms of Use",
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
            <Text style={styles.headerTitle}>Terms of Use</Text>
            <Text style={styles.headerSubtitle}>Please read these terms carefully</Text>
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
              By using Animal Life Saver, you agree to these Terms of Use. If you disagree with any part of these terms, you may not access our service.
            </Text>
            <Text style={styles.introText}>
              These terms apply to all users of the Animal Life Saver mobile application and related services. We reserve the right to modify these terms at any time.
            </Text>
          </View>

          <View style={styles.termsSection}>
            <Text style={styles.sectionTitle}>Key Terms</Text>
            <View style={styles.termsGrid}>
              {keyTerms.map((term, index) => (
                <View key={index} style={styles.termItem}>
                  <View style={styles.termIconContainer}>
                    <term.icon color={Colors.white} size={24} />
                  </View>
                  <Text style={styles.termTitle}>{term.title}</Text>
                  <Text style={styles.termDescription}>{term.description}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.licenseSection}>
            <Text style={styles.sectionTitle}>Use License</Text>
            <Text style={styles.licenseText}>
              Permission is granted to temporarily download one copy of the Animal Life Saver app for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </Text>
            
            <View style={styles.licenseList}>
              <Text style={styles.licenseListItem}>• Modify or copy the materials</Text>
              <Text style={styles.licenseListItem}>• Use the materials for any commercial purpose</Text>
              <Text style={styles.licenseListItem}>• Attempt to reverse engineer any software</Text>
              <Text style={styles.licenseListItem}>• Remove any copyright or proprietary notations</Text>
            </View>
          </View>

          <View style={styles.responsibilitiesSection}>
            <Text style={styles.sectionTitle}>User Responsibilities</Text>
            
            <View style={styles.responsibilityItem}>
              <Text style={styles.responsibilityTitle}>Accurate Information</Text>
              <Text style={styles.responsibilityDescription}>
                Provide accurate and truthful information when reporting animals in distress. False reports waste valuable resources and may delay help for animals that truly need it.
              </Text>
            </View>

            <View style={styles.responsibilityItem}>
              <Text style={styles.responsibilityTitle}>Safety First</Text>
              <Text style={styles.responsibilityDescription}>
                Follow safety guidelines when approaching injured animals. Do not put yourself or others at risk. If an animal appears dangerous, contact professionals immediately.
              </Text>
            </View>

            <View style={styles.responsibilityItem}>
              <Text style={styles.responsibilityTitle}>Respect Privacy</Text>
              <Text style={styles.responsibilityDescription}>
                Respect the privacy and property of others. Do not trespass on private property without permission, even to help an animal.
              </Text>
            </View>

            <View style={styles.responsibilityItem}>
              <Text style={styles.responsibilityTitle}>Emergency System</Text>
              <Text style={styles.responsibilityDescription}>
                Do not misuse the emergency response system. Reserve emergency features for genuine animal welfare emergencies.
              </Text>
            </View>
          </View>

          <View style={styles.prohibitedSection}>
            <Text style={styles.sectionTitle}>Prohibited Activities</Text>
            <Text style={styles.prohibitedText}>
              The following activities are strictly prohibited when using Animal Life Saver:
            </Text>
            
            <View style={styles.prohibitedList}>
              <Text style={styles.prohibitedListItem}>• Making false or misleading reports</Text>
              <Text style={styles.prohibitedListItem}>• Harassing or threatening other users</Text>
              <Text style={styles.prohibitedListItem}>• Using the app for commercial purposes without permission</Text>
              <Text style={styles.prohibitedListItem}>• Attempting to gain unauthorized access to our systems</Text>
              <Text style={styles.prohibitedListItem}>• Sharing inappropriate or offensive content</Text>
              <Text style={styles.prohibitedListItem}>• Violating any applicable laws or regulations</Text>
            </View>
          </View>

          <View style={styles.disclaimerSection}>
            <Text style={styles.sectionTitle}>Disclaimer</Text>
            <Text style={styles.disclaimerText}>
              Animal Life Saver is provided "as is" without any warranties, express or implied. We are not responsible for:
            </Text>
            
            <View style={styles.disclaimerList}>
              <Text style={styles.disclaimerListItem}>• The actions of rescue centers or individual saviours</Text>
              <Text style={styles.disclaimerListItem}>• The outcome of rescue operations</Text>
              <Text style={styles.disclaimerListItem}>• Any injuries or damages that may occur during rescue attempts</Text>
              <Text style={styles.disclaimerListItem}>• The accuracy of information provided by users</Text>
              <Text style={styles.disclaimerListItem}>• Service interruptions or technical issues</Text>
            </View>
          </View>

          <View style={styles.liabilitySection}>
            <Text style={styles.sectionTitle}>Limitation of Liability</Text>
            <Text style={styles.liabilityText}>
              In no event shall Animal Life Saver, its founders, employees, or affiliates be liable for any damages arising out of the use or inability to use our service, including but not limited to:
            </Text>
            
            <View style={styles.liabilityList}>
              <Text style={styles.liabilityListItem}>• Direct, indirect, incidental, or consequential damages</Text>
              <Text style={styles.liabilityListItem}>• Loss of data, profits, or business opportunities</Text>
              <Text style={styles.liabilityListItem}>• Personal injury or property damage</Text>
            </View>
          </View>

          <View style={styles.terminationSection}>
            <Text style={styles.sectionTitle}>Account Termination</Text>
            <Text style={styles.terminationText}>
              We reserve the right to terminate or suspend your access to Animal Life Saver at any time, without prior notice, for conduct that we believe violates these Terms of Use or is harmful to other users or the community.
            </Text>
          </View>

          <View style={styles.changesSection}>
            <Text style={styles.sectionTitle}>Changes to Terms</Text>
            <Text style={styles.changesText}>
              We may update these Terms of Use from time to time. We will notify users of any material changes by posting the new terms on this page and updating the "Last updated" date.
            </Text>
            <Text style={styles.changesText}>
              Your continued use of the app after any changes constitutes acceptance of the updated terms. We encourage you to review these terms periodically.
            </Text>
          </View>

          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <Text style={styles.contactText}>
              If you have any questions about these Terms of Use, please contact us:
            </Text>
            
            <View style={styles.contactInfo}>
              <Text style={styles.contactInfoItem}>Email: legal@animallifesaver.org</Text>
              <Text style={styles.contactInfoItem}>Phone: +1 (555) 123-4567</Text>
              <Text style={styles.contactInfoItem}>Address: 123 Animal Rescue St, City, Country</Text>
            </View>
          </View>

          <View style={styles.agreementSection}>
            <Text style={styles.sectionTitle}>Agreement</Text>
            <Text style={styles.agreementText}>
              By using Animal Life Saver, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our service.
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
  termsSection: {
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
  termsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  termItem: {
    width: "50%",
    alignItems: "center",
    padding: 16,
    marginBottom: 16,
  },
  termIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  termTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 8,
  },
  termDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
  licenseSection: {
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
  licenseText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  licenseList: {
    marginLeft: 16,
  },
  licenseListItem: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 8,
  },
  responsibilitiesSection: {
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
  responsibilityItem: {
    marginBottom: 20,
  },
  responsibilityTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 8,
  },
  responsibilityDescription: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  prohibitedSection: {
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
  prohibitedText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  prohibitedList: {
    marginLeft: 16,
  },
  prohibitedListItem: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 8,
  },
  disclaimerSection: {
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
  disclaimerText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  disclaimerList: {
    marginLeft: 16,
  },
  disclaimerListItem: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 8,
  },
  liabilitySection: {
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
  liabilityText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  liabilityList: {
    marginLeft: 16,
  },
  liabilityListItem: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 8,
  },
  terminationSection: {
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
  terminationText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  changesSection: {
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
  changesText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
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
  agreementSection: {
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
  agreementText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
}); 