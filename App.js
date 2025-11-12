import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import * as Font from "expo-font"; // Import Font module
import TabNavigation from './Navigations/TabNavigation';
import { NavigationContainer } from "@react-navigation/native";
import Colors from './Utils/Colors';
import { useState, useEffect, useRef } from 'react'; // Add this line
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
    const navigationRef = useRef();

useEffect(() => {
    async function loadFonts() {
      try {
        console.log("🔤 Starting font loading...");

        await Font.loadAsync({
          "potion": require("./assets/Fonts/Splash-Regular.ttf"),
          "main": require("./assets/Fonts/ArchitectsDaughter-Regular.ttf"),
        });

        console.log("✅ Fonts loaded successfully!");
        setFontsLoaded(true);
      } catch (error) {
        console.error("❌ Font loading failed:", error);
        console.error("Font error details:", error.message);

        // CRITICAL: Set fontsLoaded to true anyway so app continues
        setFontsLoaded(true);

        // In production, you might want to track this error
        if (!__DEV__) {
          // Log to your error tracking service
          console.error("Production font loading error:", error);
        }
      }
    }

    loadFonts();
  }, []);

  return (
  <View style={{ flex: 1, backgroundColor: "black" }}>
        <StatusBar
          hidden={false}
          backgroundColor={Colors.main}
        />
        <NavigationContainer ref={navigationRef}>
          <TabNavigation />
        </NavigationContainer>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
