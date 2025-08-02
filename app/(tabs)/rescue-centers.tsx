import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TextInput, 
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { useRouter } from "expo-router";
import { Search, MapPin, Filter } from "lucide-react-native";
import { RescueCenterCard } from "@/components/rescue-centers/RescueCenterCard";
import { useRescueCenters } from "@/hooks/useRescueCenters";
import Colors from "@/constants/colors";
import { RescueCenter } from "@/types";

export default function RescueCentersScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [locationFilter, setLocationFilter] = useState("");
  const { rescueCenters, isLoading, error } = useRescueCenters(searchQuery, locationFilter);

  const navigateToRescueCenter = (id: string) => {
    router.push(`/rescue-center/${id}`);
  };

  const renderRescueCenter = ({ item }: { item: RescueCenter }) => (
    <RescueCenterCard 
      center={item} 
      onPress={() => navigateToRescueCenter(item.id)} 
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search color={Colors.textSecondary} size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search rescue centers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            testID="search-input"
          />
        </View>
        
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setFilterVisible(!filterVisible)}
          testID="filter-button"
        >
          <Filter color={Colors.primary} size={24} />
        </TouchableOpacity>
      </View>
      
      {filterVisible && (
        <View style={styles.filterContainer}>
          <View style={styles.filterInputContainer}>
            <MapPin color={Colors.textSecondary} size={20} />
            <TextInput
              style={styles.filterInput}
              placeholder="Filter by location..."
              value={locationFilter}
              onChangeText={setLocationFilter}
              testID="location-filter-input"
            />
          </View>
        </View>
      )}
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading rescue centers...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load rescue centers.</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => {/* Retry logic */}}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : rescueCenters.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No rescue centers found.</Text>
          <Text style={styles.emptySubtext}>Try adjusting your search or filters.</Text>
        </View>
      ) : (
        <FlatList
          data={rescueCenters}
          renderItem={renderRescueCenter}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          testID="rescue-centers-list"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
    paddingTop: 60,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    marginLeft: 8,
    color: Colors.text,
  },
  filterButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 8,
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  filterInput: {
    flex: 1,
    height: 48,
    marginLeft: 8,
    color: Colors.text,
  },
  listContainer: {
    paddingBottom: 16,
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
  },
  errorText: {
    fontSize: 16,
    color: Colors.error,
    marginBottom: 16,
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
  },
});