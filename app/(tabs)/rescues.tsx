import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator,
  Image
} from "react-native";
import { useRouter } from "expo-router";
import { Grid, List, Search } from "lucide-react-native";
import { TextInput } from "react-native-gesture-handler";
import { RescueCard } from "@/components/rescues/RescueCard";
import { RescueGridItem } from "@/components/rescues/RescueGridItem";
import { useRescues } from "@/hooks/useRescues";
import Colors from "@/constants/colors";
import { Rescue } from "@/types";

export default function RescuesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const { rescues, isLoading, error } = useRescues(searchQuery);

  const navigateToRescue = (id: string) => {
    router.push(`/rescue/${id}`);
  };

  const renderRescueItem = ({ item }: { item: Rescue }) => {
    if (viewMode === "list") {
      return (
        <RescueCard 
          rescue={item} 
          onPress={() => navigateToRescue(item.id)} 
        />
      );
    } else {
      return (
        <RescueGridItem 
          rescue={item} 
          onPress={() => navigateToRescue(item.id)} 
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Successful Rescues</Text>
        <Text style={styles.subtitle}>Stories of animals saved by our community</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search color={Colors.textSecondary} size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search rescues..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            testID="search-rescues-input"
          />
        </View>
        
        <View style={styles.viewToggleContainer}>
          <TouchableOpacity
            style={[
              styles.viewToggleButton,
              viewMode === "list" && styles.viewToggleButtonActive,
            ]}
            onPress={() => setViewMode("list")}
            testID="list-view-button"
          >
            <List 
              color={viewMode === "list" ? Colors.white : Colors.primary} 
              size={20} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.viewToggleButton,
              viewMode === "grid" && styles.viewToggleButtonActive,
            ]}
            onPress={() => setViewMode("grid")}
            testID="grid-view-button"
          >
            <Grid 
              color={viewMode === "grid" ? Colors.white : Colors.primary} 
              size={20} 
            />
          </TouchableOpacity>
        </View>
      </View>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading rescue stories...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load rescue stories.</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => {/* Retry logic */}}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : rescues.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No rescue stories found.</Text>
          <Text style={styles.emptySubtext}>Be the first to share a rescue story!</Text>
        </View>
      ) : (
        <FlatList
          data={rescues}
          renderItem={renderRescueItem}
          keyExtractor={(item) => item.id}
          numColumns={viewMode === "grid" ? 2 : 1}
          key={viewMode} // Force re-render when view mode changes
          contentContainerStyle={[
            styles.listContainer,
            viewMode === "grid" && styles.gridContainer,
          ]}
          showsVerticalScrollIndicator={false}
          testID="rescues-list"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 16,
    paddingTop: 60,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 8,
    color: Colors.text,
  },
  viewToggleContainer: {
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  viewToggleButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  viewToggleButtonActive: {
    backgroundColor: Colors.primary,
  },
  listContainer: {
    padding: 16,
  },
  gridContainer: {
    paddingHorizontal: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: Colors.error,
    marginBottom: 16,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});