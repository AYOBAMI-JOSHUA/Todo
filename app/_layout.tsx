import { Stack } from 'expo-router';
import { ThemeProvider } from '../contexts/ThemeContext';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Initialize Convex client outside of component
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <ThemeProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
            </Stack>
          </ThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ConvexProvider>
  );
}