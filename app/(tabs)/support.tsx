import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Platform
} from "react-native";
import { useRouter } from "expo-router";
import { Heart, Building2, ShoppingBag } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ProductList } from "@/components/shop/ProductList";
import { useProducts } from "@/hooks/useProducts";
import Colors from "@/constants/colors";

export default function SupportScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"donate" | "rescue-center" | "shop">("donate");
  const { products } = useProducts();

  const navigateToDonate = () => {
    setActiveTab("donate");
  };

  const navigateToRescueCenter = () => {
    setActiveTab("rescue-center");
  };

  const navigateToShop = () => {
    setActiveTab("shop");
  };

  const navigateToCheckout = () => {
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
          style={[styles.tab, activeTab === "shop" && styles.activeTab]}
          onPress={navigateToShop}
          testID="shop-tab"
        >
          <ShoppingBag 
            color={activeTab === "shop" ? Colors.primary : Colors.textSecondary} 
            size={20} 
          />
          <Text 
            style={[
              styles.tabText, 
              activeTab === "shop" && styles.activeTabText
            ]}
          >
            Shop
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
                <TouchableOpacity style={styles.donationAmount}>
                  <Text style={styles.donationAmountText}>$10</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.donationAmount, styles.donationAmountSelected]}>
                  <Text style={[styles.donationAmountText, styles.donationAmountTextSelected]}>$25</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.donationAmount}>
                  <Text style={styles.donationAmountText}>$50</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.donationAmount}>
                  <Text style={styles.donationAmountText}>$100</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.donationAmount}>
                  <Text style={styles.donationAmountText}>Custom</Text>
                </TouchableOpacity>
              </View>
              
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
        
        {activeTab === "shop" && (
          <View style={styles.shopContainer}>
            <Text style={styles.shopTitle}>Shop for a Cause</Text>
            <Text style={styles.shopSubtitle}>
              Every purchase helps fund our animal rescue operations
            </Text>
            
            <ProductList products={products} />
          </View>
        )}
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
  shopContainer: {
    padding: 16,
  },
  shopTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  shopSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
});