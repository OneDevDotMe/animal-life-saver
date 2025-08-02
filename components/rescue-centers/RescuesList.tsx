import React from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  Image,
  Platform
} from "react-native";
import { useRouter } from "expo-router";
import { Calendar } from "lucide-react-native";
import Colors from "@/constants/colors";
import { Rescue } from "@/types";

interface RescuesListProps {
  rescues: Rescue[];
}

export function RescuesList({ rescues }: RescuesListProps) {
  const router = useRouter();

  const navigateToRescue = (id: string) => {
    router.push(`/rescue/${id}`);
  };

  const renderRescue = ({ item }: { item: Rescue }) => (
    <TouchableOpacity 
      style={styles.rescueItem}
      onPress={() => navigateToRescue(item.id)}
      testID={`rescue-item-${item.id}`}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.rescueImage} 
      />
      
      <View style={styles.rescueInfo}>
        <Text style={styles.rescueTitle} numberOfLines={2}>
          {item.title}
        </Text>
        
        <View style={styles.rescueDate}>
          <Calendar color={Colors.textSecondary} size={14} />
          <Text style={styles.rescueDateText}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {rescues.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No rescues yet</Text>
        </View>
      ) : (
        <FlatList
          data={rescues}
          renderItem={renderRescue}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.rescuesList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  rescuesList: {
    paddingRight: 16,
  },
  rescueItem: {
    width: 160,
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginRight: 12,
    overflow: "hidden",
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
  rescueImage: {
    width: "100%",
    height: 100,
  },
  rescueInfo: {
    padding: 8,
  },
  rescueTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  rescueDate: {
    flexDirection: "row",
    alignItems: "center",
  },
  rescueDateText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  emptyContainer: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});