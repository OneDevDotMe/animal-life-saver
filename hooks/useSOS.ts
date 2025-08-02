import { useState } from "react";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockRescueCenters } from "@/mocks/rescueCenters";
import { SOSReport } from "@/types";

interface SOSData {
  image: string;
  location: string;
  animalType: string;
  description: string;
}

export function useSOS() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  
  // Mock function to submit SOS
  const submitSOS = async (data: SOSData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Trigger haptic feedback on success
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      
      // Create a new SOS report
      const newSOS: SOSReport = {
        id: Math.random().toString(36).substring(2, 9),
        image: data.image,
        location: data.location,
        animalType: data.animalType,
        description: data.description,
        timestamp: new Date().toISOString(),
        status: "pending",
      };
      
      // In a real app, this would be an API call
      console.log("SOS submitted:", newSOS);
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["sosReports"] });
      
      setIsSubmitting(false);
      return newSOS;
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error submitting SOS:", error);
      throw error;
    }
  };
  
  return {
    submitSOS,
    isSubmitting,
  };
}