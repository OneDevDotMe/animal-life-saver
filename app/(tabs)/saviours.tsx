import React from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  Image,
  Platform,
  ListRenderItem
} from "react-native";
import { useRouter } from "expo-router";
import { Search, MapPin, Award } from "lucide-react-native";
import { useSaviours } from "@/hooks/useSaviours";
import Colors from "@/constants/colors";

export default function SavioursScreen() {
  const router = useRouter();
  const { saviours } = useSaviours();

  const navigateToSaviour = (id: string) => {
    router.push(`/saviour/${id}`);
  };

  const renderSaviour: ListRenderItem<any> = ({ item }) => (
    <TouchableOpacity 
      style={styles.saviourCard}
      onPress={() => navigateToSaviour(item.id)}
      testID={`saviour-card-${item.id}`}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.saviourImage} 
      />
      
      <View style={styles.saviourInfo}>
        <View style={styles.nameRow}>
          <Text style={styles.saviourName}>{item.name}</Text>
          <View style={styles.badgeContainer}>
            <Award color={Colors.white} size={12} />
          </View>
        </View>
        
        <Text style={styles.saviourRole}>{item.role}</Text>
        
        <View style={styles.locationRow}>
          <MapPin color={Colors.textSecondary} size={14} />
          <Text style={styles.saviourLocation}>{item.location}</Text>
        </View>
        
        <Text style={styles.rescuesCount}>
          {item.rescuesCount} rescues completed
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saviours</Text>
        <Text style={styles.subtitle}>
          Meet the heroes who save animals every day
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search color={Colors.textSecondary} size={20} />
          <Text style={styles.searchPlaceholder}>Search saviours...</Text>
        </View>
      </View>

      <FlatList
        data={saviours}
        renderItem={renderSaviour}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        testID="saviours-list"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 60,
  },
  header: {
    padding: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: Colors.white,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchPlaceholder: {
    marginLeft: 8,
    color: Colors.textSecondary,
    fontSize: 16,
  },
  listContent: {
    padding: 16,
  },
  saviourCard: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
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
  saviourImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  saviourInfo: {
    flex: 1,
    justifyContent: "center",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  saviourName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginRight: 8,
  },
  badgeContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  saviourRole: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "500",
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  saviourLocation: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  rescuesCount: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
}); 