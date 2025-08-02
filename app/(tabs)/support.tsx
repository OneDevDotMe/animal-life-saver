import React, { useState, useEffect } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Platform,
  Alert,
  TextInput
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Heart, Building2, Package } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ProductList } from "@/components/shop/ProductList";
import { useProducts } from "@/hooks/useProducts";
import Colors from "@/constants/colors";

export default function SupportScreen() {
  const router = useRouter();
  const { tab } = useLocalSearchParams<{ tab?: string }>();
  const [activeTab, setActiveTab] = useState<"donate" | "rescue-center" | "send-supplies">("donate");
  const [selectedDonationAmount, setSelectedDonationAmount] = useState<string>("25");
  const [customDonationAmount, setCustomDonationAmount] = useState<string>("");
  const { data: products } = useProducts();

  // Handle URL parameters to set active tab
  useEffect(() => {
    if (tab === "rescue-center" || tab === "send-supplies") {
      setActiveTab(tab);
    }
  }, [tab]);

  const navigateToDonate = () => {
    setActiveTab("donate");
  };

  const navigateToRescueCenter = () => {
    setActiveTab("rescue-center");
  };

  const navigateToSendSupplies = () => {
    setActiveTab("send-supplies");
  };

  const navigateToCheckout = () => {
    const amount = selectedDonationAmount === "custom" ? customDonationAmount : selectedDonationAmount;
    if (selectedDonationAmount === "custom" && !customDonationAmount) {
      Alert.alert("Missing Amount", "Please enter a custom donation amount.");
      return;
    }
    router.push("/checkout");
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "donate" && styles.activeTab]}
          onPress={navigateToDonate}
          testID="donate-tab"
        >
          <Heart 
            color={activeTab === "donate" ? Colors.primary : Colors.textSecondary} 
            size={20} 
          />
          <Text 
            style={[
              styles.tabText, 
              activeTab === "donate" && styles.activeTabText
            ]}
          >
            Donate
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === "rescue-center" && styles.activeTab]}
          onPress={navigateToRescueCenter}
          testID="rescue-center-tab"
        >
          <Building2 
            color={activeTab === "rescue-center" ? Colors.primary : Colors.textSecondary} 
            size={20} 
          />
          <Text 
            style={[
              styles.tabText, 
              activeTab === "rescue-center" && styles.activeTabText
            ]}
          >
            Rescue Center
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === "send-supplies" && styles.activeTab]}
          onPress={navigateToSendSupplies}
          testID="send-supplies-tab"
        >
          <Package 
            color={activeTab === "send-supplies" ? Colors.primary : Colors.textSecondary} 
            size={20} 
          />
          <Text 
            style={[
              styles.tabText, 
              activeTab === "send-supplies" && styles.activeTabText
            ]}
          >
            Send Supplies
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        {activeTab === "donate" && (
          <View style={styles.donateContainer}>
            <LinearGradient
              colors={[Colors.primary, Colors.secondary]}
              style={styles.donateHeader}
            >
              <Heart color={Colors.white} size={40} />
              <Text style={styles.donateTitle}>Support Our Mission</Text>
              <Text style={styles.donateSubtitle}>
                Your donation helps us rescue and care for animals in need
              </Text>
            </LinearGradient>
            
            <View style={styles.donateOptionsContainer}>
              <Text style={styles.donateOptionsTitle}>Choose Donation Amount</Text>
              
              <View style={styles.donationAmounts}>
                <TouchableOpacity 
                  style={[styles.donationAmount, selectedDonationAmount === "10" && styles.donationAmountSelected]}
                  onPress={() => setSelectedDonationAmount("10")}
                >
                  <Text style={[styles.donationAmountText, selectedDonationAmount === "10" && styles.donationAmountTextSelected]}>$10</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.donationAmount, selectedDonationAmount === "25" && styles.donationAmountSelected]}
                  onPress={() => setSelectedDonationAmount("25")}
                >
                  <Text style={[styles.donationAmountText, selectedDonationAmount === "25" && styles.donationAmountTextSelected]}>$25</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.donationAmount, selectedDonationAmount === "50" && styles.donationAmountSelected]}
                  onPress={() => setSelectedDonationAmount("50")}
                >
                  <Text style={[styles.donationAmountText, selectedDonationAmount === "50" && styles.donationAmountTextSelected]}>$50</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.donationAmount, selectedDonationAmount === "100" && styles.donationAmountSelected]}
                  onPress={() => setSelectedDonationAmount("100")}
                >
                  <Text style={[styles.donationAmountText, selectedDonationAmount === "100" && styles.donationAmountTextSelected]}>$100</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.donationAmount, selectedDonationAmount === "custom" && styles.donationAmountSelected]}
                  onPress={() => setSelectedDonationAmount("custom")}
                >
                  <Text style={[styles.donationAmountText, selectedDonationAmount === "custom" && styles.donationAmountTextSelected]}>Custom</Text>
                </TouchableOpacity>
              </View>
              
              {selectedDonationAmount === "custom" && (
                <View style={styles.customAmountContainer}>
                  <Text style={styles.customAmountLabel}>Enter Custom Amount ($)</Text>
                  <TextInput
                    style={styles.customAmountInput}
                    value={customDonationAmount}
                    onChangeText={setCustomDonationAmount}
                    placeholder="Enter amount"
                    keyboardType="numeric"
                  />
                </View>
              )}
              
              <TouchableOpacity 
                style={styles.donateButton}
                onPress={navigateToCheckout}
                testID="donate-button"
              >
                <Text style={styles.donateButtonText}>Donate Now</Text>
              </TouchableOpacity>
              
              <Text style={styles.donateInfo}>
                Your donation is tax-deductible. You will receive a receipt via email.
              </Text>
            </View>
          </View>
        )}
        
        {activeTab === "rescue-center" && (
          <View style={styles.rescueCenterContainer}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" }}
              style={styles.rescueCenterImage}
            />
            
            <View style={styles.rescueCenterContent}>
              <Text style={styles.rescueCenterTitle}>Become a Rescue Center Partner</Text>
              <Text style={styles.rescueCenterDescription}>
                Join our network of rescue centers and help save more animals in your area. 
                As a partner, you'll receive support, resources, and be connected with people 
                reporting animals in need near you.
              </Text>
              
              <View style={styles.benefitsContainer}>
                <Text style={styles.benefitsTitle}>Benefits</Text>
                
                <View style={styles.benefitItem}>
                  <View style={styles.benefitDot} />
                  <Text style={styles.benefitText}>
                    Receive real-time SOS alerts for animals in your area
                  </Text>
                </View>
                
                <View style={styles.benefitItem}>
                  <View style={styles.benefitDot} />
                  <Text style={styles.benefitText}>
                    Access to our network of volunteers and resources
                  </Text>
                </View>
                
                <View style={styles.benefitItem}>
                  <View style={styles.benefitDot} />
                  <Text style={styles.benefitText}>
                    Promotion on our platform to increase visibility
                  </Text>
                </View>
                
                <View style={styles.benefitItem}>
                  <View style={styles.benefitDot} />
                  <Text style={styles.benefitText}>
                    Training and support for animal rescue operations
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.applyButton}
                testID="apply-button"
              >
                <Text style={styles.applyButtonText}>Apply Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {activeTab === "send-supplies" && (
          <View style={styles.sendSuppliesContainer}>
            <Text style={styles.sendSuppliesTitle}>Send Supplies</Text>
            <Text style={styles.sendSuppliesSubtitle}>
              Help rescue centers and saviours by sending them essential supplies
            </Text>
            
            <View style={styles.suppliesForm}>
              <Text style={styles.formTitle}>Supply Request Form</Text>
              
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Your Name *</Text>
                <Text style={styles.inputPlaceholder}>Enter your full name</Text>
              </View>
              
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Email *</Text>
                <Text style={styles.inputPlaceholder}>Enter your email address</Text>
              </View>
              
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Phone</Text>
                <Text style={styles.inputPlaceholder}>Enter your phone number</Text>
              </View>
              
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Recipient Type *</Text>
                <View style={styles.dropdownPlaceholder}>
                  <Text style={styles.dropdownText}>Select recipient type</Text>
                </View>
              </View>
              
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Recipient *</Text>
                <View style={styles.dropdownPlaceholder}>
                  <Text style={styles.dropdownText}>Select rescue center or saviour</Text>
                </View>
              </View>
              
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Supply Type *</Text>
                <View style={styles.dropdownPlaceholder}>
                  <Text style={styles.dropdownText}>Select type of supplies</Text>
                </View>
              </View>
              
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Description *</Text>
                <Text style={styles.textAreaPlaceholder}>
                  Describe the supplies you want to send and any special requirements...
                </Text>
              </View>
              
              <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Send Supply Request</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {/* Other Ways to Support Section */}
        <View style={styles.otherWaysContainer}>
          <Text style={styles.otherWaysTitle}>Other Ways to Support</Text>
          
          <View style={styles.otherWaysGrid}>
            <View style={styles.otherWayCard}>
              <Text style={styles.otherWayTitle}>Volunteer</Text>
              <Text style={styles.otherWayDescription}>
                Join our volunteer network and help with rescue operations, animal care, and community outreach programs.
              </Text>
            </View>
            
            <View style={styles.otherWayCard}>
              <Text style={styles.otherWayTitle}>Foster Animals</Text>
              <Text style={styles.otherWayDescription}>
                Provide temporary homes for rescued animals while they recover or wait for permanent adoption.
              </Text>
            </View>
            
            <View style={styles.otherWayCard}>
              <Text style={styles.otherWayTitle}>Spread Awareness</Text>
              <Text style={styles.otherWayDescription}>
                Share our mission on social media and help educate others about animal rescue and welfare.
              </Text>
            </View>
            
            <View style={styles.otherWayCard}>
              <Text style={styles.otherWayTitle}>Corporate Partnerships</Text>
              <Text style={styles.otherWayDescription}>
                Partner with us to support animal rescue initiatives through corporate social responsibility programs.
              </Text>
            </View>
            
            <View style={styles.otherWayCard}>
              <Text style={styles.otherWayTitle}>Fundraising Events</Text>
              <Text style={styles.otherWayDescription}>
                Organize fundraising events in your community to support local rescue operations and animal care.
              </Text>
            </View>
            
            <View style={styles.otherWayCard}>
              <Text style={styles.otherWayTitle}>Emergency Response</Text>
              <Text style={styles.otherWayDescription}>
                Join our emergency response team to help during natural disasters and large-scale rescue operations.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingTop: 60,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: "500",
  },
  content: {
    flex: 1,
  },
  donateContainer: {
    flex: 1,
  },
  donateHeader: {
    padding: 24,
    alignItems: "center",
  },
  donateTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  donateSubtitle: {
    fontSize: 16,
    color: Colors.white,
    opacity: 0.9,
    textAlign: "center",
  },
  donateOptionsContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
    margin: 16,
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
  donateOptionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
  },
  donationAmounts: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  donationAmount: {
    width: "48%",
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  donationAmountSelected: {
    backgroundColor: Colors.primaryLight,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  donationAmountText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
  },
  donationAmountTextSelected: {
    color: Colors.primary,
  },
  customAmountContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  customAmountLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
  },
  customAmountInput: {
    fontSize: 16,
    color: Colors.text,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
  },
  donateButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  donateButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  donateInfo: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  rescueCenterContainer: {
    flex: 1,
  },
  rescueCenterImage: {
    width: "100%",
    height: 200,
  },
  rescueCenterContent: {
    padding: 16,
  },
  rescueCenterTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
  },
  rescueCenterDescription: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 24,
  },
  benefitsContainer: {
    marginBottom: 24,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  benefitDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginTop: 8,
    marginRight: 12,
  },
  benefitText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  applyButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  applyButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  sendSuppliesContainer: {
    padding: 16,
  },
  sendSuppliesTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  sendSuppliesSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  suppliesForm: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
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
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
  },
  formField: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
  },
  inputPlaceholder: {
    fontSize: 16,
    color: Colors.textSecondary,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: Colors.textSecondary,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
  },
  dropdownText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  textAreaPlaceholder: {
    fontSize: 16,
    color: Colors.textSecondary,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  otherWaysContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    marginTop: 16,
  },
  otherWaysTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
    textAlign: "center",
  },
  otherWaysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  otherWayCard: {
    width: "48%",
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
  otherWayTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  otherWayDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});