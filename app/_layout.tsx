import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppProvider } from "@/context/AppContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/hooks/useCart";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="rescue-center/[id]" options={{ title: "Rescue Center" }} />
      <Stack.Screen name="rescue/[id]" options={{ title: "Rescue Story" }} />
      <Stack.Screen name="saviour/[id]" options={{ title: "Saviour Profile" }} />
      <Stack.Screen name="checkout" options={{ title: "Checkout" }} />
      <Stack.Screen name="about" options={{ title: "About" }} />
      <Stack.Screen name="founder" options={{ title: "Meet the Founder" }} />
      <Stack.Screen name="privacy" options={{ title: "Privacy Policy" }} />
      <Stack.Screen name="terms" options={{ title: "Terms of Use" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="profile-setup" options={{ title: "Profile Setup" }} />
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
      <Stack.Screen name="blog" options={{ title: "Knowledge Base" }} />
      <Stack.Screen name="blog/[slug]" options={{ title: "Article" }} />
      <Stack.Screen name="category/[slug]" options={{ title: "Category" }} />
      <Stack.Screen name="product/[slug]" options={{ title: "Product" }} />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppProvider>
          <CartProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <RootLayoutNav />
            </GestureHandlerRootView>
          </CartProvider>
        </AppProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}