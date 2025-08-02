import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  Alert,
  Platform,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import { 
  X, 
  Menu, 
  Info, 
  User, 
  Shield, 
  FileText, 
  Heart,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  BookOpen,
  Users,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MessageCircle,
  ChevronRight
} from "lucide-react-native";
import Colors from "@/constants/colors";
import { useBlogCategories } from "@/hooks/useBlogCategories";

interface NavigationMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

export function NavigationMenu({ isVisible, onClose }: NavigationMenuProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'menu' | 'donate' | 'knowledgeBase'>('menu');
  const [selectedAmount, setSelectedAmount] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  
  const { data: blogCategories, isLoading: categoriesLoading } = useBlogCategories();

  const handleDonate = () => {
    const amount = selectedAmount === 'custom' ? customAmount : selectedAmount;
    if (!amount || !donorName || !donorEmail) {
      Alert.alert("Missing Information", "Please fill in all fields.");
      return;
    }
    
    Alert.alert(
      "Thank You!",
      `Thank you ${donorName} for your generous donation of $${amount}. We'll send a confirmation to ${donorEmail}.`,
      [{ text: "OK", onPress: onClose }]
    );
    
    // Reset form
    setSelectedAmount('');
    setCustomAmount('');
    setDonorName('');
    setDonorEmail('');
    setActiveTab('menu');
  };

  const handleNavigate = (route: string) => {
    onClose();
    router.push(route as any);
  };

  const handleSocialLink = (url: string) => {
    Linking.openURL(url);
  };

  const renderMenu = () => (
    <View style={styles.menuContainer}>
      <TouchableOpacity 
        style={styles.menuItem}
        onPress={() => handleNavigate('/about')}
      >
        <Info color={Colors.primary} size={24} />
        <Text style={styles.menuItemText}>About</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.menuItem}
        onPress={() => handleNavigate('/founder')}
      >
        <User color={Colors.primary} size={24} />
        <Text style={styles.menuItemText}>Meet the Founder</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.menuItem}
        onPress={() => handleNavigate('/privacy')}
      >
        <Shield color={Colors.primary} size={24} />
        <Text style={styles.menuItemText}>Privacy Policy</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.menuItem}
        onPress={() => handleNavigate('/terms')}
      >
        <FileText color={Colors.primary} size={24} />
        <Text style={styles.menuItemText}>Terms of Use</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.menuItem}
        onPress={() => setActiveTab('knowledgeBase')}
      >
        <BookOpen color={Colors.primary} size={24} />
        <Text style={styles.menuItemText}>Knowledge Base</Text>
        <ChevronRight color={Colors.text} size={16} style={{ marginLeft: 'auto' }} />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.menuItem}
        onPress={() => setActiveTab('donate')}
      >
        <Heart color={Colors.primary} size={24} />
        <Text style={styles.menuItemText}>Donate</Text>
      </TouchableOpacity>

      {/* Social Links */}
      <View style={styles.socialLinksContainer}>
        <Text style={styles.socialLinksTitle}>Follow Us</Text>
        <View style={styles.socialIconsContainer}>
          <TouchableOpacity 
            style={styles.socialIcon}
            onPress={() => handleSocialLink('https://facebook.com/animallifesaver')}
          >
            <Facebook color={Colors.primary} size={24} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.socialIcon}
            onPress={() => handleSocialLink('https://instagram.com/animallifesaver')}
          >
            <Instagram color={Colors.primary} size={24} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.socialIcon}
            onPress={() => handleSocialLink('https://twitter.com/animallifesaver')}
          >
            <Twitter color={Colors.primary} size={24} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.socialIcon}
            onPress={() => handleSocialLink('https://youtube.com/animallifesaver')}
          >
            <Youtube color={Colors.primary} size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderDonate = () => (
    <ScrollView style={styles.contentContainer}>
      <Text style={styles.contentTitle}>Support Our Mission</Text>
      <Text style={styles.contentText}>
        Your donation helps us maintain and improve the Animal Life Saver platform, support rescue centers, and save more animals in need.
      </Text>
      
      <View style={styles.donateForm}>
        <Text style={styles.formLabel}>Choose Donation Amount</Text>
        
        <View style={styles.amountOptions}>
          <TouchableOpacity 
            style={[styles.amountOption, selectedAmount === '30' && styles.amountOptionSelected]}
            onPress={() => setSelectedAmount('30')}
          >
            <Text style={[styles.amountText, selectedAmount === '30' && styles.amountTextSelected]}>$30</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.amountOption, selectedAmount === '100' && styles.amountOptionSelected]}
            onPress={() => setSelectedAmount('100')}
          >
            <Text style={[styles.amountText, selectedAmount === '100' && styles.amountTextSelected]}>$100</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.amountOption, selectedAmount === '500' && styles.amountOptionSelected]}
            onPress={() => setSelectedAmount('500')}
          >
            <Text style={[styles.amountText, selectedAmount === '500' && styles.amountTextSelected]}>$500</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.amountOption, selectedAmount === '1000' && styles.amountOptionSelected]}
            onPress={() => setSelectedAmount('1000')}
          >
            <Text style={[styles.amountText, selectedAmount === '1000' && styles.amountTextSelected]}>$1000</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[styles.amountOption, selectedAmount === 'custom' && styles.amountOptionSelected]}
          onPress={() => setSelectedAmount('custom')}
        >
          <Text style={[styles.amountText, selectedAmount === 'custom' && styles.amountTextSelected]}>Custom Amount</Text>
        </TouchableOpacity>
        
        {selectedAmount === 'custom' && (
          <TextInput
            style={styles.textInput}
            value={customAmount}
            onChangeText={setCustomAmount}
            placeholder="Enter custom amount"
            keyboardType="numeric"
          />
        )}
        
        <Text style={styles.formLabel}>Your Name</Text>
        <TextInput
          style={styles.textInput}
          value={donorName}
          onChangeText={setDonorName}
          placeholder="Enter your name"
        />
        
        <Text style={styles.formLabel}>Email Address</Text>
        <TextInput
          style={styles.textInput}
          value={donorEmail}
          onChangeText={setDonorEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
        
        <TouchableOpacity 
          style={styles.donateButton}
          onPress={handleDonate}
        >
          <Heart color={Colors.white} size={20} />
          <Text style={styles.donateButtonText}>Donate Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderKnowledgeBase = () => (
    <ScrollView style={styles.contentContainer}>
      <Text style={styles.contentTitle}>Knowledge Base Categories</Text>
      {
        categoriesLoading ? (
          <Text style={styles.contentText}>Loading...</Text>
        ) : (
          blogCategories?.map(category => (
            <TouchableOpacity
              key={category.id}
              style={styles.menuItem}
              onPress={() => handleNavigate(`/category/${category.slug}`)}
            >
              <BookOpen color={Colors.primary} size={24} />
              <Text style={styles.menuItemText}>{category.name}</Text>
            </TouchableOpacity>
          ))
        )
      }
    </ScrollView>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'donate':
        return renderDonate();
      case 'knowledgeBase':
        return renderKnowledgeBase();
      default:
        return renderMenu();
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            {activeTab !== 'menu' && (
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => setActiveTab('menu')}
              >
                <Text style={styles.backButtonText}>← Back</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.headerTitle}>
              {activeTab === 'menu' ? 'Menu' : 
               activeTab === 'donate' ? 'Donate' :
               activeTab === 'knowledgeBase' ? 'Knowledge Base' : 'Menu'}
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X color={Colors.text} size={24} />
            </TouchableOpacity>
          </View>
          
          {renderContent()}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    padding: 8,
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 16,
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  contentText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  donateForm: {
    marginTop: 20,
  },
  formLabel: {
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
    marginBottom: 16,
    backgroundColor: Colors.white,
  },
  donateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  donateButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  amountOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  amountOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginVertical: 8,
  },
  amountOptionSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  amountText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  amountTextSelected: {
    color: Colors.white,
  },
  socialLinksContainer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  socialLinksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialIcon: {
    padding: 10,
  },
}); 